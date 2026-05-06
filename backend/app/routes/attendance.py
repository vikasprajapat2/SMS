from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database.connection import get_db
from ..models.sms_models import Attendance, Student
from datetime import datetime

router = APIRouter(prefix="/attendance", tags=["attendance"])

@router.get("/")
async def get_all_attendance(db: Session = Depends(get_db)):
    try:
        # Join with Student to get names
        results = db.query(Attendance, Student).join(Student, Attendance.student_id == Student.id).all()
        return [
            {
                "id": att.id,
                "student_name": std.full_name,
                "grade": std.grade,
                "section": std.section,
                "date": att.date,
                "status": att.status
            } for att, std in results
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def mark_attendance(data: dict, db: Session = Depends(get_db)):
    try:
        attendance = Attendance(
            student_id=data['student_id'],
            status=data['status'],
            date=datetime.utcnow()
        )
        db.add(attendance)
        db.commit()
        db.refresh(attendance)
        return attendance
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
