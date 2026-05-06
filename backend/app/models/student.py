from sqlalchemy import Column, Integer, String, Boolean
from ..database.connection import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    grade = Column(String)
    is_active = Column(Boolean, default=True)
    hashed_password = Column(String)
