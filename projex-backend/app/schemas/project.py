from pydantic import BaseModel
from typing import Optional, List
from datetime import date
from schemas.stage import StageReadWithSprints

# Shared schema
class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    technology: Optional[str] = None
    business_function: Optional[str] = None
    initiation_date: Optional[str] = None  # Use date if storing as date
    creation_date: Optional[str] = None

# Schema for creating a project
class ProjectCreate(ProjectBase):
    pass

# Schema for updating a project
class ProjectUpdate(ProjectBase):
    pass

# Schema for reading a project (with stages optional)
class ProjectRead(ProjectBase):
    id: int

    class Config:
        orm_mode = True

# ProjectOut with nested stages and sprints
class ProjectOut(ProjectBase):
    id: int
    stages: List[StageReadWithSprints] = []  # ⬅️ Include nested stages and sprints

    class Config:
        orm_mode = True
