from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database.connection import get_db
from ..models.sms_models import Student

router = APIRouter(prefix="/students", tags=["students"])

@router.get("/")
async def get_students(db: Session = Depends(get_db)):
    return db.query(Student).all()

@router.get("/{student_id}")
async def get_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.post("/")
async def create_student(student_data: dict, db: Session = Depends(get_db)):
    student = Student(**student_data)
    db.add(student)
    db.commit()
    db.refresh(student)
    return student
