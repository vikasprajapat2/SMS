from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database.connection import get_db
from ..models.sms_models import ExamTimetable

router = APIRouter(prefix="/exam-timetable", tags=["exam-timetable"])


@router.get("/")
async def get_exams(class_name: str, term: str, db: Session = Depends(get_db)):
    """Get all exams for a specific class and term."""
    return db.query(ExamTimetable).filter(
        ExamTimetable.class_name == class_name,
        ExamTimetable.term == term
    ).order_by(ExamTimetable.date).all()


@router.post("/")
async def create_exam(data: dict, db: Session = Depends(get_db)):
    """Create a new exam entry."""
    exam = ExamTimetable(
        class_name=data["class_name"],
        term=data["term"],
        subject=data["subject"],
        date=data["date"],
        start_time=data["start_time"],
        end_time=data["end_time"],
        marks=int(data["marks"]),
        room=data["room"],
    )
    db.add(exam)
    db.commit()
    db.refresh(exam)
    return exam


@router.put("/{exam_id}")
async def update_exam(exam_id: int, data: dict, db: Session = Depends(get_db)):
    """Update an existing exam."""
    exam = db.query(ExamTimetable).filter(ExamTimetable.id == exam_id).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    for key, value in data.items():
        if hasattr(exam, key):
            setattr(exam, key, value)
    db.commit()
    db.refresh(exam)
    return exam


@router.delete("/{exam_id}")
async def delete_exam(exam_id: int, db: Session = Depends(get_db)):
    """Delete an exam entry."""
    exam = db.query(ExamTimetable).filter(ExamTimetable.id == exam_id).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    db.delete(exam)
    db.commit()
    return {"message": "Exam deleted successfully"}
