# Education Routes
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.education import Education
from app.schemas.education import EducationCreate, EducationUpdate, EducationResponse

router = APIRouter()


@router.get("/", response_model=List[EducationResponse])
def get_all_education(profile_id: int = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all education records, optionally filtered by profile"""
    query = db.query(Education)
    if profile_id:
        query = query.filter(Education.profile_id == profile_id)
    return query.order_by(Education.end_year.desc()).offset(skip).limit(limit).all()


@router.get("/{education_id}", response_model=EducationResponse)
def get_education(education_id: int, db: Session = Depends(get_db)):
    """Get a specific education record"""
    education = db.query(Education).filter(Education.id == education_id).first()
    if not education:
        raise HTTPException(status_code=404, detail="Education record not found")
    return education


@router.post("/", response_model=EducationResponse)
def create_education(education: EducationCreate, db: Session = Depends(get_db)):
    """Create a new education record"""
    db_education = Education(**education.model_dump())
    db.add(db_education)
    db.commit()
    db.refresh(db_education)
    return db_education


@router.put("/{education_id}", response_model=EducationResponse)
def update_education(education_id: int, education: EducationUpdate, db: Session = Depends(get_db)):
    """Update an education record"""
    db_education = db.query(Education).filter(Education.id == education_id).first()
    if not db_education:
        raise HTTPException(status_code=404, detail="Education record not found")
    
    update_data = education.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_education, field, value)
    
    db.commit()
    db.refresh(db_education)
    return db_education


@router.delete("/{education_id}")
def delete_education(education_id: int, db: Session = Depends(get_db)):
    """Delete an education record"""
    db_education = db.query(Education).filter(Education.id == education_id).first()
    if not db_education:
        raise HTTPException(status_code=404, detail="Education record not found")
    
    db.delete(db_education)
    db.commit()
    return {"message": "Education record deleted successfully"}
