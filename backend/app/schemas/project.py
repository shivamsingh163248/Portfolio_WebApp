# Project Schemas
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, date


class ProjectSkillResponse(BaseModel):
    id: int
    skill_id: int
    skill_name: Optional[str] = None

    class Config:
        from_attributes = True


class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    detailed_description: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    is_featured: Optional[bool] = False


class ProjectCreate(ProjectBase):
    profile_id: int
    skill_ids: Optional[List[int]] = []


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    detailed_description: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    is_featured: Optional[bool] = None
    skill_ids: Optional[List[int]] = None


class ProjectResponse(ProjectBase):
    id: int
    profile_id: int
    created_at: datetime
    updated_at: datetime
    skills: List[str] = []

    class Config:
        from_attributes = True
