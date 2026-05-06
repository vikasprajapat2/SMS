import random
from faker import Faker
from sqlalchemy.orm import Session
from .connection import SessionLocal, engine, Base
from ..models.sms_models import Student, Teacher, Staff, Notice, Attendance, Fee, Subject
from datetime import datetime, timedelta, date

fake = Faker()

def bulk_seed():
    print("Initializing Comprehensive Bulk Seeding...")
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
            ("Sociology", "SOC114", "Humanities"),
            ("Civics", "CIV115", "Humanities")
        ]
        for title, code, dept in subjects_list:
            sub = Subject(title=title, code=code, department=dept, is_active=True)
            db.add(sub)
        print("15 Subjects seeded.")

        # 1. Seed Teachers (25)
        teachers = []
        for _ in range(25):
            teacher = Teacher(
                full_name=fake.name(),
                email=fake.unique.email(),
                subject=random.choice([s[0] for s in subjects_list]),
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
                is_active=True,
                admission_date=fake.date_between(start_date='-3y', end_date='today')
            )
            db.add(student)
            db.flush() # Get ID
            students.append(student)
        print("520 Students seeded.")

        # 3. Seed Fees (500 Records)
        for i in range(500):
            fee = Fee(
                student_id=students[i % 520].id,
                amount=random.choice([1500, 2000, 2500, 3000, 5000]),
                term=random.choice(["Term 1", "Term 2", "Annual"]),
                paid_date=datetime.utcnow() - timedelta(days=random.randint(0, 30)),
                status=random.choice(["Paid", "Paid", "Paid", "Pending"]) # 75% Paid
            )
            db.add(fee)
        print("500 Fee records seeded.")

        # 4. Seed Attendance (Today for everyone)
        today = date.today()
        for student in students:
            att = Attendance(
                student_id=student.id,
                date=datetime.combine(today, datetime.min.time()),
                status=random.choice(["Present", "Present", "Present", "Present", "Absent", "Late", "Medical"])
            )
            db.add(att)
        print(f"Attendance for all 520 students seeded for {today}.")

        # 5. Seed Notices
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

        db.commit()
        print("Bulk Seeding Complete! System is now fully populated with consistent data.")

    except Exception as e:
        print(f"Error during seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    bulk_seed()
