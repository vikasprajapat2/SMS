from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database.connection import get_db
from ..models import Fee, Student
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

router = APIRouter(prefix="/fees", tags=["fees"])

class FeeCreate(BaseModel):
    student_id: int
    amount: float
    term: str
    status: str # Paid, Pending
    paid_date: Optional[datetime] = None

@router.get("/")
async def get_fees(db: Session = Depends(get_db)):
    fees = db.query(Fee).all()
    result = []
    for f in fees:
        student = db.query(Student).filter(Student.id == f.student_id).first()
        result.append({
            "id": f.id,
            "student_name": student.full_name if student else "Unknown",
            "grade": student.grade if student else "N/A",
            "section": student.section if student else "N/A",
            "amount": f.amount,
            "term": f.term,
            "status": f.status,
            "paid_date": f.paid_date
        })
    return result

@router.post("/")
async def create_fee(fee: FeeCreate, db: Session = Depends(get_db)):
    new_fee = Fee(**fee.model_dump())
    if new_fee.status == "Paid" and not new_fee.paid_date:
        new_fee.paid_date = datetime.utcnow()
    db.add(new_fee)
    db.commit()
    db.refresh(new_fee)
    return new_fee
