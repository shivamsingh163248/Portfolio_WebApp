# Skill Schemas
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SkillCategoryBase(BaseModel):
    name: str
    description: Optional[str] = None


class SkillCategoryResponse(SkillCategoryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class SkillBase(BaseModel):
    name: str
    proficiency_level: Optional[str] = "intermediate"
    years_of_experience: Optional[float] = None
    category_id: Optional[int] = None


class SkillCreate(SkillBase):
    profile_id: int


class SkillUpdate(BaseModel):
    name: Optional[str] = None
    proficiency_level: Optional[str] = None
    years_of_experience: Optional[float] = None
    category_id: Optional[int] = None


class SkillResponse(SkillBase):
    id: int
    profile_id: int
    created_at: datetime
    category: Optional[SkillCategoryResponse] = None

    class Config:
        from_attributes = True
