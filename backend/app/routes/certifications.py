# Certifications Routes
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.certification import Certification
from app.schemas.certification import CertificationCreate, CertificationUpdate, CertificationResponse

router = APIRouter()


@router.get("/", response_model=List[CertificationResponse])
def get_all_certifications(profile_id: int = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all certifications, optionally filtered by profile"""
    query = db.query(Certification)
    if profile_id:
        query = query.filter(Certification.profile_id == profile_id)
    return query.order_by(Certification.issue_date.desc()).offset(skip).limit(limit).all()


@router.get("/{certification_id}", response_model=CertificationResponse)
def get_certification(certification_id: int, db: Session = Depends(get_db)):
    """Get a specific certification"""
    certification = db.query(Certification).filter(Certification.id == certification_id).first()
    if not certification:
        raise HTTPException(status_code=404, detail="Certification not found")
    return certification


@router.post("/", response_model=CertificationResponse)
def create_certification(certification: CertificationCreate, db: Session = Depends(get_db)):
    """Create a new certification"""
    db_certification = Certification(**certification.model_dump())
    db.add(db_certification)
    db.commit()
    db.refresh(db_certification)
    return db_certification


@router.put("/{certification_id}", response_model=CertificationResponse)
def update_certification(certification_id: int, certification: CertificationUpdate, db: Session = Depends(get_db)):
    """Update a certification"""
    db_certification = db.query(Certification).filter(Certification.id == certification_id).first()
    if not db_certification:
        raise HTTPException(status_code=404, detail="Certification not found")
    
    update_data = certification.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_certification, field, value)
    
    db.commit()
    db.refresh(db_certification)
    return db_certification


@router.delete("/{certification_id}")
def delete_certification(certification_id: int, db: Session = Depends(get_db)):
    """Delete a certification"""
    db_certification = db.query(Certification).filter(Certification.id == certification_id).first()
    if not db_certification:
        raise HTTPException(status_code=404, detail="Certification not found")
    
    db.delete(db_certification)
    db.commit()
    return {"message": "Certification deleted successfully"}
