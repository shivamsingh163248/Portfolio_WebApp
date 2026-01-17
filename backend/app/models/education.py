# Education Model
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Education(Base):
    __tablename__ = "education"

    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("profiles.id", ondelete="CASCADE"))
    institution_name = Column(String(255), nullable=False)
    degree = Column(String(100))
    field_of_study = Column(String(100))
    location = Column(String(255))
    start_year = Column(Integer)
    end_year = Column(Integer)
    grade = Column(String(50))
    description = Column(Text)
    is_current = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    profile = relationship("Profile", back_populates="education")
