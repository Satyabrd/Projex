from sqlalchemy import Column, Integer, String 
from sqlalchemy.orm import relationship
from db.base import Base 

class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    technology = Column(String)
    business_function = Column(String)
    initiation_date = Column(String)
    creation_date = Column(String)

    #back-reference to stages 
    stages = relationship("ProjectStage", back_populates="project", cascade="all, delete")