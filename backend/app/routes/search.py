# Search Routes
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional

from app.database import get_db
from app.models.profile import Profile
from app.models.skill import Skill
from app.models.project import Project, ProjectSkill
from app.models.education import Education
from app.models.work_experience import WorkExperience

router = APIRouter()


@router.get("/")
def search(
    q: str = Query(..., description="Search query string"),
    db: Session = Depends(get_db)
):
    """
    Global search across profiles, skills, projects, and work experience.
    Returns categorized results.
    """
    search_term = f"%{q.lower()}%"
    
    results = {
        "query": q,
        "profiles": [],
        "skills": [],
        "projects": [],
        "education": [],
        "work_experience": []
    }
    
    # Search profiles
    profiles = db.query(Profile).filter(
        or_(
            Profile.first_name.ilike(search_term),
            Profile.last_name.ilike(search_term),
            Profile.email.ilike(search_term),
            Profile.summary.ilike(search_term)
        )
    ).all()
    results["profiles"] = [
        {
            "id": p.id,
            "name": f"{p.first_name} {p.last_name}",
            "email": p.email,
            "location": p.location
        }
        for p in profiles
    ]
    
    # Search skills
    skills = db.query(Skill).filter(
        Skill.name.ilike(search_term)
    ).all()
    results["skills"] = [
        {
            "id": s.id,
            "name": s.name,
            "proficiency_level": s.proficiency_level,
            "category": s.category.name if s.category else None
        }
        for s in skills
    ]
    
    # Search projects
    projects = db.query(Project).filter(
        or_(
            Project.title.ilike(search_term),
            Project.description.ilike(search_term),
            Project.detailed_description.ilike(search_term)
        )
    ).all()
    results["projects"] = [
        {
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "skills": [ps.skill.name for ps in p.skills if ps.skill]
        }
        for p in projects
    ]
    
    # Search education
    education = db.query(Education).filter(
        or_(
            Education.institution_name.ilike(search_term),
            Education.degree.ilike(search_term),
            Education.field_of_study.ilike(search_term)
        )
    ).all()
    results["education"] = [
        {
            "id": e.id,
            "institution": e.institution_name,
            "degree": e.degree,
            "field": e.field_of_study
        }
        for e in education
    ]
    
    # Search work experience
    work_exp = db.query(WorkExperience).filter(
        or_(
            WorkExperience.company_name.ilike(search_term),
            WorkExperience.job_title.ilike(search_term),
            WorkExperience.description.ilike(search_term)
        )
    ).all()
    results["work_experience"] = [
        {
            "id": w.id,
            "company": w.company_name,
            "job_title": w.job_title,
            "description": w.description
        }
        for w in work_exp
    ]
    
    # Count total results
    results["total_results"] = (
        len(results["profiles"]) +
        len(results["skills"]) +
        len(results["projects"]) +
        len(results["education"]) +
        len(results["work_experience"])
    )
    
    return results


@router.get("/projects-by-skill")
def search_projects_by_skill(
    skill: str = Query(..., description="Skill name to filter projects"),
    db: Session = Depends(get_db)
):
    """Search projects by skill name"""
    projects = (
        db.query(Project)
        .join(ProjectSkill)
        .join(Skill)
        .filter(Skill.name.ilike(f"%{skill}%"))
        .all()
    )
    
    return {
        "skill": skill,
        "count": len(projects),
        "projects": [
            {
                "id": p.id,
                "title": p.title,
                "description": p.description,
                "skills": [ps.skill.name for ps in p.skills if ps.skill],
                "github_url": p.github_url,
                "live_url": p.live_url
            }
            for p in projects
        ]
    }
