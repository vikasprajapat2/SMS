from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database.connection import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    role = Column(String) # admin, teacher, student

class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    grade = Column(String)
    section = Column(String)
    roll_number = Column(String)
    phone = Column(String)
    address = Column(String)
    is_active = Column(Boolean, default=True)
    admission_date = Column(DateTime, default=datetime.utcnow)
    
    attendance = relationship("Attendance", back_populates="student")
    fees = relationship("Fee", back_populates="student")

class Teacher(Base):
    __tablename__ = "teachers"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    subject = Column(String)
    is_active = Column(Boolean, default=True)
    join_date = Column(DateTime, default=datetime.utcnow)

class Staff(Base):
    __tablename__ = "staff"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    role = Column(String)
    is_active = Column(Boolean, default=True)

class Attendance(Base):
    __tablename__ = "attendance"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    date = Column(DateTime, default=datetime.utcnow)
    status = Column(String) # Present, Absent, Emergency, Medical, Late
    
    student = relationship("Student", back_populates="attendance")

class Fee(Base):
    __tablename__ = "fees"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    amount = Column(Float)
    term = Column(String)
    status = Column(String) # Paid, Unpaid, Pending
    paid_date = Column(DateTime, nullable=True)
    
    student = relationship("Student", back_populates="fees")

class Notice(Base):
    __tablename__ = "notices"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class Subject(Base):
    __tablename__ = "subjects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    code = Column(String, unique=True, index=True)
    department = Column(String)
    is_active = Column(Boolean, default=True)

class ExamTimetable(Base):
    __tablename__ = "exam_timetables"
    id = Column(Integer, primary_key=True, index=True)
    class_name = Column(String, index=True)       # e.g. "10th - A"
    term = Column(String, index=True)              # e.g. "Annual Examination"
    subject = Column(String)
    date = Column(String)                          # ISO date string YYYY-MM-DD
    start_time = Column(String)                    # e.g. "09:00"
    end_time = Column(String)                      # e.g. "12:00"
    marks = Column(Integer)
    room = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class LectureTimetable(Base):
    __tablename__ = "lecture_timetables"
    id = Column(Integer, primary_key=True, index=True)
    class_name = Column(String, index=True)        # e.g. "10th - A"
    day = Column(String)                           # e.g. "Monday"
    period = Column(Integer)                       # 1-8
    subject = Column(String)
    teacher = Column(String, nullable=True)
    room = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ClassConfig(Base):
    __tablename__ = "class_configs"
    id         = Column(Integer, primary_key=True, index=True)
    name       = Column(String, unique=True, index=True)   # e.g. "10th - A"
    group_label= Column(String, default="Custom")          # e.g. "Secondary (9-10)"
    sort_order = Column(Integer, default=999)
    created_at = Column(DateTime, default=datetime.utcnow)
