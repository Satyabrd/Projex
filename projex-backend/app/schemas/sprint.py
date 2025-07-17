from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SprintBase(BaseModel):
    name: str
    completion_percentage: Optional[int] = None
    sprint_notes: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None

class SprintCreate(SprintBase):
    pass

class SprintRead(SprintBase):
    id: int

    class Config:
        orm_mode = True
