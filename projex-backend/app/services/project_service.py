from fastapi import HTTPException
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.project import ProjectCreate, ProjectUpdate

# Import model classes (not strings!)
from models.project import Project
from models.stage import ProjectStage
from models.sprint import ProjectSprint

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
        project_dict = project_data.model_dump()
        stages_data = project_dict.pop("stages", [])

        # Create Project instance
        project = Project(**project_dict)

        # Handle nested stages and sprints
        for stage_data in stages_data:
            sprints_data = stage_data.pop("sprints", [])
            stage = ProjectStage(**stage_data)
            for sprint_data in sprints_data:
                sprint = ProjectSprint(**sprint_data)
                stage.sprints.append(sprint)
            project.stages.append(stage)

        db.add(project)
        await db.commit()
        await db.refresh(project)
        return project
    
    @staticmethod
    async def delete_project_by_id(db: AsyncSession, project_id: int):
        result = await db.execute(select(Project).where(Project.id == project_id))
        project = result.scalars().first()

        if not project:
            return None

        await db.delete(project)
        await db.commit()
        return True
    
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

