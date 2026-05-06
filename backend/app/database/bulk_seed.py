import random
from faker import Faker
from sqlalchemy.orm import Session
from .connection import SessionLocal, engine, Base
from ..models.sms_models import Student, Teacher, Staff, Notice, Attendance, Fee, Subject
from datetime import datetime, timedelta

fake = Faker()

def bulk_seed():
    print("Initializing Bulk Seeding (500+ Students, 20+ Teachers)...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # 0. Seed Subjects (15)
        subjects_list = [
            ("Mathematics", "MATH101", "Science"),
            ("Physics", "PHYS102", "Science"),
            ("Chemistry", "CHEM103", "Science"),
            ("Biology", "BIO104", "Science"),
            ("English", "ENG105", "Humanities"),
            ("History", "HIST106", "Humanities"),
            ("Geography", "GEOG107", "Humanities"),
            ("Computer Science", "CS108", "Technology"),
            ("Arts", "ART109", "Fine Arts"),
            ("Physical Education", "PE110", "Athletics"),
            ("Economics", "ECON111", "Humanities"),
            ("Business Studies", "BUS112", "Commerce"),
            ("Accountancy", "ACC113", "Commerce"),
            ("Sociology", "SOC114", "Humanities")
        ]
        for title, code, dept in subjects_list:
            sub = Subject(title=title, code=code, department=dept, is_active=True)
            db.add(sub)
        print("15 Subjects seeded.")

        # 1. Seed Teachers (25)
        subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Computer Science", "Arts", "Physical Education"]
        teachers = []
        for _ in range(25):
            teacher = Teacher(
                full_name=fake.name(),
                email=fake.unique.email(),
                subject=random.choice(subjects),
                is_active=True,
                join_date=fake.date_between(start_date='-5y', end_date='today')
            )
            db.add(teacher)
            teachers.append(teacher)
        print("25 Teachers seeded.")

        # 2. Seed Students (520)
        grades = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]
        sections = ["A", "B", "C", "D"]
        students = []
        for i in range(520):
            student = Student(
                full_name=fake.name(),
                email=fake.unique.email(),
                grade=random.choice(grades),
                section=random.choice(sections),
                roll_number=str(1000 + i),
                phone=fake.phone_number()[:15],
                address=fake.address().replace("\n", ", "),
                is_active=random.choice([True, True, True, False]), # 75% active
                admission_date=fake.date_between(start_date='-3y', end_date='today')
            )
            db.add(student)
            students.append(student)
        print("520 Students seeded.")

        # 3. Seed Staff (10)
        roles = ["Admin", "Librarian", "Accountant", "Security", "Receptionist"]
        for _ in range(10):
            staff = Staff(
                full_name=fake.name(),
                role=random.choice(roles),
                is_active=True
            )
            db.add(staff)
        print("10 Staff members seeded.")

        # 4. Seed Notices (5)
        notices = [
            ("Summer Vacation", "School will remain closed from June 1st to June 30th."),
            ("Annual Sports Meet", "Register your names for the upcoming sports meet by Friday."),
            ("Parent-Teacher Meeting", "PTM for Term 1 results will be held this Saturday."),
            ("New Library Rules", "Students can now borrow up to 3 books for 14 days."),
            ("Physics Workshop", "Special workshop for Grade XII students on Quantum Mechanics.")
        ]
        for title, content in notices:
            notice = Notice(title=title, content=content, created_at=datetime.utcnow())
            db.add(notice)
        print("5 Notices seeded.")

        # 5. Seed some Attendance records (Last 7 days for 100 random students)
        for student in random.sample(students, 100):
            for day in range(7):
                att = Attendance(
                    student_id=student.id,
                    date=datetime.utcnow() - timedelta(days=day),
                    status=random.choice(["Present", "Present", "Present", "Absent", "Late"])
                )
                db.add(att)
        print("Sample Attendance logs seeded.")

        db.commit()
        print("Bulk Seeding Complete! System is now populated with real-world scale data.")

    except Exception as e:
        print(f"Error during seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    bulk_seed()
