# Link Schemas
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class LinkBase(BaseModel):
    platform: str
    url: str
    display_name: Optional[str] = None
    icon: Optional[str] = None
    is_primary: Optional[bool] = False


class LinkCreate(LinkBase):
    profile_id: int


class LinkUpdate(BaseModel):
    platform: Optional[str] = None
    url: Optional[str] = None
    display_name: Optional[str] = None
    icon: Optional[str] = None
    is_primary: Optional[bool] = None


class LinkResponse(LinkBase):
    id: int
    profile_id: int
    created_at: datetime

    class Config:
        from_attributes = True
