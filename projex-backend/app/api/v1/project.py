from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from db.session import get_db
from schemas.project import ProjectOut
from services.project_service import ProjectService
from typing import List

router = APIRouter()

@router.get("/projects", response_model=List[ProjectOut])
async def get_all_projects(limit: int = 50,
    offset: int = 0,
    db: AsyncSession = Depends(get_db)):
    return await ProjectService.get_all_projects(db, limit, offset)

@router.get("/projects/{project_id}", response_model=ProjectOut)
async def get_project(project_id: int, db: AsyncSession = Depends(get_db)):
    return await ProjectService.get_project_detail(db, project_id)
