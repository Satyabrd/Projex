from db.base import Base 
from db.session import engine
from models import project #import all models so metadata is complete 

async def init_db():
    async with engine.begin() as conn:
        print("Creating database schema...")
        await conn.run_sync(Base.metadata.create_all)
        print("Database initialized successfully")