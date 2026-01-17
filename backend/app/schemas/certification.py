# Certification Schemas
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date


class CertificationBase(BaseModel):
    title: str
    issuing_organization: Optional[str] = None
    issue_date: Optional[date] = None
    expiry_date: Optional[date] = None
    credential_id: Optional[str] = None
    credential_url: Optional[str] = None
    description: Optional[str] = None


class CertificationCreate(CertificationBase):
    profile_id: int


class CertificationUpdate(BaseModel):
    title: Optional[str] = None
    issuing_organization: Optional[str] = None
    issue_date: Optional[date] = None
    expiry_date: Optional[date] = None
    credential_id: Optional[str] = None
    credential_url: Optional[str] = None
    description: Optional[str] = None


class CertificationResponse(CertificationBase):
    id: int
    profile_id: int
    created_at: datetime

    class Config:
        from_attributes = True
