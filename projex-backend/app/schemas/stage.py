from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from schemas.sprint import SprintCreate, SprintRead

class StageBase(BaseModel):
    name: str
    completion_percentage: Optional[int] = None
    stage_notes: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None

# For creating project along with nested sprints
class StageCreateWithSprints(StageBase):
    sprints: List[SprintCreate] = []

# For reading nested stages and sprints
class StageReadWithSprints(StageBase):
    id: int
    sprints: List[SprintRead] = []

    class Config:
        orm_mode = True
