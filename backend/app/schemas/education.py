# Education Schemas
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class EducationBase(BaseModel):
    institution_name: str
    degree: Optional[str] = None
    field_of_study: Optional[str] = None
    location: Optional[str] = None
    start_year: Optional[int] = None
    end_year: Optional[int] = None
    grade: Optional[str] = None
    description: Optional[str] = None
    is_current: Optional[bool] = False


class EducationCreate(EducationBase):
    profile_id: int


class EducationUpdate(BaseModel):
    institution_name: Optional[str] = None
    degree: Optional[str] = None
    field_of_study: Optional[str] = None
    location: Optional[str] = None
    start_year: Optional[int] = None
    end_year: Optional[int] = None
    grade: Optional[str] = None
    description: Optional[str] = None
    is_current: Optional[bool] = None


class EducationResponse(EducationBase):
    id: int
    profile_id: int
    created_at: datetime

    class Config:
        from_attributes = True
