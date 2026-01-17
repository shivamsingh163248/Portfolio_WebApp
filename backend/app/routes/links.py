# Links Routes
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.link import Link
from app.schemas.link import LinkCreate, LinkUpdate, LinkResponse

router = APIRouter()


@router.get("/", response_model=List[LinkResponse])
def get_all_links(profile_id: int = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all links, optionally filtered by profile"""
    query = db.query(Link)
    if profile_id:
        query = query.filter(Link.profile_id == profile_id)
    return query.offset(skip).limit(limit).all()


@router.get("/{link_id}", response_model=LinkResponse)
def get_link(link_id: int, db: Session = Depends(get_db)):
    """Get a specific link"""
    link = db.query(Link).filter(Link.id == link_id).first()
    if not link:
        raise HTTPException(status_code=404, detail="Link not found")
    return link


@router.post("/", response_model=LinkResponse)
def create_link(link: LinkCreate, db: Session = Depends(get_db)):
    """Create a new link"""
    # Check if platform already exists for this profile
    existing = db.query(Link).filter(
        Link.profile_id == link.profile_id,
        Link.platform == link.platform
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Link for this platform already exists")
    
    db_link = Link(**link.model_dump())
    db.add(db_link)
    db.commit()
    db.refresh(db_link)
    return db_link


@router.put("/{link_id}", response_model=LinkResponse)
def update_link(link_id: int, link: LinkUpdate, db: Session = Depends(get_db)):
    """Update a link"""
    db_link = db.query(Link).filter(Link.id == link_id).first()
    if not db_link:
        raise HTTPException(status_code=404, detail="Link not found")
    
    update_data = link.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_link, field, value)
    
    db.commit()
    db.refresh(db_link)
    return db_link


@router.delete("/{link_id}")
def delete_link(link_id: int, db: Session = Depends(get_db)):
    """Delete a link"""
    db_link = db.query(Link).filter(Link.id == link_id).first()
    if not db_link:
        raise HTTPException(status_code=404, detail="Link not found")
    
    db.delete(db_link)
    db.commit()
    return {"message": "Link deleted successfully"}
