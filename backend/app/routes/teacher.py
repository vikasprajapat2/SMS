from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database.connection import get_db
from ..models.sms_models import Teacher

router = APIRouter(prefix="/teachers", tags=["teachers"])

@router.get("/")
async def get_teachers(db: Session = Depends(get_db)):
    try:
        return db.query(Teacher).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def create_teacher(teacher_data: dict, db: Session = Depends(get_db)):
    try:
        teacher = Teacher(**teacher_data)
        db.add(teacher)
        db.commit()
        db.refresh(teacher)
        return teacher
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
