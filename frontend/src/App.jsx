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
import ParentDashboard from "./pages/ParentDashboard";
import Login from "./pages/Login";
import { 
  LayoutDashboard, GraduationCap, UserSquare2, Bell, Search, 
  UserCheck, BookOpen, CreditCard, LogOut, Calendar, 
  FileText, ChevronDown, Menu, X, Settings, HelpCircle, User,
  ChevronLeft, ChevronRight, PanelLeftClose, PanelLeft,
  Home, IndianRupee, ClipboardList
} from "lucide-react";
import "./index.css";

/* ── Common Components ── */

const SidebarLink = ({ to, icon: Icon, label, active, collapsed, onClick, isMobile }) => (
  <Link
    to={to}
    onClick={onClick}
    title={collapsed && !isMobile ? label : ""}
    className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-[13px] transition-all duration-300 ${
      active
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 translate-x-1"
        : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
    } ${(collapsed && !isMobile) ? 'justify-center px-0' : ''}`}
  >
    <Icon size={18} strokeWidth={active ? 2.5 : 2} className="shrink-0" />
    {(!collapsed || isMobile) && <span className="tracking-wide truncate">{label}</span>}
  </Link>
);

const TopHeader = ({ user, onLogout, onMenuClick, sidebarCollapsed, toggleSidebar }) => {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t); }, []);
  const dateStr = now.toLocaleDateString("en-US", { day: "2-digit", month: "long" });

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-slate-50 rounded-xl text-slate-500 transition-colors">
          <Menu size={20} />
        </button>
        <button 
          onClick={toggleSidebar} 
          className="hidden lg:flex p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors"
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {sidebarCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
        </button>
        <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2 w-48 xl:w-80 group focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          <Search size={16} className="text-slate-400 group-focus-within:text-indigo-500" />
          <input type="text" placeholder="Search anything..." className="bg-transparent border-none text-[12px] font-medium focus:outline-none w-full text-slate-600" />
          <kbd className="hidden xl:block text-[10px] font-bold text-slate-300 px-1.5 py-0.5 border border-slate-200 rounded-md bg-white">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
          <Calendar size={12} />
          <span>{dateStr}</span>
        </div>
        
        <button className="relative p-2 sm:p-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 transition-all group">
          <Bell size={18} className="text-slate-400 group-hover:text-indigo-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-100 mx-1 hidden sm:block"></div>

        <div className="flex items-center gap-2 sm:gap-3 pl-1">
          <div className="text-right hidden sm:block">
            <p className="text-[11px] xl:text-[12px] font-black text-slate-800 leading-none truncate max-w-[100px]">{user?.name}</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{user?.role}</p>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.role}`} alt="User" />
          </div>
        </div>
      </div>
    </header>
  );
};

