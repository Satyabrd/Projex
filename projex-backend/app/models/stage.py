from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import expression
from db.base import Base 

class ProjectStage(Base):
    __tablename__ = 'project_stages'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    
    #Foreign key reference
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)

    completion_percentage = Column(Integer, nullable=True)
    stage_notes = Column(Text)
    start_date = Column(DateTime)
    end_date = Column(DateTime)

    #Back reference to project
    project = relationship("Project", back_populates="stages")
    sprints = relationship("ProjectSprint", back_populates="stage", cascade="all, delete", lazy="selectin")
    