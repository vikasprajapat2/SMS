from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
from ..database.connection import get_db
from ..models import Student, Teacher, Staff, Attendance, Fee, Notice, Subject

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/stats")
async def get_dashboard_stats(db: Session = Depends(get_db)):
    try:
        student_count = db.query(Student).count()
        teacher_count = db.query(Teacher).count()
        staff_count = db.query(Staff).count()
        
        student_active = db.query(Student).filter(Student.is_active == True).count()
        teacher_active = db.query(Teacher).filter(Teacher.is_active == True).count()
        staff_active = db.query(Staff).filter(Staff.is_active == True).count()

        subjects_count = db.query(Subject).count()
        subjects_active = db.query(Subject).filter(Subject.is_active == True).count()

        # Attendance Breakdown (Today)
        today = datetime.utcnow().date()
        
        # Students
        student_att = db.query(Attendance.status, func.count(Attendance.id))\
            .join(Student, Attendance.student_id == Student.id)\
            .filter(func.date(Attendance.date) == today)\
            .group_by(Attendance.status).all()
        s_att = {s: count for s, count in student_att}

        # Teachers (Mock logic for now)
        t_att = {"Present": 22, "Absent": 2, "Late": 1, "Medical": 0} 

        # Fee Stats
        total_collected = db.query(func.sum(Fee.amount)).filter(Fee.status == "Paid").scalar() or 0
        total_pending = db.query(func.sum(Fee.amount)).filter(Fee.status == "Pending").scalar() or 0

        return {
            "students": {"total": student_count, "active": student_active, "inactive": student_count - student_active},
            "teachers": {"total": teacher_count, "active": teacher_active, "inactive": teacher_count - teacher_active},
            "staff": {"total": staff_count, "active": staff_active, "inactive": staff_count - staff_active},
            "subjects": {"total": subjects_count, "active": subjects_active, "inactive": subjects_count - subjects_active},
            "attendance": {
                "students": {
                    "present": s_att.get("Present", 0),
                    "absent": s_att.get("Absent", 0),
                    "late": s_att.get("Late", 0),
                    "medical": s_att.get("Medical", 0),
                    "emergency": s_att.get("Emergency", 0)
                },
                "teachers": t_att
            },
            "fees": {
                "collected": float(total_collected),
                "pending": float(total_pending),
                "target": float(total_collected + total_pending)
            }
        }
    except Exception as e:
        return {"error": str(e)}

@router.get("/notices")
async def get_notices(db: Session = Depends(get_db)):
    return db.query(Notice).order_by(Notice.created_at.desc()).limit(5).all()
