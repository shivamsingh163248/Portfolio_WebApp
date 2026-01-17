# Portfolio API Backend
# FastAPI Application

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn

from app.database import engine, Base
from app.routes import profile, education, skills, projects, work_experience, links, certifications, search, health


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create database tables
    Base.metadata.create_all(bind=engine)
    yield
    # Shutdown: Clean up resources if needed


app = FastAPI(
    title="Portfolio API",
    description="API for managing portfolio information including profile, education, skills, projects, and work experience",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://frontend:3000",
    "http://127.0.0.1:3000",
    "*"  # Allow all origins for development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, tags=["Health"])
app.include_router(profile.router, prefix="/api/profile", tags=["Profile"])
app.include_router(education.router, prefix="/api/education", tags=["Education"])
app.include_router(skills.router, prefix="/api/skills", tags=["Skills"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(work_experience.router, prefix="/api/work-experience", tags=["Work Experience"])
app.include_router(links.router, prefix="/api/links", tags=["Links"])
app.include_router(certifications.router, prefix="/api/certifications", tags=["Certifications"])
app.include_router(search.router, prefix="/api/search", tags=["Search"])


@app.get("/")
async def root():
    return {
        "message": "Welcome to Portfolio API",
        "docs": "/docs",
        "health": "/health"
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
