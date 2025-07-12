from pydantic import BaseModel, Field
from typing import Optional
from datetime import date

# Shared base
class SprintBase(BaseModel):
    name: str
    completion_percentage: Optional[int] = Field(None, ge=0, le=100)
    sprint_notes: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None

# For creating a sprint
class SprintCreate(SprintBase):
    stage_id: int

# For updating a sprint
class SprintUpdate(SprintBase):
    pass

# For reading a sprint (from DB)
class SprintRead(SprintBase):
    id: int
    stage_id: int

    class Config:
        orm_mode = True
