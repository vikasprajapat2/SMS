import React, { useState } from 'react';
import {
  User, Bell, FileText, ChevronRight, Calendar, BookOpen,
  TrendingUp, AlertCircle, CheckCircle2, Clock, Download,
  IndianRupee, MessageSquare, ArrowRight, Star
} from 'lucide-react';

const CHILDREN = [
  { id: 1, name: 'Rohan Prajapat', grade: 'Class X-A', avatar: 'rohan', roll: 'STU-1024' },
  { id: 2, name: 'Priya Prajapat', grade: 'Class VII-B', avatar: 'priya', roll: 'STU-1025' },
];

const NOTICES = [
  { id: 1, color: 'bg-rose-500', text: 'Homework has been submitted successfully', time: '13 Hours Ago' },
  { id: 2, color: 'bg-emerald-500', text: '"Transport Fees" Paid Successfully', time: '13 Hours Ago' },
  { id: 3, color: 'bg-blue-500', text: 'Exam model result will be released today', time: '24 Hours Ago' },
  { id: 4, color: 'bg-amber-500', text: 'Home work added by "Shan" from the Book', time: '24 Hours Ago' },
  { id: 5, color: 'bg-teal-500', text: 'Leave on 25 May 2024 Approved by "Reena"', time: '2 Days Ago' },
];

const ASSIGNMENTS = [
  { title: 'Algebra and Arithmetic Assignment', date: '17 Jun 2024', count: 2, status: 'overdue' },
  { title: 'Science Assignment', date: '20 Jun 2024', count: 2, status: 'new' },
  { title: 'History Assignment', date: '20 Jun 2024', count: 2, status: 'inprogress' },
  { title: 'Computer Assignment', date: '20 Jun 2024', count: 2, status: 'overdue' },
];

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S'];
const DAY_STATES = ['present', 'present', 'present', 'present', 'absent', 'half'];

