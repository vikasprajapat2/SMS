import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { 
  Plus, ChevronRight, Clock, MoreHorizontal, GraduationCap, 
  UserSquare2, Users, BookOpen, Calendar, CheckCircle2, 
  ArrowUpRight, Download, FileText, ChevronDown, AlertCircle
} from 'lucide-react';

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
    students: { total: 0, active: 0, inactive: 0 },
    teachers: { total: 0, active: 0, inactive: 0 },
    staff: { total: 0, active: 0, inactive: 0 },
    subjects: { total: 0, active: 0, inactive: 0 },
    attendance: { 
      students: { present: 0, absent: 0, late: 0, medical: 0, emergency: 0 },
      teachers: { present: 0, absent: 0, late: 0, medical: 0 }
    },
    fees: { collected: 0, pending: 0, target: 0 }
  });
  const [activeTab, setActiveTab] = useState('students');
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, noticeRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/dashboard/notices')
        ]);
        setStats(statsRes.data);
        setNotices(noticeRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header & Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-black text-slate-800">Admin Dashboard</h1>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold mt-0.5">
            <span>Dashboard</span> <ChevronRight size={10} /> <span className="text-indigo-600">Admin Dashboard</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/students/add" className="btn-primary flex items-center gap-2"><Plus size={14} /> Add New Student</Link>
          <button className="btn-cyan">Fees Details</button>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Fahed" alt="" /></div>
          <p className="text-[11px] font-bold text-green-700">Fahed III,C <span className="font-medium text-green-600">has paid Fees for the</span> "Term1"</p>
        </div>
        <button className="text-green-400 hover:text-green-600"><AlertCircle size={14} className="rotate-45" /></button>
      </div>

      {/* Welcome Card */}
      <div className="bg-[#101035] rounded-3xl p-7 relative overflow-hidden flex flex-col justify-center min-h-[140px] shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-black text-white mb-1.5">Welcome Back, Mr. Herald <span className="text-xl">✏️</span></h2>
          <p className="text-indigo-200/70 text-xs font-medium max-w-md leading-relaxed">Have a Good day at work. You have 4 meetings today and 2 pending reports to review.</p>
        </div>
        <div className="absolute top-5 right-7 text-indigo-300 text-[10px] font-bold flex items-center gap-1.5">
          <Clock size={12} /> Updated Recently on 15 Jun 2024
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Students" value={stats.students.total} active={stats.students.active} inactive={stats.students.inactive} icon={GraduationCap} color="bg-orange-500 text-orange-500" to="/students" />
        <StatCard title="Total Teachers" value={stats.teachers.total} active={stats.teachers.active} inactive={stats.teachers.inactive} icon={UserSquare2} color="bg-blue-500 text-blue-500" to="/teachers" />
        <StatCard title="Total Staff" value={stats.staff.total} active={stats.staff.active} inactive={stats.staff.inactive} icon={Users} color="bg-red-500 text-red-500" to="/students" />
        <StatCard title="Total Subjects" value={stats.subjects.total} active={stats.subjects.active} inactive={stats.subjects.inactive} icon={BookOpen} color="bg-purple-500 text-purple-500" to="/subjects" />
      </div>

      {/* Main Grid Row 1 */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4 card p-5">
          <div className="flex justify-between items-center mb-5"><h3 className="font-black text-xs uppercase tracking-wider text-slate-700">Schedules</h3><button className="text-[10px] font-black text-indigo-600 border border-indigo-100 px-2.5 py-1 rounded-lg hover:bg-indigo-50">+ Add New</button></div>
          <div className="mb-5 bg-slate-50 p-3 rounded-2xl">
            <div className="flex justify-between items-center mb-3 text-[11px] font-bold text-slate-800"><span>July 2024</span><div className="flex gap-1"><button className="p-0.5 hover:bg-white rounded">{'<'}</button><button className="p-0.5 hover:bg-white rounded">{'>'}</button></div></div>
            <div className="grid grid-cols-7 gap-y-2 text-center text-[10px]">
              {['S','M','T','W','T','F','S'].map(d => <span key={d} className="font-black text-slate-300 mb-1">{d}</span>)}
              {[...Array(31)].map((_, i) => <div key={i} className={`py-1 rounded-lg cursor-pointer ${i === 12 ? 'bg-indigo-600 text-white font-black shadow-lg shadow-indigo-200' : 'text-slate-600 hover:bg-white'}`}>{i + 1}</div>)}
            </div>
          </div>
          <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">Upcoming Events</h4>
          <div className="space-y-3.5">
            {[{t:'Parents, Teacher Meet', c:'bg-blue-500'}, {t:'Vacation Meeting', c:'bg-red-500'}].map((e,i) => (
              <div key={i} className="flex gap-3 items-center group cursor-pointer">
                <div className={`w-1 h-8 rounded-full ${e.c}`}></div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-[11px] font-bold text-slate-800 group-hover:text-indigo-600 truncate">{e.t}</h5>
                  <p className="text-[9px] text-slate-400 font-bold flex items-center gap-1 mt-0.5"><Clock size={10} /> 09:10AM - 10:50PM</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-5 card p-5 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-6"><h3 className="font-black text-xs uppercase tracking-wider text-slate-700">Attendance</h3><div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-500 border border-slate-100">Today <ChevronDown size={12} /></div></div>
          <div className="flex gap-5 self-start mb-6 border-b border-slate-50 w-full">
            <button 
              onClick={() => setActiveTab('students')}
              className={`text-[11px] font-black pb-2 -mb-[1px] transition-all ${activeTab === 'students' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}
            >
              Students
            </button>
            <button 
              onClick={() => setActiveTab('teachers')}
              className={`text-[11px] font-black pb-2 -mb-[1px] transition-all ${activeTab === 'teachers' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}
            >
              Teachers
            </button>
          </div>
          <div className="relative w-44 h-44 mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
              <circle 
                cx="50" cy="50" r="40" fill="transparent" stroke="#6366f1" strokeWidth="12" 
                strokeDasharray={`${(stats.attendance[activeTab].present / (stats.attendance[activeTab].present + stats.attendance[activeTab].absent || 1)) * 251.2} 251.2`} 
                strokeLinecap="round" 
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-800 leading-none">{stats.attendance[activeTab].present}</span>
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter mt-0.5">Present</span>
            </div>
            <div className="absolute top-0 right-2 w-8 h-8 bg-indigo-50 rounded-full border-4 border-white shadow-sm flex items-center justify-center"><CheckCircle2 size={12} className="text-indigo-600" /></div>
          </div>
          <div className="grid grid-cols-4 gap-2 w-full text-center">
            <div><span className="block text-sm font-black text-slate-800">{stats.attendance[activeTab].emergency || 0}</span><span className="text-[8px] font-black text-slate-300 uppercase">EMG</span></div>
            <div><span className="block text-sm font-black text-slate-800">{stats.attendance[activeTab].medical || 0}</span><span className="text-[8px] font-black text-slate-300 uppercase">MED</span></div>
            <div><span className="block text-sm font-black text-slate-800">{stats.attendance[activeTab].absent}</span><span className="text-[8px] font-black text-slate-300 uppercase">ABS</span></div>
            <div><span className="block text-sm font-black text-slate-800">{stats.attendance[activeTab].late}</span><span className="text-[8px] font-black text-slate-300 uppercase">LAT</span></div>
          </div>
          <Link to="/attendance" className="w-full mt-auto py-2.5 bg-indigo-50/50 text-indigo-600 text-[10px] font-black rounded-xl border border-indigo-50 hover:bg-indigo-50 transition-colors flex items-center justify-center">View All Attendance</Link>
        </div>

        <div className="col-span-3 space-y-5">
          <div className="card p-5">
            <div className="flex justify-between items-center mb-5"><h3 className="font-black text-xs uppercase tracking-wider text-slate-700">Quick Links</h3><div className="flex gap-1"><button className="p-0.5">{'<'}</button><button className="p-0.5">{'>'}</button></div></div>
            <div className="grid grid-cols-3 gap-y-4 gap-x-2">
              {['Calendar','Exam','Attend','Fees','Works','Reports'].map((l,i) => (
                <div key={l} className="flex flex-col items-center gap-1.5 group cursor-pointer">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all"><FileText size={16} /></div>
                  <span className="text-[9px] font-black text-slate-400 group-hover:text-slate-800">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-5">
            <div className="flex justify-between items-center mb-4"><h3 className="font-black text-xs uppercase tracking-wider text-slate-700">Routine</h3><button className="text-[9px] font-black text-indigo-600">+ Create</button></div>
            <div className="space-y-2.5">
              {['October 2024','Nov 2024'].map(m => (
                <div key={m} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100 group cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-indigo-500"><FileText size={14} /></div>
                    <div className="min-w-0"><h5 className="text-[10px] font-black text-slate-800 truncate">{m}</h5><p className="text-[8px] font-medium text-slate-400">Class routine</p></div>
                  </div>
                  <Download size={13} className="text-slate-300 group-hover:text-indigo-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Final Row: Fees & Performers */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-8 card p-5 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-xs uppercase tracking-wider text-slate-700">Fees Collection</h3>
            <div className="flex items-center gap-4 text-[9px] font-black uppercase text-slate-300 tracking-tighter">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-100"></div> Total: ${stats.fees.target.toLocaleString()}</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-600"></div> Collected: ${stats.fees.collected.toLocaleString()}</div>
              <div className="px-2 py-1 bg-slate-50 rounded-lg text-slate-500 border border-slate-100 ml-2 flex items-center gap-1.5"><Calendar size={12} /> Last 8 Quater</div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center space-y-8 px-4">
            <div>
              <div className="flex justify-between items-end mb-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue Realized</span>
                <span className="text-xl font-black text-slate-800">${stats.fees.collected.toLocaleString()}</span>
              </div>
              <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden p-1 border border-slate-100">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-1000 shadow-sm" 
                  style={{ width: `${(stats.fees.collected / (stats.fees.target || 1)) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-50">
              <div>
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest block mb-1">Collection Progress</span>
                <span className="text-lg font-black text-indigo-600">{Math.round((stats.fees.collected / (stats.fees.target || 1)) * 100)}%</span>
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest block mb-1">Outstanding Balance</span>
                <span className="text-lg font-black text-orange-500">${stats.fees.pending.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 grid grid-cols-2 gap-4">
          <div className="bg-emerald-500 rounded-3xl p-4 flex flex-col items-center text-center justify-center text-white relative overflow-hidden">
            <span className="text-[9px] font-black uppercase opacity-60 tracking-widest mb-3">Best Performer</span>
            <div className="w-16 h-16 rounded-full border-4 border-white/20 mb-3 overflow-hidden shadow-lg"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Adrian" alt="" /></div>
            <h4 className="text-[11px] font-black">Adrian Rubell</h4>
            <p className="text-[9px] font-medium opacity-80">Physics Teacher</p>
            <div className="absolute -left-5 -bottom-5 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
          </div>
          <div className="bg-indigo-600 rounded-3xl p-4 flex flex-col items-center text-center justify-center text-white relative overflow-hidden shadow-lg">
            <span className="text-[9px] font-black uppercase opacity-60 tracking-widest mb-3">Star Students</span>
            <div className="w-16 h-16 rounded-full border-4 border-white/20 mb-3 overflow-hidden shadow-lg"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tenesa" alt="" /></div>
            <h4 className="text-[11px] font-black">Tenesa</h4>
            <p className="text-[9px] font-medium opacity-80">XII, A</p>
            <div className="mt-3 px-3 py-0.5 bg-white/20 rounded-full text-[9px] font-black">98%</div>
            <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
      {/* Row 4: Notice Board & Lists */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4 card p-5">
          <div className="flex justify-between items-center mb-6"><h3 className="font-black text-xs uppercase tracking-wider text-slate-700">Notice Board</h3><div className="flex gap-2"><button className="text-indigo-600 text-[9px] font-black tracking-widest">+ NEW</button><button className="text-slate-300 text-[9px] font-black tracking-widest uppercase">View All</button></div></div>
          <div className="space-y-4">
            {notices.length > 0 ? notices.map((n, i) => (
              <div key={i} className="flex gap-3.5 p-2.5 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer group">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all"><ArrowUpRight size={16} /></div>
                <div className="min-w-0 flex-1"><h5 className="text-[11px] font-bold text-slate-800 truncate leading-snug">{n.title}</h5><p className="text-[9px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">Added: {new Date(n.created_at).toLocaleDateString()}</p></div>
              </div>
            )) : (
              <p className="text-xs text-slate-400 italic">No notices posted yet.</p>
            )}
          </div>
        </div>

        <div className="col-span-4 card p-5 flex flex-col">
          <div className="flex justify-between items-center mb-6"><h3 className="font-black text-xs uppercase tracking-wider text-slate-700">Activities</h3><div className="px-2 py-1 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-500 border border-slate-100 flex items-center gap-1.5">2024 - 2025 <ChevronDown size={12} /></div></div>
          <div className="flex gap-4 mb-6 border-b border-slate-50 w-full"><button className="text-[10px] font-black text-slate-300">Library</button><button className="text-[10px] font-black text-indigo-600 border-b-2 border-indigo-600 pb-2 -mb-[1px]">Reports</button></div>
          <div className="space-y-3">
            {[{t:'Class IV, A 1st quarter Result', d:'25 May 24'}, {t:'Class IV, B 2st quarter Result', d:'21 Apr 24'}, {t:'Class III, C Assingment', d:'Pending'}].map((r, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100/50">
                <div className="flex items-center gap-3"><div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-indigo-500 border border-slate-200"><FileText size={14} /></div><h5 className="text-[10px] font-black text-slate-800">{r.t}</h5></div>
                <Download size={13} className="text-slate-300 hover:text-indigo-600 cursor-pointer" />
              </div>
            ))}
            <button className="w-full py-2 bg-indigo-600 text-white text-[10px] font-black rounded-xl mt-3 shadow-lg shadow-indigo-100">Upload New Report</button>
          </div>
        </div>

        <div className="col-span-4 card p-5 flex flex-col">
          <div className="flex justify-between items-center mb-6"><h3 className="font-black text-xs uppercase tracking-wider text-slate-700">Leave Requests</h3><div className="px-2 py-1 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-500 border border-slate-100 flex items-center gap-1.5">This Month <ChevronDown size={12} /></div></div>
          <div className="space-y-4 flex-1 overflow-auto">
            {[{n:'James', t:'EMERGENCY', r:'Physics Teacher'}, {n:'Ramien', t:'CASUAL', r:'Accountant'}].map((req, i) => (
              <div key={i} className="p-3 border border-slate-100 rounded-2xl space-y-3 bg-slate-50/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 shadow-sm"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${req.n}`} alt="" /></div><div><h5 className="text-[10px] font-black text-slate-900">{req.n} <span className={`ml-1 text-[8px] font-black px-1.5 py-0.5 rounded ${req.t === 'EMERGENCY' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'}`}>{req.t}</span></h5><p className="text-[9px] text-slate-400 font-bold">{req.r}</p></div></div>
                  <div className="flex gap-1.5"><button className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-lg"><CheckCircle2 size={16} /></button><button className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"><AlertCircle size={16} /></button></div>
                </div>
                <div className="flex justify-between text-[9px] font-black text-slate-400 border-t border-slate-100 pt-2 uppercase tracking-tight"><span>Leave: 12-13 May</span><span>Apply: 12 May</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Row: Todo, Inbox, Activity */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-3 card p-5">
          <div className="flex justify-between items-center mb-6"><h3 className="font-black text-xs uppercase tracking-wider text-slate-700">Todo</h3><div className="px-2 py-1 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-500 flex items-center gap-1">Today <ChevronDown size={12} /></div></div>
          <div className="space-y-4">
            {[{t:'Send Fees Reminder', d:true}, {t:'Routine to new staff', d:false}, {t:'Extra Class Info', d:false}].map((todo, i) => (
              <div key={i} className="flex gap-3 group cursor-pointer">
                <div className={`w-4 h-4 rounded border flex items-center justify-center mt-0.5 transition-all ${todo.d ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>{todo.d && <CheckCircle2 size={10} className="text-white" />}</div>
                <h5 className={`text-[10px] font-black leading-snug transition-all ${todo.d ? 'text-slate-300 line-through' : 'text-slate-700'}`}>{todo.t}</h5>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-5 card p-5">
          <div className="flex justify-between items-center mb-6"><h3 className="font-black text-xs uppercase tracking-wider text-slate-700">Inbox</h3><div className="flex gap-4 items-center"><div className="px-2 py-1 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-500 flex items-center gap-1">All Mails <ChevronDown size={12} /></div><button className="text-[9px] font-black text-slate-400 tracking-widest uppercase">View All</button></div></div>
          <div className="space-y-3">
            {[{u:'Adam Lee', i:'A', c:'bg-orange-100 text-orange-600'}, {u:'Taphina', i:'T', c:'bg-green-100 text-green-600'}].map((m, i) => (
              <div key={i} className="flex gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer group">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-sm ${m.c}`}>{m.i}</div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center mb-0.5"><h5 className="text-[11px] font-black text-slate-900 group-hover:text-indigo-600">{m.u}</h5><span className="text-[9px] text-slate-400 font-bold">05 May 24</span></div>
                  <p className="text-[10px] text-slate-500 truncate italic">"Generated your first response, might realize..."</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-4 card p-5">
          <h3 className="font-black text-xs uppercase tracking-wider text-slate-700 mb-6">Student Activity</h3>
          <div className="space-y-6">
            {[{a:'1st place in "Chess"', s:'This event took place in Our School for...', t:'A Day Ago'}, {a:'Participated in "Carrom"', s:'Justin Lee participated in "Carrom"', t:'4 Week Ago'}].map((act, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm"><Users size={20} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2"><h5 className="text-[11px] font-black text-slate-900 group-hover:text-indigo-600 transition-all leading-tight">{act.a}</h5><span className="text-[9px] text-slate-400 font-bold whitespace-nowrap">{act.t}</span></div>
                  <p className="text-[10px] text-slate-500 mt-1 truncate opacity-70 font-medium leading-relaxed">{act.s}</p>
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
