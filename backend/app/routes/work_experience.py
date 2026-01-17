# Work Experience Routes
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.work_experience import WorkExperience
from app.schemas.work_experience import WorkExperienceCreate, WorkExperienceUpdate, WorkExperienceResponse

router = APIRouter()


@router.get("/", response_model=List[WorkExperienceResponse])
def get_all_work_experience(profile_id: int = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all work experience records, optionally filtered by profile"""
    query = db.query(WorkExperience)
    if profile_id:
        query = query.filter(WorkExperience.profile_id == profile_id)
    return query.order_by(WorkExperience.start_date.desc()).offset(skip).limit(limit).all()


@router.get("/{experience_id}", response_model=WorkExperienceResponse)
def get_work_experience(experience_id: int, db: Session = Depends(get_db)):
    """Get a specific work experience record"""
    experience = db.query(WorkExperience).filter(WorkExperience.id == experience_id).first()
    if not experience:
        raise HTTPException(status_code=404, detail="Work experience record not found")
    return experience


@router.post("/", response_model=WorkExperienceResponse)
def create_work_experience(experience: WorkExperienceCreate, db: Session = Depends(get_db)):
    """Create a new work experience record"""
    db_experience = WorkExperience(**experience.model_dump())
    db.add(db_experience)
    db.commit()
    db.refresh(db_experience)
    return db_experience


@router.put("/{experience_id}", response_model=WorkExperienceResponse)
def update_work_experience(experience_id: int, experience: WorkExperienceUpdate, db: Session = Depends(get_db)):
    """Update a work experience record"""
    db_experience = db.query(WorkExperience).filter(WorkExperience.id == experience_id).first()
    if not db_experience:
        raise HTTPException(status_code=404, detail="Work experience record not found")
    
    update_data = experience.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_experience, field, value)
    
    db.commit()
    db.refresh(db_experience)
    return db_experience


@router.delete("/{experience_id}")
def delete_work_experience(experience_id: int, db: Session = Depends(get_db)):
    """Delete a work experience record"""
    db_experience = db.query(WorkExperience).filter(WorkExperience.id == experience_id).first()
    if not db_experience:
        raise HTTPException(status_code=404, detail="Work experience record not found")
    
    db.delete(db_experience)
    db.commit()
    return {"message": "Work experience record deleted successfully"}
