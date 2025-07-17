from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from db.base import Base 


class ProjectSprint(Base):
    __tablename__ = 'project_sprints'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    
    #Foreign key reference
    stage_id = Column(Integer, ForeignKey("project_stages.id", ondelete="CASCADE"), nullable=False)

    completion_percentage = Column(Integer, nullable=True)
    sprint_notes = Column(Text)
    start_date = Column(DateTime)
    end_date = Column(DateTime)

    #Back reference to project
    stage = relationship("ProjectStage", back_populates="sprints")