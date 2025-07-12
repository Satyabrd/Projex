from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/projex"
    API_V1_STR: str = "/api/v1"

    class Config:
        env_file = ".env"

settings = Settings()