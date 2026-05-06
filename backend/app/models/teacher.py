from sqlalchemy import Column, Integer, String, Boolean
from ..database.connection import Base

class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    subject = Column(String)
    is_active = Column(Boolean, default=True)
    hashed_password = Column(String)
