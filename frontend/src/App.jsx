import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import AddStudent from './pages/AddStudent';
import Attendance from './pages/Attendance';
import Subjects from './pages/Subjects';
import Fees from './pages/Fees';
import { LayoutDashboard, GraduationCap, UserSquare2, Bell, Search, UserCheck, BookOpen, CreditCard } from 'lucide-react';
import './index.css';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-40 px-8 py-4">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-all">
              <GraduationCap size={22} strokeWidth={2.5} />
            </div>
            <span className="font-black text-xl tracking-tighter text-slate-800">SMS<span className="text-indigo-600 text-3xl leading-none">.</span></span>
          </div>

          <div className="hidden lg:flex items-center gap-2 bg-slate-50/50 p-1 rounded-2xl border border-slate-100">
            <NavLink to="/" icon={LayoutDashboard} label="Dashboard" active={isActive('/')} />
            <NavLink to="/students" icon={GraduationCap} label="Students" active={isActive('/students')} />
            <NavLink to="/teachers" icon={UserSquare2} label="Teachers" active={isActive('/teachers')} />
            <NavLink to="/attendance" icon={UserCheck} label="Attendance" active={isActive('/attendance')} />
            <NavLink to="/subjects" icon={BookOpen} label="Subjects" active={isActive('/subjects')} />
            <NavLink to="/fees" icon={CreditCard} label="Fees" active={isActive('/fees')} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
            <input type="text" placeholder="Quick Search..." className="bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-[11px] font-bold w-64 focus:ring-2 focus:ring-indigo-500 transition-all uppercase tracking-wider" />
          </div>
          <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="w-px h-6 bg-slate-100 mx-1"></div>
          <button className="flex items-center gap-3 p-1 pr-3 hover:bg-slate-50 rounded-2xl transition-all group">
            <div className="w-9 h-9 rounded-xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden group-hover:border-indigo-200 transition-all">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Admin" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-[10px] font-black text-slate-800 leading-tight uppercase tracking-tighter">Mr. Herald</p>
              <p className="text-[9px] font-bold text-slate-400 leading-tight uppercase tracking-widest">Administrator</p>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon: Icon, label, active }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-[0.1em] transition-all ${
      active 
        ? 'bg-white text-indigo-600 shadow-sm shadow-indigo-100 ring-1 ring-slate-100' 
        : 'text-slate-400 hover:text-slate-600 hover:bg-white'
    }`}
  >
    <Icon size={16} strokeWidth={active ? 2.5 : 2} />
    {label}
  </Link>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />
        <main className="transition-all duration-500">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/add" element={<AddStudent />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/fees" element={<Fees />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
