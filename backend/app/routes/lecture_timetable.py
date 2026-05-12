from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database.connection import get_db
from ..models.sms_models import LectureTimetable

router = APIRouter(prefix="/lecture-timetable", tags=["lecture-timetable"])


@router.get("/")
async def get_lectures(class_name: str, db: Session = Depends(get_db)):
    """Get full weekly schedule for a class — returns list of period records."""
    rows = db.query(LectureTimetable).filter(
        LectureTimetable.class_name == class_name
    ).all()
    return rows


@router.post("/")
async def upsert_period(data: dict, db: Session = Depends(get_db)):
    """Create or update a single period (upsert by class_name + day + period)."""
    existing = db.query(LectureTimetable).filter(
        LectureTimetable.class_name == data["class_name"],
        LectureTimetable.day == data["day"],
        LectureTimetable.period == int(data["period"]),
    ).first()

    if existing:
        existing.subject = data["subject"]
        existing.teacher = data.get("teacher", "")
        existing.room    = data.get("room", "")
        db.commit()
        db.refresh(existing)
        return existing
    else:
        row = LectureTimetable(
            class_name=data["class_name"],
            day=data["day"],
            period=int(data["period"]),
            subject=data["subject"],
            teacher=data.get("teacher", ""),
            room=data.get("room", ""),
        )
        db.add(row)
        db.commit()
        db.refresh(row)
        return row


@router.delete("/")
async def delete_period(class_name: str, day: str, period: int, db: Session = Depends(get_db)):
    """Clear (delete) a single period slot."""
    row = db.query(LectureTimetable).filter(
        LectureTimetable.class_name == class_name,
        LectureTimetable.day == day,
        LectureTimetable.period == period,
    ).first()
    if not row:
        raise HTTPException(status_code=404, detail="Period not found")
    db.delete(row)
    db.commit()
    return {"message": "Period cleared"}
