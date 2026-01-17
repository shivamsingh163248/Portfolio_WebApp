# Project Model
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Boolean, Date, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("profiles.id", ondelete="CASCADE"))
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text)
    detailed_description = Column(Text)
    github_url = Column(String(500))
    live_url = Column(String(500))
    image_url = Column(String(500))
    start_date = Column(Date)
    end_date = Column(Date)
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    profile = relationship("Profile", back_populates="projects")
    skills = relationship("ProjectSkill", back_populates="project", cascade="all, delete-orphan")


class ProjectSkill(Base):
    __tablename__ = "project_skills"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"))
    skill_id = Column(Integer, ForeignKey("skills.id", ondelete="CASCADE"))

    __table_args__ = (
        UniqueConstraint('project_id', 'skill_id', name='uq_project_skill'),
    )

    # Relationships
    project = relationship("Project", back_populates="skills")
    skill = relationship("Skill", back_populates="projects")
