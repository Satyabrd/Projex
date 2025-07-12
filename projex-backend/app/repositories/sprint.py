from sqlalchemy.orm import Session
from models.sprint import ProjectSprint
from schemas.sprint import SprintCreate, SprintUpdate
from typing import List, Optional

class SprintRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, sprint_data: SprintCreate) -> ProjectSprint:
        sprint = ProjectSprint(**sprint_data.dict())
        self.db.add(sprint)
        self.db.commit()
        self.db.refresh(sprint)
        return sprint

    def get_by_id(self, sprint_id: int) -> Optional[ProjectSprint]:
        return self.db.query(ProjectSprint).filter(ProjectSprint.id == sprint_id).first()

    def get_all_by_stage(self, stage_id: int) -> List[ProjectSprint]:
        return self.db.query(ProjectSprint).filter(ProjectSprint.stage_id == stage_id).all()

    def update(self, sprint_id: int, update_data: SprintUpdate) -> Optional[ProjectSprint]:
        sprint = self.get_by_id(sprint_id)
        if not sprint:
            return None
        for field, value in update_data.dict(exclude_unset=True).items():
            setattr(sprint, field, value)
        self.db.commit()
        self.db.refresh(sprint)
        return sprint

    def delete(self, sprint_id: int) -> bool:
        sprint = self.get_by_id(sprint_id)
        if not sprint:
            return False
        self.db.delete(sprint)
        self.db.commit()
        return True
