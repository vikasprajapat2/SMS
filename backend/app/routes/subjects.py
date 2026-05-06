from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database.connection import get_db
from ..models.sms_models import Subject

router = APIRouter(prefix="/subjects", tags=["subjects"])

@router.get("/")
async def get_subjects(db: Session = Depends(get_db)):
    return db.query(Subject).all()

@router.post("/")
async def create_subject(data: dict, db: Session = Depends(get_db)):
    try:
        subject = Subject(
            title=data['title'],
            code=data['code'],
            department=data['department']
        )
        db.add(subject)
        db.commit()
        db.refresh(subject)
        return subject
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
