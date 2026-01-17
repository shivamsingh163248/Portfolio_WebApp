# Skill Model
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Numeric, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("profiles.id", ondelete="CASCADE"))
    category_id = Column(Integer, ForeignKey("skill_categories.id", ondelete="SET NULL"))
    name = Column(String(100), nullable=False, index=True)
    proficiency_level = Column(String(50), default="intermediate")
    years_of_experience = Column(Numeric(3, 1))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        UniqueConstraint('profile_id', 'name', name='uq_profile_skill'),
    )

    # Relationships
    profile = relationship("Profile", back_populates="skills")
    category = relationship("SkillCategory", back_populates="skills")
    projects = relationship("ProjectSkill", back_populates="skill")
