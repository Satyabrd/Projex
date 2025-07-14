from fastapi import FastAPI
from contextlib import asynccontextmanager
from api.v1 import project
from db.init_db import init_db
from core.cors import setup_cors
import uvicorn

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialize DB
    await init_db()
    yield
    # 🔒 Optional: cleanup tasks (e.g., closing connections)


app = FastAPI(lifespan=lifespan)

# Setup CORS
setup_cors(app)

# Register project routes
app.include_router(project.router, prefix="/api/v1", tags=["Projects"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)


