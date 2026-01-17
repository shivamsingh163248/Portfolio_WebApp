# Skills Routes
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from app.database import get_db
from app.models.skill import Skill
from app.models.skill_category import SkillCategory
from app.models.project import ProjectSkill
from app.schemas.skill import SkillCreate, SkillUpdate, SkillResponse, SkillCategoryResponse

router = APIRouter()


@router.get("/", response_model=List[SkillResponse])
def get_all_skills(
    profile_id: int = None, 
    category_id: int = None,
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """Get all skills, optionally filtered by profile or category"""
    query = db.query(Skill)
    if profile_id:
        query = query.filter(Skill.profile_id == profile_id)
    if category_id:
        query = query.filter(Skill.category_id == category_id)
    return query.offset(skip).limit(limit).all()


@router.get("/top", response_model=List[dict])
def get_top_skills(limit: int = 10, db: Session = Depends(get_db)):
    """Get top skills based on usage in projects"""
    results = (
        db.query(Skill.name, func.count(ProjectSkill.id).label('project_count'))
        .outerjoin(ProjectSkill, Skill.id == ProjectSkill.skill_id)
        .group_by(Skill.id, Skill.name)
        .order_by(func.count(ProjectSkill.id).desc())
        .limit(limit)
        .all()
    )
    return [{"name": r[0], "project_count": r[1]} for r in results]


@router.get("/categories", response_model=List[SkillCategoryResponse])
def get_skill_categories(db: Session = Depends(get_db)):
    """Get all skill categories"""
    return db.query(SkillCategory).all()


@router.get("/by-category", response_model=List[dict])
def get_skills_grouped_by_category(profile_id: int = 1, db: Session = Depends(get_db)):
    """Get skills grouped by category"""
    categories = db.query(SkillCategory).all()
    result = []
    for category in categories:
        skills = db.query(Skill).filter(
            Skill.category_id == category.id,
            Skill.profile_id == profile_id
        ).all()
        if skills:
            result.append({
                "category": category.name,
                "category_id": category.id,
                "skills": [{"id": s.id, "name": s.name, "proficiency_level": s.proficiency_level} for s in skills]
            })
    return result


@router.get("/{skill_id}", response_model=SkillResponse)
def get_skill(skill_id: int, db: Session = Depends(get_db)):
    """Get a specific skill"""
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return skill


@router.post("/", response_model=SkillResponse)
def create_skill(skill: SkillCreate, db: Session = Depends(get_db)):
    """Create a new skill"""
    # Check if skill already exists for this profile
    existing = db.query(Skill).filter(
        Skill.profile_id == skill.profile_id,
        Skill.name == skill.name
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Skill already exists for this profile")
    
    db_skill = Skill(**skill.model_dump())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill


@router.put("/{skill_id}", response_model=SkillResponse)
def update_skill(skill_id: int, skill: SkillUpdate, db: Session = Depends(get_db)):
    """Update a skill"""
    db_skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    update_data = skill.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_skill, field, value)
    
    db.commit()
    db.refresh(db_skill)
    return db_skill


@router.delete("/{skill_id}")
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    """Delete a skill"""
    db_skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    db.delete(db_skill)
    db.commit()
    return {"message": "Skill deleted successfully"}
