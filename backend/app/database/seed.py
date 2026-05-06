from sqlalchemy.orm import Session
from app.database.connection import SessionLocal, engine, Base
from app.models.sms_models import Student, Teacher, Staff, Notice
from datetime import datetime

def seed_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Check if we already have data
    if db.query(Student).first():
        print("Database already seeded.")
        return

    print("Seeding database...")

    # Sample Students
    students = [
        Student(full_name="Fahed Bin", email="fahed@example.com", grade="III", section="C", is_active=True),
        Student(full_name="Tenesa John", email="tenesa@example.com", grade="XII", section="A", is_active=True),
        Student(full_name="James Wilson", email="james@example.com", grade="X", section="B", is_active=True),
        Student(full_name="Maria Garcia", email="maria@example.com", grade="VIII", section="A", is_active=False),
    ]
    db.add_all(students)

    # Sample Teachers
    teachers = [
        Teacher(full_name="Adrian Rubell", email="adrian@example.com", subject="Physics", is_active=True),
        Teacher(full_name="Sarah Smith", email="sarah@example.com", subject="Mathematics", is_active=True),
    ]
    db.add_all(teachers)

    # Sample Staff
    staff = [
        Staff(full_name="John Accountant", role="Accountant", is_active=True),
    ]
    db.add_all(staff)

    # Sample Notices
    notices = [
        Notice(title="World Environment Day Program", content="Details about environment day..."),
        Notice(title="New Syllabus Instructions", content="Please check the updated syllabus..."),
    ]
    db.add_all(notices)

    db.commit()
    print("Seeding complete!")

if __name__ == "__main__":
    seed_db()
