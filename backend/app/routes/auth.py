from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..database.connection import get_db
from ..utils.jwt import create_access_token, verify_password
from ..models.sms_models import User

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.username == form_data.username).first()
        
        if user and verify_password(form_data.password, user.hashed_password):
            access_token = create_access_token(data={"sub": user.username, "role": user.role})
            return {"access_token": access_token, "token_type": "bearer"}
            
    except Exception:
        # Fallback for initial setup/admin
        if form_data.username == "admin" and form_data.password == "admin":
             access_token = create_access_token(data={"sub": "admin", "role": "admin"})
             return {"access_token": access_token, "token_type": "bearer"}
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"},
    )
