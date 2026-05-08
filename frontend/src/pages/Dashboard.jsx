import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { 
  Plus, ChevronRight, Clock, MoreHorizontal, GraduationCap, 
  UserSquare2, Users, BookOpen, Calendar, CheckCircle2, 
  ArrowUpRight, Download, FileText, ChevronDown, AlertCircle, 
  IndianRupee, Layout, ClipboardList, CreditCard, BarChart3, Mail, X
} from 'lucide-react';

const AttendanceMetric = ({ label, value, trend, trendType, icon: Icon, color }) => (
  <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
        <Icon size={20} className={color.replace('bg-', 'text-').split(' ')[0]} />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <h3 className="text-xl font-black text-slate-800 mt-0.5">{value}</h3>
      </div>
    </div>
    <div className={`px-2 py-1 rounded-lg text-[9px] font-black ${trendType === 'up' ? 'bg-emerald-50 text-emerald-600' : trendType === 'down' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'}`}>
      {trendType === 'up' ? '↑' : trendType === 'down' ? '↓' : ''} {trend}
    </div>
  </div>
);

const StatCard = ({ title, value, active, inactive, icon: Icon, color, to }) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
    <div className="flex justify-between items-start mb-3">
      <div className={`p-2 rounded-xl bg-opacity-10 ${color}`}>
        <Icon size={22} className={color.replace('bg-', 'text-').split(' ')[0]} />
      </div>
      <MoreHorizontal size={16} className="text-slate-300 cursor-pointer" />
    </div>
    <h3 className="text-2xl font-black text-slate-800">{value}</h3>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{title}</p>
    <div className="flex items-center gap-3 text-[10px] font-bold">
      <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span><span className="text-slate-400">Active: <span className="text-slate-700">{active}</span></span></div>
      <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span><span className="text-slate-400">Inactive: <span className="text-slate-700">{inactive}</span></span></div>
      <Link to={to} className="ml-auto text-indigo-600 hover:underline">View all</Link>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: { total: 520, active: 500, inactive: 20 },
    teachers: { total: 25, active: 24, inactive: 1 },
    staff: { total: 12, active: 10, inactive: 2 },
    subjects: { total: 18, active: 18, inactive: 0 },
    attendance: { 
      students: { present: 480, absent: 25, late: 10, medical: 5, emergency: 0 },
      teachers: { present: 23, absent: 1, late: 1, medical: 0 }
    },
    fees: { collected: 450000, pending: 150000, target: 600000 }
  });
  const [activeTab, setActiveTab] = useState('students');
  const [notices, setNotices] = useState([
    { title: "Annual Science Fair Registration", created_at: "2026-05-05" },
    { title: "Half-Yearly Exam Schedule Out", created_at: "2026-05-01" },
    { title: "Summer Vacation Notification", created_at: "2026-04-28" }
  ]);
  const [loading, setLoading] = useState(false); // Set false for demo fix

  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  return (
    <div className="p-10 max-w-[1600px] mx-auto space-y-10 animate-in fade-in duration-700">
      {/* Header & Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-black text-slate-800">Admin Dashboard</h1>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold mt-0.5">
            <span>Dashboard</span> <ChevronRight size={10} /> <span className="text-indigo-600">Overview</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/students/add" className="btn-primary flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"><Plus size={14} /> Add New Student</Link>
          <Link to="/fees" className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-black hover:bg-slate-50 transition-all">Fees Records</Link>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm bg-indigo-100 flex items-center justify-center font-bold text-[10px] text-indigo-600">FP</div>
          <p className="text-[11px] font-bold text-emerald-800 tracking-tight">Fahed Prajapat (Class III, C) <span className="font-medium text-emerald-600">just cleared their</span> "Term 1" <span className="font-medium text-emerald-600">Academic Fees.</span></p>
        </div>
        <button className="text-emerald-300 hover:text-emerald-500 transition-colors"><X size={16} /></button>
      </div>

      {/* Welcome Card */}
      <div className="bg-[#101035] rounded-[32px] p-8 relative overflow-hidden flex flex-col justify-center min-h-[160px] shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Welcome Back, Mr. Herald <span className="text-2xl">🎓</span></h2>
          <p className="text-indigo-200/60 text-sm font-medium max-w-lg leading-relaxed">System is running smooth. You have 4 academic sessions scheduled today and 2 staff approvals pending.</p>
        </div>
        <div className="absolute top-8 right-10 text-indigo-300/50 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> 
          Last Sync: {today.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
        </div>
      </div>

      {/* Attendance Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <AttendanceMetric label="Present Today" value={stats.attendance[activeTab].present} trend="+4%" trendType="up" icon={CheckCircle2} color="bg-indigo-500" />
        <AttendanceMetric label="Absent Today" value={stats.attendance[activeTab].absent} trend="0%" trendType="neutral" icon={AlertCircle} color="bg-rose-500" />
        <AttendanceMetric label="Late Arrival" value={stats.attendance[activeTab].late} trend="-1%" trendType="down" icon={Clock} color="bg-orange-500" />
        <AttendanceMetric label="Medical Leave" value={stats.attendance[activeTab].medical || 0} trend="+1" trendType="up" icon={Plus} color="bg-emerald-500" />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Total Students" value={stats.students.total} active={stats.students.active} inactive={stats.students.inactive} icon={GraduationCap} color="bg-orange-500" to="/students" />
        <StatCard title="Total Teachers" value={stats.teachers.total} active={stats.teachers.active} inactive={stats.teachers.inactive} icon={UserSquare2} color="bg-blue-500" to="/teachers" />
        <StatCard title="Total Staff" value={stats.staff.total} active={stats.staff.active} inactive={stats.staff.inactive} icon={Users} color="bg-red-500" to="/teachers" />
        <StatCard title="Total Subjects" value={stats.subjects.total} active={stats.subjects.active} inactive={stats.subjects.inactive} icon={BookOpen} color="bg-purple-500" to="/subjects" />
      </div>

      {/* Main Grid Row 1 */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4 bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Schedules</h3>
            <button className="text-[10px] font-black text-indigo-600 px-3 py-1.5 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all">+ Add New</button>
          </div>
          <div className="mb-6 bg-slate-50/50 p-4 rounded-[24px] border border-slate-50">
            <div className="flex justify-between items-center mb-4 text-[11px] font-black text-slate-800">
              <span className="uppercase tracking-widest">{currentMonth} {currentYear}</span>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-white rounded-lg transition-all shadow-sm">{'<'}</button>
                <button className="p-1 hover:bg-white rounded-lg transition-all shadow-sm">{'>'}</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-y-3 text-center text-[10px]">
              {['S','M','T','W','T','F','S'].map(d => <span key={d} className="font-black text-slate-300 uppercase">{d}</span>)}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`p-${i}`}></div>)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const isToday = i + 1 === today.getDate();
                return (
                  <div key={i} className={`py-1.5 rounded-xl cursor-pointer transition-all ${isToday ? 'bg-indigo-600 text-white font-black shadow-lg shadow-indigo-200' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}>
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </div>
          <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-5">Upcoming Events</h4>
          <div className="space-y-4">
            {[
              {t:'Parent-Teacher Meeting', c:'bg-blue-500', time: '10:00 AM - 12:00 PM'}, 
              {t:'Annual Sports Briefing', c:'bg-red-500', time: '02:30 PM - 03:30 PM'}
            ].map((e,i) => (
              <div key={i} className="flex gap-4 items-center group cursor-pointer p-1 rounded-2xl hover:bg-slate-50 transition-all">
                <div className={`w-1.5 h-10 rounded-full ${e.c} shadow-sm shadow-indigo-100`}></div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-[11px] font-black text-slate-800 group-hover:text-indigo-600 transition-colors truncate">{e.t}</h5>
                  <p className="text-[9px] text-slate-400 font-bold flex items-center gap-1.5 mt-1"><Clock size={10} className="text-slate-300" /> {e.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-5 bg-white rounded-[32px] border border-slate-100 p-6 flex flex-col items-center shadow-sm">
          <div className="w-full flex justify-between items-center mb-8">
            <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Attendance Trend</h3>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-xl text-[10px] font-black text-slate-500 border border-slate-100 uppercase">Today <ChevronDown size={12} /></div>
          </div>
          <div className="flex gap-6 self-start mb-8 border-b border-slate-50 w-full">
            <button onClick={() => setActiveTab('students')} className={`text-[10px] font-black pb-3 -mb-[1px] transition-all uppercase tracking-widest ${activeTab === 'students' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-300 hover:text-slate-500'}`}>Students</button>
            <button onClick={() => setActiveTab('teachers')} className={`text-[10px] font-black pb-3 -mb-[1px] transition-all uppercase tracking-widest ${activeTab === 'teachers' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-300 hover:text-slate-500'}`}>Teachers</button>
          </div>
          <div className="relative w-48 h-48 mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="transparent" stroke="#f8fafc" strokeWidth="10" />
              <circle 
                cx="50" cy="50" r="42" fill="transparent" stroke="#6366f1" strokeWidth="10" 
                strokeDasharray={`${(stats.attendance[activeTab].present / (stats.attendance[activeTab].present + stats.attendance[activeTab].absent || 1)) * 263.8} 263.8`} 
                strokeLinecap="round" 
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-800 leading-none">{stats.attendance[activeTab].present || 0}</span>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-2">Present</span>
            </div>
            <div className="absolute top-1 right-2 w-10 h-10 bg-white rounded-2xl border-4 border-indigo-50 shadow-lg flex items-center justify-center"><CheckCircle2 size={16} className="text-indigo-600" /></div>
          </div>
          <div className="grid grid-cols-4 gap-4 w-full text-center mb-8">
            <div><span className="block text-sm font-black text-slate-800">{stats.attendance[activeTab].emergency || 0}</span><span className="text-[8px] font-black text-slate-300 uppercase tracking-tighter">EMG</span></div>
            <div><span className="block text-sm font-black text-slate-800">{stats.attendance[activeTab].medical || 0}</span><span className="text-[8px] font-black text-slate-300 uppercase tracking-tighter">MED</span></div>
            <div><span className="block text-sm font-black text-slate-800">{stats.attendance[activeTab].absent}</span><span className="text-[8px] font-black text-slate-300 uppercase tracking-tighter">ABS</span></div>
            <div><span className="block text-sm font-black text-slate-800">{stats.attendance[activeTab].late}</span><span className="text-[8px] font-black text-slate-300 uppercase tracking-tighter">LAT</span></div>
          </div>
          <Link to="/attendance" className="w-full py-3.5 bg-indigo-50/30 text-indigo-600 text-[10px] font-black rounded-2xl border border-indigo-100/50 hover:bg-indigo-50 transition-all flex items-center justify-center uppercase tracking-widest">Analytics Report</Link>
        </div>

        <div className="col-span-3 space-y-6">
          <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-3 gap-y-6 gap-x-4">
              {[
                {label: 'Calendar', icon: Calendar, to: '/calendar', color: 'text-indigo-500'},
                {label: 'Exams', icon: ClipboardList, to: '/exam-timetable', color: 'text-rose-500'},
                {label: 'Attend', icon: CheckCircle2, to: '/attendance', color: 'text-emerald-500'},
                {label: 'Fees', icon: CreditCard, to: '/fees', color: 'text-amber-500'},
                {label: 'Stats', icon: BarChart3, to: '/', color: 'text-blue-500'},
                {label: 'Inbox', icon: Mail, to: '/', color: 'text-purple-500'},
              ].map((l,i) => (
                <Link key={l.label} to={l.to} className="flex flex-col items-center gap-2 group transition-all">
                  <div className={`w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center ${l.color} group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm border border-slate-100 group-hover:border-indigo-600 group-hover:shadow-indigo-100`}><l.icon size={20} /></div>
                  <span className="text-[9px] font-black text-slate-400 group-hover:text-slate-800 transition-colors uppercase tracking-tighter">{l.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Resources</h3>
              <button className="text-[10px] font-black text-indigo-600">+ Create</button>
            </div>
            <div className="space-y-3">
              {[
                {m:'Academic Plan 2026', d: 'Updated 2h ago'}, 
                {m:'Class X Routine', d: 'Final Copy'}
              ].map(res => (
                <div key={res.m} className="flex items-center justify-between bg-slate-50/50 p-3 rounded-2xl border border-slate-50 group cursor-pointer hover:bg-slate-50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-indigo-500 shadow-sm"><FileText size={16} /></div>
                    <div className="min-w-0"><h5 className="text-[10px] font-black text-slate-800 truncate">{res.m}</h5><p className="text-[8px] font-bold text-slate-300 uppercase">{res.d}</p></div>
                  </div>
                  <Download size={14} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Final Row: Fees & Performers */}
      <div className="grid grid-cols-12 gap-8 mb-12">
        <div className="col-span-8 bg-white rounded-[40px] border border-slate-100 p-8 flex flex-col shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <Link to="/fees" className="group">
              <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-indigo-600 transition-colors">Fees Collection Analytics</h3>
            </Link>
            <div className="flex items-center gap-6 text-[9px] font-black uppercase text-slate-300 tracking-widest">
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-slate-100"></div> Total Target: ₹{stats.fees.target.toLocaleString('en-IN')}</div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-sm"></div> Collected: ₹{stats.fees.collected.toLocaleString('en-IN')}</div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center space-y-10 px-4">
            <div>
              <div className="flex justify-between items-end mb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Current Recovery</span>
                <span className="text-3xl font-black text-slate-800 tracking-tighter">₹{stats.fees.collected.toLocaleString('en-IN')}</span>
              </div>
              <div className="h-5 w-full bg-slate-50 rounded-full overflow-hidden p-1 border border-slate-100/50 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-1000 shadow-md relative" 
                  style={{ width: `${(stats.fees.collected / (stats.fees.target || 1)) * 100}%` }}
                >
                  <div className="absolute top-0 right-0 h-full w-4 bg-white/20 blur-sm"></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-12 pt-6 border-t border-slate-50">
              <div>
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest block mb-2">Realization Rate</span>
                <span className="text-2xl font-black text-indigo-600">{Math.round((stats.fees.collected / (stats.fees.target || 1)) * 100)}%</span>
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest block mb-2">Outstanding Arrears</span>
                <span className="text-2xl font-black text-rose-500">₹{stats.fees.pending.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 grid grid-cols-2 gap-6">
          <div className="bg-emerald-500 rounded-[32px] p-6 flex flex-col items-center text-center justify-center text-white relative overflow-hidden shadow-xl shadow-emerald-100">
            <span className="text-[8px] font-black uppercase opacity-60 tracking-widest mb-4">Top Performer</span>
            <div className="w-20 h-20 rounded-[24px] border-4 border-white/20 mb-4 overflow-hidden shadow-2xl"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Adrian" alt="" /></div>
            <h4 className="text-[13px] font-black tracking-tight leading-tight">Adrian Rubell</h4>
            <p className="text-[10px] font-medium opacity-80 mt-1">HOD Physics</p>
            <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          <div className="bg-indigo-600 rounded-[32px] p-6 flex flex-col items-center text-center justify-center text-white relative overflow-hidden shadow-xl shadow-indigo-100">
            <span className="text-[8px] font-black uppercase opacity-60 tracking-widest mb-4">Academic Star</span>
            <div className="w-20 h-20 rounded-[24px] border-4 border-white/20 mb-4 overflow-hidden shadow-2xl"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tenesa" alt="" /></div>
            <h4 className="text-[13px] font-black tracking-tight leading-tight">Tenesa J.</h4>
            <p className="text-[10px] font-medium opacity-80 mt-1">Class XII, A</p>
            <div className="mt-4 px-4 py-1 bg-white/20 rounded-xl text-[10px] font-black tracking-widest">98.4%</div>
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Row 4: Notice Board & Lists */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4 bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Notice Board</h3>
            <div className="flex gap-4">
              <button className="text-indigo-600 text-[9px] font-black tracking-widest uppercase">+ NEW</button>
            </div>
          </div>
          <div className="space-y-5">
            {notices.map((n, i) => (
              <div key={i} className="flex gap-4 p-3 hover:bg-slate-50/50 rounded-2xl transition-all cursor-pointer group border border-transparent hover:border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm"><ArrowUpRight size={18} /></div>
                <div className="min-w-0 flex-1">
                  <h5 className="text-[11px] font-black text-slate-800 group-hover:text-indigo-600 transition-colors truncate leading-tight">{n.title}</h5>
                  <p className="text-[9px] text-slate-400 font-bold mt-1.5 uppercase tracking-tighter">Released: {new Date(n.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-slate-50 text-slate-400 text-[9px] font-black rounded-2xl mt-8 border border-slate-100 hover:bg-slate-100 transition-all uppercase tracking-widest">View Archives</button>
        </div>

        <div className="col-span-4 bg-white rounded-[32px] border border-slate-100 p-6 flex flex-col shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Report Center</h3>
            <div className="px-3 py-1.5 bg-slate-50 rounded-xl text-[10px] font-black text-slate-500 border border-slate-100 uppercase tracking-tighter">AY 2026-27 <ChevronDown size={12} /></div>
          </div>
          <div className="space-y-3.5">
            {[
              {t:'Class X, A Term 1 Progress Report', d:'Live Now'}, 
              {t:'Library Resource Audit 2026', d:'Completed'}, 
              {t:'Mid-Term Faculty Assessment', d:'In Progress'}
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50/50 rounded-2xl border border-slate-50 group hover:bg-slate-50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-indigo-500 border border-slate-200 shadow-sm"><FileText size={16} /></div>
                  <div className="min-w-0"><h5 className="text-[10px] font-black text-slate-800 leading-tight">{r.t}</h5><p className={`text-[8px] font-black uppercase mt-1 ${r.d === 'Live Now' ? 'text-emerald-500' : 'text-slate-300'}`}>{r.d}</p></div>
                </div>
                <Download size={14} className="text-slate-300 hover:text-indigo-600 cursor-pointer transition-colors" />
              </div>
            ))}
            <button className="w-full py-4 bg-indigo-600 text-white text-[10px] font-black rounded-2xl mt-6 shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all uppercase tracking-widest">Generate New Report</button>
          </div>
        </div>

        <div className="col-span-4 bg-white rounded-[32px] border border-slate-100 p-6 flex flex-col shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Staff Requests</h3>
            <div className="px-3 py-1.5 bg-slate-50 rounded-xl text-[10px] font-black text-slate-500 border border-slate-100 uppercase tracking-tighter">Queue: 04 <ChevronDown size={12} /></div>
          </div>
          <div className="space-y-4 flex-1 overflow-auto pr-1">
            {[
              {n:'Prof. James', t:'EMERGENCY', r:'Physics Dept', d: '12-14 May'}, 
              {n:'Sarah Ramien', t:'CASUAL', r:'Administration', d: '20 May'}
            ].map((req, i) => (
              <div key={i} className="p-4 border border-slate-50 rounded-[24px] space-y-4 bg-slate-50/30 hover:border-slate-200 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md bg-indigo-50 flex items-center justify-center font-bold text-indigo-300 text-xs">{req.n[0]}</div>
                    <div>
                      <h5 className="text-[11px] font-black text-slate-900 leading-none mb-1">{req.n} <span className={`ml-1 text-[7px] font-black px-2 py-0.5 rounded-full ${req.t === 'EMERGENCY' ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'}`}>{req.t}</span></h5>
                      <p className="text-[9px] text-slate-400 font-bold tracking-tight">{req.r}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"><CheckCircle2 size={18} /></button>
                    <button className="w-8 h-8 flex items-center justify-center text-rose-400 hover:bg-rose-50 rounded-xl transition-all"><X size={18} /></button>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[9px] font-black text-slate-400 border-t border-slate-100/50 pt-3 uppercase tracking-widest">
                  <span>Period: {req.d}</span>
                  <span className="text-indigo-500 cursor-pointer">Details</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
