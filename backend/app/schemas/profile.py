# Profile Schemas
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


class ProfileBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: Optional[str] = None
    location: Optional[str] = None
    summary: Optional[str] = None
    resume_url: Optional[str] = None


class ProfileCreate(ProfileBase):
    pass


class ProfileUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    summary: Optional[str] = None
    resume_url: Optional[str] = None


class ProfileResponse(ProfileBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ProfileFullResponse(ProfileResponse):
    skills: List["SkillResponse"] = []
    education: List["EducationResponse"] = []
    projects: List["ProjectResponse"] = []
    work_experience: List["WorkExperienceResponse"] = []
    links: List["LinkResponse"] = []
    certifications: List["CertificationResponse"] = []

    class Config:
        from_attributes = True


# Import these for type hints (forward references)
from app.schemas.skill import SkillResponse
from app.schemas.education import EducationResponse
from app.schemas.project import ProjectResponse
from app.schemas.work_experience import WorkExperienceResponse
from app.schemas.link import LinkResponse
from app.schemas.certification import CertificationResponse

ProfileFullResponse.model_rebuild()
