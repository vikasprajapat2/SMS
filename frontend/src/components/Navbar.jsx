import React from 'react';
import { Search, Bell, Settings, Maximize2, ChevronDown, GraduationCap, CalendarDays, Flag } from 'lucide-react';

const Navbar = () => {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <nav className="h-12 border-b border-slate-100 bg-white flex items-center justify-between px-5 sticky top-0 z-10 flex-shrink-0">
      {/* Left: Search + Date */}
      <div className="flex items-center gap-5 flex-1">
        <div className="relative w-52">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-300"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 text-[10px] font-bold">⌘</span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
          <CalendarDays size={12} className="text-indigo-500" />
          <span className="text-slate-400">Date & time</span>
          <span className="text-slate-700 font-semibold ml-0.5">25 May 2024 - 10:15:36 AM</span>
        </div>
      </div>

      {/* Right: Academic Year + Icons + Avatar */}
      <div className="flex items-center gap-4">
        {/* Academic Year Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 rounded-lg text-[10px] font-semibold text-slate-600 border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
          <GraduationCap size={12} className="text-indigo-500" />
          <span>Academic Year : 2024 / 2025</span>
          <ChevronDown size={10} />
        </div>

        {/* Flag */}
        <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-b from-red-500 via-white to-blue-500"></div>
        </div>

        {/* Icon row */}
        <div className="flex items-center gap-2.5 text-slate-400">
          <button className="hover:text-indigo-600 transition-colors relative">
            <Bell size={15} />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button className="hover:text-indigo-600 transition-colors">
            <Search size={15} />
          </button>
          <button className="hover:text-indigo-600 transition-colors">
            <Settings size={15} />
          </button>
          <button className="hover:text-indigo-600 transition-colors">
            <Maximize2 size={15} />
          </button>
        </div>

        {/* Avatar */}
        <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-indigo-100 flex-shrink-0">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
