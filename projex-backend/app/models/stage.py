from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey 
from sqlalchemy.orm import relationship
from db.base import Base 

class ProjectStage(Base):
    __tablename__ = 'project_stages'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    
    #Foreign key reference
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)

    completion_percentage = Column(Integer, nullable=True)
    stage_notes = Column(Text)
    start_date = Column(Date)
    end_date = Column(Date)

    #Back reference to project
    project = relationship("Project", back_populates="stages")
    