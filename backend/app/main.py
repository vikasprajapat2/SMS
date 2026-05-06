from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, student, teacher, dashboard, attendance, subjects
from .database.connection import engine, Base
from . import models # Ensure models are loaded for table creation

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Student Management System API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(auth.router)
app.include_router(student.router)
app.include_router(teacher.router)
app.include_router(dashboard.router)
app.include_router(attendance.router)
app.include_router(subjects.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the SMS API"}
