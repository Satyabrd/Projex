from sqlalchemy.orm import Session
from models.project import Project
from schemas.project import ProjectCreate, ProjectUpdate
from typing import List, Optional


class ProjectRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, project_data: ProjectCreate) -> Project:
        project = Project(**project_data.dict())
        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)
        return project

    def get_by_id(self, project_id: int) -> Optional[Project]:
        return self.db.query(Project).filter(Project.id == project_id).first()

    def get_all(self) -> List[Project]:
        return self.db.query(Project).all()

    def update(self, project_id: int, update_data: ProjectUpdate) -> Optional[Project]:
        project = self.get_by_id(project_id)
        if not project:
            return None
        for field, value in update_data.dict(exclude_unset=True).items():
            setattr(project, field, value)
        self.db.commit()
        self.db.refresh(project)
        return project

    def delete(self, project_id: int) -> bool:
        project = self.get_by_id(project_id)
        if not project:
            return False
        self.db.delete(project)
        self.db.commit()
        return True
