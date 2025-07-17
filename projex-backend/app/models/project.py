from sqlalchemy import Column, Integer, String, DateTime 
from sqlalchemy.orm import relationship
from sqlalchemy.sql import expression
from db.base import Base 

class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True, index=True)
    projectname = Column(String, index=True)
    description = Column(String)
    technology = Column(String)
    business_function = Column(String)
    initiation_date = Column(DateTime(timezone=True), server_default=expression.func.now())
    creation_date = Column(DateTime(timezone=True), server_default=expression.func.now())

    #back-reference to stages 
    stages = relationship("ProjectStage", back_populates="project", cascade="all, delete", lazy="selectin")