/* ── Sidebar Component ── */
const Sidebar = ({ user, onLogout, isOpen, onClose, collapsed }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const adminLinks = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/students", icon: GraduationCap, label: "Students" },
    { to: "/teachers", icon: UserSquare2, label: "Teachers" },
    { to: "/attendance", icon: UserCheck, label: "Attendance" },
    { to: "/subjects", icon: BookOpen, label: "Subjects" },
    { to: "/fees", icon: CreditCard, label: "Fees" },
    { to: "/calendar", icon: Calendar, label: "Calendar" },
    { to: "/exam-timetable", icon: FileText, label: "Exams" },
  ];

  const teacherLinks = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/my-attendance", icon: UserCheck, label: "Attendance" },
    { to: "/my-classes", icon: BookOpen, label: "My Classes" },
    { to: "/my-schedule", icon: Calendar, label: "Schedule" },
    { to: "/my-reports", icon: FileText, label: "Reports" },
  ];

  const parentLinks = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/attendance", icon: UserCheck, label: "Attendance" },
    { to: "/assignments", icon: ClipboardList, label: "Assignments" },
    { to: "/fees", icon: IndianRupee, label: "Fee Payments" },
    { to: "/reports", icon: FileText, label: "Reports" },
    { to: "/calendar", icon: Calendar, label: "Calendar" },
  ];

  const links = user?.role === "admin" ? adminLinks
    : user?.role === "parent" ? parentLinks
    : teacherLinks;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Sidebar Content */}
      <aside className={`fixed top-0 left-0 bottom-0 bg-white border-r border-slate-100 z-50 transition-all duration-500 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${collapsed ? 'lg:w-24' : 'lg:w-72'} w-72`}>
        <div className="flex flex-col h-full p-4 xl:p-6">
          {/* Logo & Close Button */}
          <div className={`flex items-center mb-10 px-2 ${collapsed ? 'lg:justify-center justify-between' : 'justify-between'}`}>
            <Link to="/" className="flex items-center gap-3 group" onClick={onClose}>
              <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 transition-transform group-hover:scale-105 shrink-0">
                <GraduationCap size={22} className="text-white" strokeWidth={2.5} />
              </div>
              {(!collapsed || isOpen) && (
                <div className="transition-all duration-300">
                  <span className="font-black text-xl tracking-tighter text-slate-800 leading-none block">SMS<span className="text-indigo-600 text-2xl leading-none">.</span></span>
                  <span className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] leading-none mt-1 block">Management</span>
                </div>
              )}
            </Link>
            
            <button onClick={onClose} className="lg:hidden p-2.5 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 space-y-1.5 overflow-y-auto scrollbar-none px-1">
            {(!collapsed || isOpen) && <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4 ml-4">Main Menu</p>}
            {links.map((link) => (
              <SidebarLink 
                key={link.to} 
                {...link} 
                active={isActive(link.to)} 
                collapsed={collapsed}
                isMobile={isOpen}
                onClick={onClose}
              />
            ))}

            <div className="pt-8 space-y-1.5">
              {(!collapsed || isOpen) && <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4 ml-4">Account</p>}
              <SidebarLink to="#" icon={User} label="Profile" active={false} collapsed={collapsed} isMobile={isOpen} onClick={onClose} />
              <SidebarLink to="#" icon={Settings} label="Settings" active={false} collapsed={collapsed} isMobile={isOpen} onClick={onClose} />
              <SidebarLink to="#" icon={HelpCircle} label="Help Center" active={false} collapsed={collapsed} isMobile={isOpen} onClick={onClose} />
            </div>
          </div>

          {/* User Footer */}
          <div className="mt-auto pt-6 border-t border-slate-50 pb-4 lg:pb-0">
            <div className={`bg-slate-50 rounded-[24px] p-4 flex flex-col gap-4 ${(collapsed && !isOpen) ? 'items-center px-2' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100 shrink-0">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.role}`} alt="User" />
                </div>
                {(!collapsed || isOpen) && (
                  <div className="min-w-0">
                    <p className="text-[12px] font-black text-slate-800 truncate leading-none">{user?.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Online Now</p>
                  </div>
                )}
              </div>
              <button 
                onClick={onLogout}
                title={(collapsed && !isOpen) ? "Logout" : ""}
                className={`flex items-center justify-center gap-2 py-3 bg-white text-rose-500 rounded-xl text-[11px] font-black border border-slate-100 hover:bg-rose-50 hover:border-rose-100 hover:text-rose-600 transition-all shadow-sm active:scale-95 ${(collapsed && !isOpen) ? 'w-10 h-10 p-0 rounded-2xl' : 'w-full'}`}
              >
                <LogOut size={16} />
                {(!collapsed || isOpen) && <span>LOGOUT SYSTEM</span>}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const roleNames = { admin: "Mr. Herald", teacher: "Ms. Teena", student: "Student", parent: "Vikas Prajapat" };

function App() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = (role) => setUser({ role, name: roleNames[role] || "User" });
  const handleLogout = () => {
    setUser(null);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <Router>
      <div className="min-h-screen bg-[#F8FAFC] flex overflow-x-hidden">
        {/* Sidebar */}
        <Sidebar 
          user={user} 
          onLogout={handleLogout} 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          collapsed={sidebarCollapsed}
        />

        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col min-w-0 transition-all duration-500 ${sidebarCollapsed ? 'lg:ml-24' : 'lg:ml-72'}`}>
          {/* Header */}
          <TopHeader 
            user={user} 
            onLogout={handleLogout} 
            onMenuClick={() => setSidebarOpen(true)} 
            sidebarCollapsed={sidebarCollapsed}
            toggleSidebar={toggleSidebar}
          />

          {/* Page Content */}
          <main className="flex-1 overflow-x-hidden p-0 sm:p-0">
            <Routes>
              {user.role === "admin" ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/students/add" element={<AddStudent />} />
                  <Route path="/teachers" element={<Teachers />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/subjects" element={<Subjects />} />
                  <Route path="/fees" element={<Fees />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/exam-timetable" element={<ExamTimetable />} />
                </>
              ) : user.role === "parent" ? (
                <>
                  <Route path="/" element={<ParentDashboard />} />
                  <Route path="/attendance" element={<ParentDashboard />} />
                  <Route path="/assignments" element={<ParentDashboard />} />
                  <Route path="/fees" element={<ParentDashboard />} />
                  <Route path="/reports" element={<ParentDashboard />} />
                  <Route path="/calendar" element={<ParentDashboard />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<TeacherDashboard />} />
                </>
              )}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
