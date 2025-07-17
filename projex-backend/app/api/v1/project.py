from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from db.session import get_db
from schemas.project import ProjectOut, ProjectCreate, ProjectUpdate
from services.project_service import ProjectService
from typing import List

router = APIRouter()

@router.get("/projects", response_model=List[ProjectOut])
async def get_all_projects(limit: int = 50,
    offset: int = 0,
    db: AsyncSession = Depends(get_db)):
    return await ProjectService.get_all_projects(db, limit, offset)

@router.post("/projects", response_model=ProjectOut)
async def create_project(project_data: ProjectCreate, db: AsyncSession = Depends(get_db)):
    return await ProjectService.create_project(db, project_data)

@router.delete("/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project_id: int,
    db: AsyncSession = Depends(get_db),
):
    await ProjectService.delete_project_by_id(db, project_id)
    return None

@router.get("/projects/{project_id}", response_model=ProjectOut)
async def get_project(project_id: int, db: AsyncSession = Depends(get_db)):
    return await ProjectService.get_project_detail(db, project_id)

@router.put("/{project_id}", response_model=ProjectOut)
async def update_project(
    project_id: int,
    project_data: ProjectUpdate,
    db: AsyncSession = Depends(get_db),
):
    return await ProjectService.update_project(db, project_id, project_data)
