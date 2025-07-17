from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from schemas.stage import StageCreateWithSprints, StageReadWithSprints

# Shared base schema
class ProjectBase(BaseModel):
    projectname: str
    description: Optional[str] = None
    technology: Optional[str] = None
    business_function: Optional[str] = None
    initiation_date: Optional[datetime] = None
    creation_date: Optional[datetime] = None

# Schema for creating a project (with nested stages and sprints)
class ProjectCreate(ProjectBase):
    stages: List[StageCreateWithSprints] = []

# Schema for updating a project
class ProjectUpdate(ProjectBase):
    stages: Optional[List[StageCreateWithSprints]] = None

# Schema for reading a project (basic)
class ProjectRead(ProjectBase):
    id: int

    class Config:
        orm_mode = True

# Schema for outputting a project with nested stages and sprints
class ProjectOut(ProjectBase):
    id: int
    stages: List[StageReadWithSprints] = []

    class Config:
        orm_mode = True

# Optional schema if you want a structured response for deletion
class ProjectDelete(BaseModel):
    id: int
    message: Optional[str] = "Project deleted successfully"
