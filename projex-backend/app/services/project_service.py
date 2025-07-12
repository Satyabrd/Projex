from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from models.project import Project
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status


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
                selectinload(Project.stages).selectinload("sprints")
            )
            .offset(offset)
            .limit(limit)
        )
        return result.scalars().all()

