# Work Experience Schemas
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, date


class WorkExperienceBase(BaseModel):
    company_name: str
    job_title: str
    location: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    is_current: Optional[bool] = False
    description: Optional[str] = None
    achievements: Optional[List[str]] = []


class WorkExperienceCreate(WorkExperienceBase):
    profile_id: int


class WorkExperienceUpdate(BaseModel):
    company_name: Optional[str] = None
    job_title: Optional[str] = None
    location: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    is_current: Optional[bool] = None
    description: Optional[str] = None
    achievements: Optional[List[str]] = None


class WorkExperienceResponse(WorkExperienceBase):
    id: int
    profile_id: int
    created_at: datetime

    class Config:
        from_attributes = True
