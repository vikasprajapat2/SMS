from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, date
from ..database.connection import get_db
from ..models import Student, Teacher, Staff, Attendance, Fee, Notice, Subject

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/stats")
async def get_dashboard_stats(db: Session = Depends(get_db)):
    try:
        # 1. Base Counts
        student_count = db.query(Student).count()
        teacher_count = db.query(Teacher).count()
        staff_count = db.query(Staff).count()
        subjects_count = db.query(Subject).count()
        
        student_active = db.query(Student).filter(Student.is_active == True).count()
        teacher_active = db.query(Teacher).filter(Teacher.is_active == True).count()
        staff_active = db.query(Staff).filter(Staff.is_active == True).count()
        subjects_active = db.query(Subject).filter(Subject.is_active == True).count()

        # 2. Precise Attendance Breakdown (Today)
        # We use date.today() for local server time matching
        today = date.today()
        
        # Student Attendance
        s_att_query = db.query(Attendance.status, func.count(Attendance.id))\
            .filter(func.date(Attendance.date) == today)\
            .group_by(Attendance.status).all()
        s_att_map = {status: count for status, count in s_att_query}

        # 3. Fee Stats (Fixed Decimal/Float conversion)
        collected = db.query(func.sum(Fee.amount)).filter(Fee.status == "Paid").scalar() or 0
        pending = db.query(func.sum(Fee.amount)).filter(Fee.status == "Pending").scalar() or 0

        return {
            "students": {"total": student_count, "active": student_active, "inactive": student_count - student_active},
            "teachers": {"total": teacher_count, "active": teacher_active, "inactive": teacher_count - teacher_active},
            "staff": {"total": staff_count, "active": staff_active, "inactive": staff_count - staff_active},
            "subjects": {"total": subjects_count, "active": subjects_active, "inactive": subjects_count - subjects_active},
            "attendance": {
                "students": {
                    "present": s_att_map.get("Present", 0),
                    "absent": s_att_map.get("Absent", 0),
                    "late": s_att_map.get("Late", 0),
                    "medical": s_att_map.get("Medical", 0),
                    "emergency": s_att_map.get("Emergency", 0)
                },
                "teachers": {
                    "present": 0, # To be implemented with TeacherAttendance model
                    "absent": 0,
                    "late": 0,
                    "medical": 0
                }
            },
            "fees": {
                "collected": float(collected),
                "pending": float(pending),
                "target": float(collected + pending)
            }
        }
    except Exception as e:
        print(f"Dashboard Stats Error: {e}")
        return {"error": str(e)}

@router.get("/notices")
async def get_notices(db: Session = Depends(get_db)):
    return db.query(Notice).order_by(Notice.created_at.desc()).limit(5).all()
