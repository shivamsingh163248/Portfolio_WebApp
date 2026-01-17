# Link Model
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Link(Base):
    __tablename__ = "links"

    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("profiles.id", ondelete="CASCADE"))
    platform = Column(String(100), nullable=False)
    url = Column(String(500), nullable=False)
    display_name = Column(String(255))
    icon = Column(String(100))
    is_primary = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        UniqueConstraint('profile_id', 'platform', name='uq_profile_platform'),
    )

    # Relationships
    profile = relationship("Profile", back_populates="links")
