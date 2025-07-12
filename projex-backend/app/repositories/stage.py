# 📁 repository/stage.py

from sqlalchemy.orm import Session
from typing import List, Optional
from models.stage import ProjectStage
from schemas.stage import StageCreate, StageUpdate


class StageRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, stage_data: StageCreate) -> ProjectStage:
        stage = ProjectStage(**stage_data.dict())
        self.db.add(stage)
        self.db.commit()
        self.db.refresh(stage)
        return stage

    def get_by_id(self, stage_id: int) -> Optional[ProjectStage]:
        return self.db.query(ProjectStage).filter(ProjectStage.id == stage_id).first()

    def get_all_by_project(self, project_id: int) -> List[ProjectStage]:
        return self.db.query(ProjectStage).filter(ProjectStage.project_id == project_id).all()

    def update(self, stage_id: int, update_data: StageUpdate) -> Optional[ProjectStage]:
        stage = self.get_by_id(stage_id)
        if not stage:
            return None
        for field, value in update_data.dict(exclude_unset=True).items():
            setattr(stage, field, value)
        self.db.commit()
        self.db.refresh(stage)
        return stage

    def delete(self, stage_id: int) -> bool:
        stage = self.get_by_id(stage_id)
        if not stage:
            return False
        self.db.delete(stage)
        self.db.commit()
        return True
