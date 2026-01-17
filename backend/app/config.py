# Configuration settings
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # Database settings
    database_url: str = "postgresql://portfolio_user:portfolio_pass@db:5432/portfolio_db"
    
    # API settings
    api_title: str = "Portfolio API"
    api_version: str = "1.0.0"
    debug: bool = True
    
    # CORS settings
    cors_origins: list = ["http://localhost:3000", "http://localhost:5173", "*"]
    
    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()
