from pydantic import BaseModel, Field
from typing import Optional
from datetime import date
from schemas.sprint import SprintRead
from typing import List

class StageBase(BaseModel):
    name: str
    completion_percentage: Optional[int] = Field(None, ge=0, le=100)
    stage_notes: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None

class StageCreate(StageBase):
    project_id: int

class StageUpdate(StageBase):
    pass  # allows partial update (PATCH semantics)

class StageRead(StageBase):
    id: int
    project_id: int

    class Config:
        orm_mode = True  # required for using SQLAlchemy models with Pydantic

# StageReadWithSprints: nested sprints inside a stage
class StageReadWithSprints(StageRead):
    sprints: List[SprintRead] = []

    class Config:
        orm_mode = True