const ParentDashboard = () => {
  const [activeChild, setActiveChild] = useState(CHILDREN[0]);
  const [assignTab, setAssignTab] = useState('overdue');

  const filteredAssign = ASSIGNMENTS.filter(a =>
    assignTab === 'overdue' ? a.status === 'overdue'
    : assignTab === 'new' ? a.status === 'new'
    : a.status === 'inprogress'
  );

  const dayColor = (s) =>
    s === 'present' ? 'bg-emerald-500 text-white'
    : s === 'absent' ? 'bg-rose-500 text-white'
    : 'bg-amber-400 text-white';

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto min-h-screen">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-bold mb-1">
            <span>Dashboard</span><ChevronRight size={12}/><span className="text-indigo-600">Parent Dashboard</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Parent Dashboard</h1>
        </div>

        {/* Child Selector */}
        <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Child</span>
          <div className="flex gap-2">
            {CHILDREN.map(child => (
              <button
                key={child.id}
                onClick={() => setActiveChild(child)}
                className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all ${activeChild.id === child.id ? 'border-indigo-500 shadow-lg shadow-indigo-100' : 'border-slate-200 opacity-50'}`}
              >
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${child.avatar}`} alt={child.name} className="w-full h-full" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Parent Profile Card + Quick Actions + Leave Types ── */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* Profile */}
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[28px] p-6 text-white h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=parent&backgroundColor=b6e3f4" alt="Parent" className="w-full h-full" />
              </div>
              <div>
                <span className="text-[9px] bg-indigo-500 text-white font-black uppercase tracking-wider px-2 py-0.5 rounded-md">#P124556</span>
                <h3 className="text-lg font-black mt-1 leading-tight">Vikas Prajapat</h3>
                <p className="text-white/50 text-[11px] font-bold">Child: {activeChild.name.split(' ')[0]}</p>
              </div>
            </div>
            <div className="border-t border-white/10 pt-4 space-y-2">
              <div><p className="text-[9px] text-white/40 uppercase tracking-widest">Active Child</p><p className="text-sm font-bold">{activeChild.name}</p></div>
              <div><p className="text-[9px] text-white/40 uppercase tracking-widest">Grade</p><p className="text-sm font-bold">{activeChild.grade}</p></div>
              <div><p className="text-[9px] text-white/40 uppercase tracking-widest">Roll Number</p><p className="text-sm font-bold">{activeChild.roll}</p></div>
            </div>
            <button className="mt-5 w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all">Edit Profile</button>
          </div>
        </div>

        {/* Quick Actions + Leave */}
        <div className="col-span-12 lg:col-span-9 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 rounded-xl"><Calendar size={20} className="text-indigo-600"/></div>
                <span className="font-black text-sm text-slate-700">Apply for Leave</span>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600 transition-colors"/>
            </button>
            <button className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 rounded-xl"><MessageSquare size={20} className="text-emerald-600"/></div>
                <span className="font-black text-sm text-slate-700">Raise a Request</span>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-600 transition-colors"/>
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
              { label: 'Medical Leaves', total: 10, used: 5, color: 'text-rose-500 bg-rose-50' },
              { label: 'Casual Leaves', total: 12, used: 2, color: 'text-amber-500 bg-amber-50' },
              { label: 'Special Leaves', total: 10, used: 0, color: 'text-purple-500 bg-purple-50' },
              { label: 'Paternity Leave', total: 10, used: 0, color: 'text-blue-500 bg-blue-50' },
              { label: 'Maternity Leave', total: 10, used: 0, color: 'text-pink-500 bg-pink-50' },
              { label: 'Sick Leaves', total: 10, used: 5, color: 'text-orange-500 bg-orange-50' },
            ].map(l => (
              <div key={l.label} className={`${l.color} rounded-2xl p-3`}>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-70 leading-tight mb-2">{l.label} ({l.total})</p>
                <p className="text-[10px] font-bold opacity-70">Used: <strong className="opacity-100">{l.used}</strong></p>
                <p className="text-[10px] font-bold opacity-70">Available: <strong className="opacity-100">{l.total - l.used}</strong></p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats + Notice Board ── */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Stats Chart Placeholder */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-[28px] border border-slate-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-slate-800">Statistics</h3>
            <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">2024 - 2025</span>
          </div>
          <div className="flex gap-4 mb-4">
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500"><span className="w-3 h-1 bg-indigo-500 rounded-full inline-block"></span>Avg. Exam Score: 72%</span>
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500"><span className="w-3 h-1 bg-emerald-400 rounded-full inline-block"></span>Avg. Attendance: 95%</span>
          </div>
          {/* Simple bar chart */}
          <div className="flex items-end gap-2 h-32">
            {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => {
              const exam = [60,65,55,70,72,68,75,80,72,78,82,85][i];
              const att  = [90,92,88,95,97,93,96,95,98,94,97,99][i];
              return (
                <div key={m} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-0.5 items-end">
                    <div className="flex-1 bg-indigo-100 rounded-t-sm" style={{height: `${exam * 0.9}%`, minHeight:4}}></div>
                    <div className="flex-1 bg-emerald-100 rounded-t-sm" style={{height: `${att * 0.9}%`, minHeight:4}}></div>
                  </div>
                  <span className="text-[8px] text-slate-400 font-bold">{m}</span>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-indigo-50 rounded-2xl p-4">
              <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Avg Exam Score</p>
              <p className="text-2xl font-black text-indigo-600 mt-1">72%</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4">
              <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Avg Attendance</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">95%</p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-4">
              <p className="text-[9px] font-black text-amber-400 uppercase tracking-widest">Overall Grade</p>
              <p className="text-2xl font-black text-amber-600 mt-1">A+</p>
            </div>
          </div>
        </div>

        {/* Notice Board */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-[28px] border border-slate-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-black text-slate-800">Notice Board</h3>
            <button className="text-[11px] font-black text-indigo-600 hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {NOTICES.map(n => (
              <div key={n.id} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer group">
                <div className={`${n.color} w-8 h-8 rounded-xl flex items-center justify-center shrink-0`}>
                  <Bell size={14} className="text-white"/>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-700 leading-snug">{n.text}</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Attendance + Fee Reminder ── */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Attendance */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-[28px] border border-slate-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-black text-slate-800">Attendance</h3>
            <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">This Month</span>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last 7 Days</p>
              <p className="text-[10px] text-slate-400 mb-3">14 May 2024 – 21 May 2024</p>
              <div className="flex gap-2 mb-4">
                {DAYS.map((d, i) => (
                  <div key={i} className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black ${dayColor(DAY_STATES[i] || 'present')}`}>{d}</div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-4">
                <Calendar size={12}/> No of total working days: <strong className="text-slate-700">28 Days</strong>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[['Present','25','emerald'],['Absent','2','rose'],['Halfday','0','amber'],['Late','1','orange']].map(([l,v,c]) => (
                  <div key={l} className="text-center">
                    <p className={`text-xl font-black text-${c}-500`}>{v}</p>
                    <p className="text-[9px] text-slate-400 font-bold">{l}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Donut */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3"/>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="95 5" strokeLinecap="round"/>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f43f5e" strokeWidth="3" strokeDasharray="2 98" strokeLinecap="round" strokeDashoffset="-95"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-black text-slate-800">95%</p>
                  <p className="text-[9px] text-slate-400 font-bold">Attendance</p>
                </div>
              </div>
              <div className="mt-4 space-y-1.5">
                {[['Present','#10b981'],['Absent','#f43f5e'],['Late','#f59e0b'],['Half Day','#94a3b8']].map(([l,c]) => (
                  <div key={l} className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-full" style={{background:c}}></span>{l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fee Reminder */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-[28px] border border-slate-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-black text-slate-800">Fee Reminder</h3>
            <IndianRupee size={18} className="text-slate-400"/>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Tuition Fee', amount: '₹16,500', due: '15 Jun 2024', urgent: true },
              { label: 'Transport Fee', amount: '₹3,200', due: '20 Jun 2024', urgent: false },
              { label: 'Library Fee', amount: '₹800', due: '30 Jun 2024', urgent: false },
            ].map((f) => (
              <div key={f.label} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${f.urgent ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${f.urgent ? 'bg-rose-100' : 'bg-slate-100'}`}>
                    <FileText size={16} className={f.urgent ? 'text-rose-500' : 'text-slate-400'}/>
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-700">{f.label}</p>
                    <p className="text-[10px] font-bold text-slate-400">Due: {f.due}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className={`text-base font-black ${f.urgent ? 'text-rose-600' : 'text-slate-700'}`}>{f.amount}</p>
                  <button className={`p-2 rounded-xl ${f.urgent ? 'bg-rose-500 text-white' : 'bg-white border border-slate-200 text-slate-400'}`}>
                    <ChevronRight size={16}/>
                  </button>
                </div>
              </div>
            ))}
            <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all shadow-lg shadow-indigo-100 mt-2">
              Pay All Dues
            </button>
          </div>
        </div>
      </div>

      {/* ── Assignments + Reports ── */}
      <div className="grid grid-cols-12 gap-6">
        {/* Assignments */}
        <div className="col-span-12 lg:col-span-6 bg-white rounded-[28px] border border-slate-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black text-slate-800">Assignments</h3>
            <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">This Year</span>
          </div>
          <div className="flex gap-1 mb-5 bg-slate-50 p-1 rounded-xl">
            {['overdue','new','inprogress'].map(t => (
              <button key={t} onClick={() => setAssignTab(t)}
                className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${assignTab === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>
                {t === 'inprogress' ? 'In Progress' : t}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {filteredAssign.length === 0
              ? <p className="text-center text-slate-300 text-xs font-bold py-8 uppercase tracking-widest">No assignments</p>
              : filteredAssign.map((a, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-700 truncate">{a.title}</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">{a.date}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black flex items-center justify-center">{a.count}</span>
                  <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all">
                    <ArrowRight size={14}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reports */}
        <div className="col-span-12 lg:col-span-6 bg-white rounded-[28px] border border-slate-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-black text-slate-800">Reports</h3>
            <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">This Year</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['Academic Reports', 'Performance'].map(cat => (
              <div key={cat}>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{cat}</p>
                <div className="space-y-2">
                  {['Term - 1 Report', 'Term - 2 Report', 'Term - 3 Report'].map(r => (
                    <div key={r} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-100 transition-all group cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-rose-50 rounded-lg flex items-center justify-center">
                          <FileText size={13} className="text-rose-500"/>
                        </div>
                        <span className="text-[11px] font-bold text-slate-600">{r}</span>
                      </div>
                      <button className="p-1.5 bg-white rounded-lg border border-slate-200 text-slate-400 group-hover:text-indigo-600 transition-all">
                        <Download size={12}/>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
