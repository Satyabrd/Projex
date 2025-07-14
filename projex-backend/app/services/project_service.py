from fastapi import HTTPException
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.project import ProjectCreate, ProjectUpdate

# Import model classes (not strings!)
from models.project import Project
from models.stage import ProjectStage

class ProjectService:

    @staticmethod
    async def get_project_detail(db: AsyncSession, project_id: int):
        result = await db.execute(
            select(Project)
            .options(
                selectinload(Project.stages).selectinload("sprints")
            )
            .where(Project.id == project_id)
        )
        project = result.scalars().first()

        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found"
            )

        return project
    
    @staticmethod
    async def get_all_projects(db: AsyncSession, limit: int = 50, offset: int = 0):
        result = await db.execute(
            select(Project)
            .options(
                selectinload(Project.stages).selectinload(ProjectStage.sprints)
            )
            .offset(offset)
            .limit(limit)
        )
        return result.scalars().all()

    @staticmethod
    async def create_project(db: AsyncSession, project_data: ProjectCreate) -> Project:
        # 1. Create the project
        new_project = Project(**project_data.dict())
        db.add(new_project)
        await db.flush()  # To generate project.id

        # 2. Define default stages and sprints
        stages_config = [
            {"name": "Conceptualize", "sprints": 0},
            {"name": "Initialize", "sprints": 0},
            {"name": "Experiment", "sprints": 6}
        ]

        for stage_cfg in stages_config:
            stage = ProjectStage(
                name=stage_cfg["name"],
                project_id=new_project.id,
                completion_percentage=0
            )
            db.add(stage)
            await db.flush()  # So we can reference stage.id

            for i in range(1, stage_cfg["sprints"] + 1):
                sprint = ProjectSprint(
                    name=f"{stage_cfg['name']} - Sprint {i}",
                    stage_id=stage.id,
                    completion_percentage=0
                )
                db.add(sprint)

        # 3. Commit all
        await db.commit()
        await db.refresh(new_project)

        return new_project
    
    @staticmethod
    async def update_project(db: AsyncSession, project_id: int, project_data: ProjectUpdate) -> Project:
        result = await db.execute(select(Project).where(Project.id == project_id))
        project = result.scalars().first()

        if not project:
            raise HTTPException(status_code=404, detail="Project not found")

        for key, value in project_data.dict(exclude_unset=True).items():
            setattr(project, key, value)

        await db.commit()
        await db.refresh(project)
        return project
    
    @staticmethod
    async def delete_project(db: AsyncSession, project_id: int) -> None:
        result = await db.execute(select(Project).where(Project.id == project_id))
        project = result.scalars().first()

        if not project:
            raise HTTPException(status_code=404, detail="Project not found")

        await db.delete(project)
        await db.commit()

