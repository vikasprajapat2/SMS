import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import AddStudent from "./pages/AddStudent";
import Attendance from "./pages/Attendance";
import Subjects from "./pages/Subjects";
import Fees from "./pages/Fees";
import CalendarPage from "./pages/Calendar";
import ExamTimetable from "./pages/ExamTimetable";
import TeacherDashboard from "./pages/TeacherDashboard";
import Login from "./pages/Login";
import { LayoutDashboard, GraduationCap, UserSquare2, Bell, Search, UserCheck, BookOpen, CreditCard, LogOut, Calendar, FileText, ChevronDown, Menu } from "lucide-react";
import "./index.css";

const NavLink = ({ to, icon: Icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all ${
      active
        ? "bg-white text-indigo-600 shadow-sm shadow-indigo-100 ring-1 ring-slate-100"
        : "text-slate-400 hover:text-slate-600 hover:bg-white"
    }`}
  >
    <Icon size={16} strokeWidth={active ? 2.5 : 2} />
    <span className="hidden xl:inline">{label}</span>
  </Link>
);

/* ── Admin Navbar ── */
const AdminNavbar = ({ user, onLogout }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t); }, []);
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <nav className="sticky top-0 z-40 w-full overflow-hidden" style={{background:"linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#1e1b4b 100%)", boxShadow:"0 4px 24px rgba(79,70,229,0.25)"}}>
      {/* Top micro-bar */}
      <div className="border-b border-white/10 px-4 xl:px-8 py-1.5 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 text-white/40 text-[9px] xl:text-[10px] font-medium truncate">
          <span className="truncate">Academic Year : 2024 / 2025</span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="text-white/40 hidden sm:inline">🇮🇳 India</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/50 text-[9px] xl:text-[10px] font-medium whitespace-nowrap">
          <Calendar size={10} className="text-white/40" />
          <span>{dateStr} &nbsp;•&nbsp; {timeStr}</span>
        </div>
      </div>
      {/* Main bar */}
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-4 xl:px-8 py-2.5">
        {/* Logo + Nav */}
        <div className="flex items-center gap-4 xl:gap-8 min-w-0">
          <Link to="/" className="flex items-center gap-2 xl:gap-3 group shrink-0">
            <div className="w-8 h-8 xl:w-9 xl:h-9 bg-white/15 backdrop-blur rounded-xl flex items-center justify-center border border-white/20 group-hover:bg-white/25 transition-all shadow-lg">
              <GraduationCap size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-base xl:text-lg tracking-tighter text-white leading-none block">SMS<span className="text-indigo-300 text-xl xl:text-2xl leading-none">.</span></span>
              <span className="text-white/30 text-[7px] xl:text-[8px] font-bold uppercase tracking-widest leading-none hidden lg:block">Admin Portal</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-0.5 xl:gap-1">
            {[
              { to: "/", icon: LayoutDashboard, label: "Dashboard" },
              { to: "/students", icon: GraduationCap, label: "Students" },
              { to: "/teachers", icon: UserSquare2, label: "Teachers" },
              { to: "/attendance", icon: UserCheck, label: "Attendance" },
              { to: "/subjects", icon: BookOpen, label: "Subjects" },
              { to: "/fees", icon: CreditCard, label: "Fees" },
              { to: "/calendar", icon: Calendar, label: "Calendar" },
              { to: "/exam-timetable", icon: FileText, label: "Exams" },
            ].map(({ to, icon: Icon, label }) => (
              <Link key={to} to={to} title={label}
                className={`flex items-center gap-2 px-2.5 xl:px-3.5 py-2 rounded-xl text-[10px] xl:text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive(to)
                    ? "bg-white text-indigo-700 shadow-lg shadow-indigo-900/30"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={14} strokeWidth={isActive(to) ? 2.5 : 2} />
                <span className="hidden xl:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 xl:gap-4 shrink-0">
          {/* Search */}
          <div className="relative hidden 2xl:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-white/10 border border-white/15 rounded-xl py-2 pl-9 pr-10 text-[11px] font-medium text-white placeholder-white/30 w-32 xl:w-44 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-white/10 text-white/30 text-[8px] font-bold px-1.5 py-0.5 rounded-md border border-white/10">⌘K</kbd>
          </div>

          {/* Bell */}
          <button className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all group shrink-0">
            <Bell size={15} className="text-white/70 group-hover:text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-indigo-900 flex items-center justify-center">
              <span className="text-white text-[7px] font-black">3</span>
            </span>
          </button>

          {/* Divider */}
          <div className="w-px h-8 bg-white/10 hidden sm:block"></div>

          {/* User */}
          <div className="flex items-center gap-2 xl:gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-2 xl:px-3 py-1.5 cursor-pointer transition-all group shrink-0">
            <div className="relative shrink-0">
              <div className="w-7 h-7 xl:w-8 xl:h-8 rounded-xl overflow-hidden border border-white/20 shadow-inner">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="Admin" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#1e1b4b] shadow-sm"></span>
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-[11px] font-black text-white leading-tight">{user?.name}</p>
              <p className="text-[9px] font-bold text-indigo-300/80 leading-tight uppercase tracking-wider">Administrator</p>
            </div>
            <ChevronDown size={12} className="text-white/30 group-hover:text-white/60 transition-all hidden xl:block" />
          </div>

          {/* Logout */}
          <button onClick={onLogout} title="Logout"
            className="flex items-center justify-center gap-2 px-3 xl:px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-[10px] font-black transition-all shadow-lg shadow-red-500/20 active:scale-95 shrink-0"
          >
            <LogOut size={14} strokeWidth={2.5} />
            <span className="hidden xl:inline uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

/* ── Teacher Navbar ── */
const TeacherNavbar = ({ user, onLogout }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t); }, []);
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <nav className="sticky top-0 z-40 w-full overflow-hidden" style={{background:"linear-gradient(135deg,#0c1445 0%,#1a3a6b 50%,#0c1445 100%)", boxShadow:"0 4px 24px rgba(37,99,235,0.3)"}}>
      <div className="border-b border-white/10 px-4 xl:px-8 py-1.5 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 text-white/40 text-[9px] xl:text-[10px] font-medium truncate">
          <span className="truncate">Academic Year : 2024 / 2025</span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="hidden sm:inline">Physics &amp; Science Department</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/50 text-[9px] xl:text-[10px] font-medium whitespace-nowrap">
          <Calendar size={10} className="text-white/40" />
          <span>{dateStr} &nbsp;•&nbsp; {timeStr}</span>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-4 xl:px-8 py-2.5">
        <div className="flex items-center gap-4 xl:gap-8 min-w-0">
          <Link to="/" className="flex items-center gap-2 xl:gap-3 group shrink-0">
            <div className="w-8 h-8 xl:w-9 xl:h-9 bg-white/15 backdrop-blur rounded-xl flex items-center justify-center border border-white/20 group-hover:bg-white/25 transition-all shadow-lg">
              <GraduationCap size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-base xl:text-lg tracking-tighter text-white leading-none block">SMS<span className="text-blue-300 text-xl xl:text-2xl leading-none">.</span></span>
              <span className="text-white/30 text-[7px] xl:text-[8px] font-bold uppercase tracking-widest leading-none hidden lg:block">Teacher Portal</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-0.5 xl:gap-1">
            {[
              { to: "/", icon: LayoutDashboard, label: "Dashboard" },
              { to: "/my-attendance", icon: UserCheck, label: "Attendance" },
              { to: "/my-classes", icon: BookOpen, label: "My Classes" },
              { to: "/my-schedule", icon: Calendar, label: "Schedule" },
              { to: "/my-reports", icon: FileText, label: "Reports" },
            ].map(({ to, icon: Icon, label }) => (
              <Link key={to} to={to} title={label}
                className={`flex items-center gap-2 px-2.5 xl:px-3.5 py-2 rounded-xl text-[10px] xl:text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive(to)
                    ? "bg-white text-blue-700 shadow-lg shadow-blue-900/30"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={14} strokeWidth={isActive(to) ? 2.5 : 2} />
                <span className="hidden xl:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 xl:gap-4 shrink-0">
          <button className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all group shrink-0">
            <Bell size={15} className="text-white/70 group-hover:text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-blue-950 flex items-center justify-center">
              <span className="text-white text-[7px] font-black">5</span>
            </span>
          </button>
          <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
          {/* User */}
          <div className="flex items-center gap-2 xl:gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-2 xl:px-3 py-1.5 cursor-pointer transition-all group shrink-0">
            <div className="relative shrink-0">
              <div className="w-7 h-7 xl:w-8 xl:h-8 rounded-xl overflow-hidden border border-white/20 shadow-inner">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" alt="Teacher" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0c1445] shadow-sm"></span>
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-[11px] font-black text-white leading-tight">{user?.name}</p>
              <p className="text-[9px] font-bold text-blue-300/80 leading-tight uppercase tracking-wider">Teacher</p>
            </div>
            <ChevronDown size={12} className="text-white/30 group-hover:text-white/60 transition-all hidden xl:block" />
          </div>

          {/* Logout */}
          <button onClick={onLogout} title="Logout"
            className="flex items-center justify-center gap-2 px-3 xl:px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-[10px] font-black transition-all shadow-lg shadow-red-500/20 active:scale-95 shrink-0"
          >
            <LogOut size={14} strokeWidth={2.5} />
            <span className="hidden xl:inline uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const roleNames = { admin: "Mr. Herald", teacher: "Ms. Teena", student: "Student" };

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (role) => setUser({ role, name: roleNames[role] || "User" });
  const handleLogout = () => setUser(null);

  if (!user) return <Login onLogin={handleLogin} />;

  /* ── Teacher Portal ── */
  if (user.role === "teacher") {
    return (
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
          <TeacherNavbar user={user} onLogout={handleLogout} />
          <main>
            <Routes>
              <Route path="/" element={<TeacherDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }

  /* ── Admin Portal ── */
  return (
    <Router>
      <div className="min-h-screen bg-[#F8FAFC]">
        <AdminNavbar user={user} onLogout={handleLogout} />
        <main className="transition-all duration-500">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/add" element={<AddStudent />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/exam-timetable" element={<ExamTimetable />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
