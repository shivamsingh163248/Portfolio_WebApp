# Projects Routes
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models.project import Project, ProjectSkill
from app.models.skill import Skill
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse

router = APIRouter()


def get_project_with_skills(project, db):
    """Helper to get project with skill names"""
    skill_names = [ps.skill.name for ps in project.skills if ps.skill]
    return {
        **{c.name: getattr(project, c.name) for c in project.__table__.columns},
        "skills": skill_names
    }


@router.get("/", response_model=List[ProjectResponse])
def get_all_projects(
    profile_id: int = None,
    skill: Optional[str] = Query(None, description="Filter by skill name"),
    featured: Optional[bool] = None,
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """Get all projects, optionally filtered by profile, skill, or featured status"""
    query = db.query(Project)
    
    if profile_id:
        query = query.filter(Project.profile_id == profile_id)
    
    if skill:
        # Filter projects that have the specified skill
        query = query.join(ProjectSkill).join(Skill).filter(
            Skill.name.ilike(f"%{skill}%")
        )
    
    if featured is not None:
        query = query.filter(Project.is_featured == featured)
    
    projects = query.order_by(Project.created_at.desc()).offset(skip).limit(limit).all()
    
    return [get_project_with_skills(p, db) for p in projects]


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    """Get a specific project"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return get_project_with_skills(project, db)


@router.post("/", response_model=ProjectResponse)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    """Create a new project"""
    skill_ids = project.skill_ids or []
    project_data = project.model_dump(exclude={'skill_ids'})
    
    db_project = Project(**project_data)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    
    # Add skill associations
    for skill_id in skill_ids:
        skill = db.query(Skill).filter(Skill.id == skill_id).first()
        if skill:
            project_skill = ProjectSkill(project_id=db_project.id, skill_id=skill_id)
            db.add(project_skill)
    
    db.commit()
    db.refresh(db_project)
    return get_project_with_skills(db_project, db)


@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(project_id: int, project: ProjectUpdate, db: Session = Depends(get_db)):
    """Update a project"""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = project.model_dump(exclude_unset=True, exclude={'skill_ids'})
    for field, value in update_data.items():
        setattr(db_project, field, value)
    
    # Update skill associations if provided
    if project.skill_ids is not None:
        # Remove existing associations
        db.query(ProjectSkill).filter(ProjectSkill.project_id == project_id).delete()
        # Add new associations
        for skill_id in project.skill_ids:
            skill = db.query(Skill).filter(Skill.id == skill_id).first()
            if skill:
                project_skill = ProjectSkill(project_id=project_id, skill_id=skill_id)
                db.add(project_skill)
    
    db.commit()
    db.refresh(db_project)
    return get_project_with_skills(db_project, db)


@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    """Delete a project"""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db.delete(db_project)
    db.commit()
    return {"message": "Project deleted successfully"}
