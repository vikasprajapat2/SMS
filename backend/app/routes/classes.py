from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database.connection import get_db
from ..models.sms_models import ClassConfig

router = APIRouter(prefix="/classes", tags=["classes"])

# Default seed classes (used when DB is empty)
DEFAULT_CLASSES = [
    ("Nursery - A", "Pre-Primary", 1), ("Nursery - B", "Pre-Primary", 2),
    ("LKG - A",     "Pre-Primary", 3), ("LKG - B",     "Pre-Primary", 4),
    ("UKG - A",     "Pre-Primary", 5), ("UKG - B",     "Pre-Primary", 6),
    ("1st - A",  "Primary (1-5)", 10), ("1st - B",  "Primary (1-5)", 11),
    ("2nd - A",  "Primary (1-5)", 12), ("2nd - B",  "Primary (1-5)", 13),
    ("3rd - A",  "Primary (1-5)", 14), ("3rd - B",  "Primary (1-5)", 15),
    ("4th - A",  "Primary (1-5)", 16), ("4th - B",  "Primary (1-5)", 17),
    ("5th - A",  "Primary (1-5)", 18), ("5th - B",  "Primary (1-5)", 19),
    ("6th - A",  "Middle (6-8)",  20), ("6th - B",  "Middle (6-8)",  21),
    ("7th - A",  "Middle (6-8)",  22), ("7th - B",  "Middle (6-8)",  23),
    ("8th - A",  "Middle (6-8)",  24), ("8th - B",  "Middle (6-8)",  25),
    ("9th - A",  "Secondary (9-10)",  30), ("9th - B",  "Secondary (9-10)",  31),
    ("10th - A", "Secondary (9-10)",  32), ("10th - B", "Secondary (9-10)",  33),
    ("11th - Sci",  "Sr. Secondary (11-12)", 40), ("11th - Com",  "Sr. Secondary (11-12)", 41),
    ("11th - Arts", "Sr. Secondary (11-12)", 42),
    ("12th - Sci",  "Sr. Secondary (11-12)", 43), ("12th - Com",  "Sr. Secondary (11-12)", 44),
    ("12th - Arts", "Sr. Secondary (11-12)", 45),
]


def _seed_if_empty(db: Session):
    """Auto-seed default classes on first run."""
    if db.query(ClassConfig).count() == 0:
        for name, group, order in DEFAULT_CLASSES:
            db.add(ClassConfig(name=name, group_label=group, sort_order=order))
        db.commit()


@router.get("/")
async def get_classes(db: Session = Depends(get_db)):
    """Return all classes ordered by sort_order."""
    _seed_if_empty(db)
    rows = db.query(ClassConfig).order_by(ClassConfig.sort_order, ClassConfig.name).all()
    # Group by label for frontend convenience
    groups: dict = {}
    for row in rows:
        groups.setdefault(row.group_label, []).append({"id": row.id, "name": row.name, "group_label": row.group_label, "sort_order": row.sort_order})
    return {"groups": [{"label": k, "options": v} for k, v in groups.items()], "flat": [r.name for r in rows]}


@router.post("/")
async def create_class(data: dict, db: Session = Depends(get_db)):
    """Add a new custom class."""
    name = data.get("name", "").strip()
    if not name:
        raise HTTPException(status_code=400, detail="Class name is required")
    existing = db.query(ClassConfig).filter(ClassConfig.name == name).first()
    if existing:
        raise HTTPException(status_code=409, detail="Class already exists")
    row = ClassConfig(
        name=name,
        group_label=data.get("group_label", "Custom"),
        sort_order=int(data.get("sort_order", 999)),
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


@router.put("/{class_id}")
async def update_class(class_id: int, data: dict, db: Session = Depends(get_db)):
    """Rename a class or change its group."""
    row = db.query(ClassConfig).filter(ClassConfig.id == class_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Class not found")
    if "name" in data:
        row.name = data["name"].strip()
    if "group_label" in data:
        row.group_label = data["group_label"]
    if "sort_order" in data:
        row.sort_order = int(data["sort_order"])
    db.commit()
    db.refresh(row)
    return row


@router.delete("/{class_id}")
async def delete_class(class_id: int, db: Session = Depends(get_db)):
    """Delete a class entry."""
    row = db.query(ClassConfig).filter(ClassConfig.id == class_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Class not found")
    db.delete(row)
    db.commit()
    return {"message": f"Class '{row.name}' deleted"}
