# 🎓 SMS - Modern Student Management System

A high-fidelity, full-stack Administrative Dashboard for modern educational institutions. Built with a focus on **premium aesthetics**, **real-time analytics**, and **scalable architecture**.

![Dashboard Preview](https://via.placeholder.com/1200x600/6366f1/ffffff?text=SMS+Admin+Dashboard+Preview)

## 🚀 Key Features

*   **📊 Dynamic Command Center**: Real-time tracking of Students (500+), Teachers, and Staff with live attendance and fee collection widgets.
*   **🎓 Student Management**: Dedicated high-fidelity registration flow, automated roll number assignment, and detailed student profiles.
*   **👨‍🏫 Teacher Faculty**: Management of teacher profiles, subjects, and specialized departments.
*   **✅ Attendance System**: Daily presence tracking with status toggles (Present, Absent, Late, Medical) and professional Excel/CSV export capabilities.
*   **📖 Academic Curriculum**: Full subject management module with department categorization.
*   **💰 Financial Tracking**: Real-time fee collection visualization with progress monitoring.

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: SQLite / SQLAlchemy (ORM)
- **Data Generation**: Faker (for large-scale stress testing)

### Frontend
- **Framework**: React.js
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Visualization**: Custom SVG Charts & Progress Components

## ⚙️ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/vikasprajapat2/SMS.git
cd SMS
```

### 2. Setup Backend
```bash
cd backend
python -m venv venv
# Activate venv: .\venv\Scripts\activate (Windows) or source venv/bin/activate (Mac/Linux)
pip install -r requirements.txt
python -m app.database.bulk_seed  # Optional: Seed 500+ records
python -m uvicorn app.main:app --reload
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

## 📸 Screenshots

*   **Dashboard**: A premium hub for all school activities.
*   **Attendance**: Real-time presence logs with status highlights.
*   **Admissions**: Multi-section, high-fidelity registration forms.

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ for Modern Education.
