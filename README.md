# 🎓 SMS — Modern School Management System

A premium, high-fidelity School Management System built with React + FastAPI. Designed with enterprise-grade aesthetics, real-time scheduling, and fully interactive administrative workflows.

---

## ✨ Features

### 🏢 Admin Dashboard
- Real-time stats: students, teachers, staff, finances
- Interactive mini-calendar with event highlighting
- Quick Actions panel and activity feed
- Responsive collapsible left sidebar navigation

### 👩‍🎓 Student Management
- Card + table hybrid view with avatar support
- **Click any student** → opens a rich Profile Modal with:
  - Personal details, class & section
  - Attendance %, GPA, Fees status
  - Parent / guardian information
  - Academic records and downloadable documents

### 👨‍🏫 Teacher Management
- Faculty card grid with subject-colored badges
- **Click any teacher** → opens a detailed Profile Modal with:
  - Subject expertise & department assignment
  - Weekly class schedule (Mon–Thu)
  - Performance metrics (Pass Rate, Attendance, Parent Satisfaction)
  - Academic qualifications (M.Sc., B.Ed.)
  - Send Message & Edit Profile actions

### 📅 Academic Calendar
- Month / Week / Day views with fluid transitions
- Event creation modal with category tagging
- Upcoming Events sidebar panel

### 📝 Exam Timetable
- Full scheduling interface per academic term
- Create New Schedule modal with auto-stats
- Total exams, marks and period calculations

### 💰 Fee Management
- Revenue analytics and outstanding arrears tracking
- Sortable payment history per student

### 🧭 Navigation (Sidebar)
- Persistent left sidebar with collapsible icon-only mode
- Responsive: auto-hides on mobile with burger menu toggle
- Smooth slide animations and active state indicators

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, Tailwind CSS, Lucide-React |
| Backend    | Python 3.13, FastAPI, Uvicorn        |
| Database   | PostgreSQL (via SQLAlchemy ORM)      |
| Avatars    | DiceBear API (auto-generated)        |
| Design     | Glassmorphism, Indigo-Slate tokens   |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Python 3.10+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vikasprajapat2/SMS.git
   cd SMS
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   python -m uvicorn app.main:app --reload
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Seed the Database** *(optional)*
   ```bash
   cd backend
   python -m app.database.seed
   ```

---

## 📸 Screenshots

| Module | Preview |
|--------|---------|
| **Admin Dashboard** | Full stats, mini calendar, quick actions |
| **Student Profile** | Avatar, GPA, fees, parent details |
| **Teacher Profile** | Schedule, performance bars, qualifications |
| **Academic Calendar** | Month/Week/Day event views |
| **Exam Timetable** | Schedule builder with auto-stats |

---

## 📁 Project Structure

```
SMS/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/        # student, teacher, fees, attendance
│   │   ├── models/        # SQLAlchemy ORM models
│   │   └── database/      # connection, seed scripts
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── pages/          # Dashboard, Students, Teachers, Fees, Calendar…
    │   ├── services/       # API service layer (axios)
    │   ├── App.jsx         # Router + Sidebar + Header layout
    │   └── index.css       # Design system tokens
    └── index.html
```

---

Built with ❤️ for Modern Education.
