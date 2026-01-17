# Profile Routes
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.profile import Profile
from app.schemas.profile import ProfileCreate, ProfileUpdate, ProfileResponse, ProfileFullResponse

router = APIRouter()


@router.get("/", response_model=List[ProfileResponse])
def get_all_profiles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all profiles with pagination"""
    profiles = db.query(Profile).offset(skip).limit(limit).all()
    return profiles


@router.get("/{profile_id}", response_model=ProfileFullResponse)
def get_profile(profile_id: int, db: Session = Depends(get_db)):
    """Get a specific profile with all related data"""
    profile = db.query(Profile).filter(Profile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    # Build response with skills list
    response = {
        "id": profile.id,
        "first_name": profile.first_name,
        "last_name": profile.last_name,
        "email": profile.email,
        "phone": profile.phone,
        "location": profile.location,
        "summary": profile.summary,
        "resume_url": profile.resume_url,
        "created_at": profile.created_at,
        "updated_at": profile.updated_at,
        "skills": profile.skills,
        "education": profile.education,
        "projects": [
            {
                **project.__dict__,
                "skills": [ps.skill.name for ps in project.skills if ps.skill]
            }
            for project in profile.projects
        ],
        "work_experience": profile.work_experience,
        "links": profile.links,
        "certifications": profile.certifications
    }
    return response


@router.post("/", response_model=ProfileResponse)
def create_profile(profile: ProfileCreate, db: Session = Depends(get_db)):
    """Create a new profile"""
    # Check if email already exists
    existing = db.query(Profile).filter(Profile.email == profile.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_profile = Profile(**profile.model_dump())
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile


@router.put("/{profile_id}", response_model=ProfileResponse)
def update_profile(profile_id: int, profile: ProfileUpdate, db: Session = Depends(get_db)):
    """Update an existing profile"""
    db_profile = db.query(Profile).filter(Profile.id == profile_id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    update_data = profile.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_profile, field, value)
    
    db.commit()
    db.refresh(db_profile)
    return db_profile


@router.delete("/{profile_id}")
def delete_profile(profile_id: int, db: Session = Depends(get_db)):
    """Delete a profile"""
    db_profile = db.query(Profile).filter(Profile.id == profile_id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    db.delete(db_profile)
    db.commit()
    return {"message": "Profile deleted successfully"}
