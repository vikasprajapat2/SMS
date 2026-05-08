import React, { useState } from "react";
import { Calendar, Clock, Bell, ChevronLeft, ChevronRight, ChevronDown, FileText, Download, BookOpen, User, CheckCircle, XCircle, AlertCircle, Upload, BarChart2 } from "lucide-react";

const TeacherDashboard = () => {
  const [calMonth] = useState("July 2024");
  const [activeLeaveTab, setActiveLeaveTab] = useState("approval");
  const [activeActivityTab, setActiveActivityTab] = useState("reports");

  const classes = [
    { time: "09:00–09:45", label: "Class V, B", color: "bg-red-500" },
    { time: "09:45–10:30", label: "Class IV, C", color: "bg-orange-500" },
    { time: "11:30–12:50", label: "Class V, A", color: "bg-blue-500" },
    { time: "01:30–02:15", label: "Class V, B", color: "bg-cyan-500" },
    { time: "02:15–03:00", label: "Class III, B", color: "bg-blue-700" },
  ];

  const bestPerformers = [
    { cls: "Class IV, C", pct: 90, color: "bg-blue-500" },
    { cls: "Class III, B", pct: 54, color: "bg-yellow-400" },
    { cls: "Class V, A", pct: 79, color: "bg-gray-400" },
    { cls: "Class V, B", pct: 88, color: "bg-yellow-500" },
  ];

  const students = [
    { name: "Susan Boswell", cls: "III, B", pct: 98, color: "bg-green-500" },
    { name: "Richard Mayes", cls: "V, A", pct: 96, color: "bg-green-500" },
    { name: "Veronica Randle", cls: "V, B", pct: 87, color: "bg-orange-500" },
  ];

  const events = [
    { title: "Parents, Teacher Meet", date: "15 July 2024", color: "border-blue-500" },
    { title: "Vacation Meeting", date: "07 July 2024", color: "border-red-500" },
    { title: "Staff Meeting", date: "10 July 2024", color: "border-blue-400" },
    { title: "Admission Camp", date: "10 July 2024", color: "border-cyan-500" },
  ];

  const syllabus = [
    { cls: "Class V, B", topic: "Introduction Note to Physics on Today Tech" },
    { cls: "Class V, A", topic: "Biometric & their Working Functionality" },
    { cls: "Class IV, C", topic: "Quisque a felis quis Course A-Z" },
    { cls: "Class IV, C", topic: "Quisque a felis quis Course A-Z" },
    { cls: "Class IV, C", topic: "Quisque a felis quis Course A-Z" },
  ];

  const notices = [
    { text: "Homework has been Submitted successfully", time: "13 Hours Ago", color: "bg-red-500" },
    { text: '"Trasnport Fees" Paid Successfully', time: "13 Hours Ago", color: "bg-green-500" },
    { text: "Exam model exam result will be released today", time: "24 Hours Ago", color: "bg-blue-500" },
    { text: "Home work added by Shan from the Book", time: "24 Hours Ago", color: "bg-red-500" },
  ];

  const leaves = [
    { type: "Emergency Leave", applied: "17 Jun 2024", leave: "15 Jun 2024", status: "Pending", statusColor: "bg-yellow-100 text-yellow-700" },
    { type: "Medical Leave", applied: "17 Jun 2024", leave: "15 Jun 2024", status: "Approved", statusColor: "bg-green-100 text-green-700" },
    { type: "Fever", applied: "17 Jun 2024", leave: "15 Jun 2024", status: "Approved", statusColor: "bg-green-100 text-green-700" },
    { type: "Stomach Pain", applied: "17 Jun 2024", leave: "15 Jun 2024", status: "Declined", statusColor: "bg-red-100 text-red-700" },
  ];

  const reports = [
    { title: "Class IV, A 1st quarter Result", date: "Uploaded on: 25 May 2024" },
    { title: "Class IV, B 2st quarter Result", date: "Uploaded on: 21 Apr 2024" },
    { title: "Class III, C Assignment", date: "" },
  ];

  const calDays = ["S","M","T","W","T","F","S"];
  const calNums = Array.from({length:31},(_,i)=>i+1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-4 font-sans">

      {/* Welcome Banner + Quick Links */}
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-40 opacity-20 bg-white rounded-full translate-x-20"></div>
          <h2 className="text-xl font-bold mb-0.5">Good Morning Ms.Teena</h2>
          <p className="text-blue-100 text-xs mb-2">Have a Good day at work</p>
          <p className="text-yellow-200 text-xs font-medium">Notice : There is a staff meeting at 9AM today, Dont forget to Attend!!!</p>
          <div className="absolute right-6 top-4 w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
            <span className="text-4xl">👩‍🏫</span>
          </div>
        </div>
        <div className="col-span-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <h3 className="text-xs font-bold text-slate-700 mb-3">Quick Links</h3>
          <div className="grid grid-cols-4 gap-2">
            {[{label:"Time table",color:"bg-red-100",icon:"📅"},{label:"Attendance",color:"bg-blue-100",icon:"✅"},{label:"Exam Result",color:"bg-orange-100",icon:"📊"},{label:"Reports",color:"bg-green-100",icon:"📄"}].map((q,i)=>(
              <div key={i} className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className={`w-10 h-10 ${q.color} rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-all`}>{q.icon}</div>
                <span className="text-[9px] font-semibold text-slate-500 text-center leading-tight">{q.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Card + Today's Class + Calendar */}
      <div className="grid grid-cols-12 gap-4 mb-4">
        {/* Profile */}
        <div className="col-span-4 bg-slate-800 rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-14 h-14 rounded-xl bg-slate-600 overflow-hidden border-2 border-slate-500">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teena" alt="Teacher" className="w-full h-full" />
            </div>
            <div className="flex-1">
              <span className="text-[9px] bg-blue-500 px-2 py-0.5 rounded-full text-white font-bold">#T594651</span>
              <h3 className="text-sm font-bold mt-1">Henriques Morgan</h3>
              <p className="text-[10px] text-slate-400">Classes Taken : IV-A, V-B • Physics</p>
            </div>
            <button className="bg-blue-500 text-white text-[9px] font-bold px-2 py-1 rounded-lg">Edit Profile</button>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#334155" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="95 100" strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-black">95%</span>
              </div>
            </div>
            <p className="text-xs text-slate-300">You Have Completed<br/><span className="font-bold text-white">95% of Today&apos;s Plan</span></p>
          </div>
        </div>

        {/* Today's Class */}
        <div className="col-span-5 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-700">Today&apos;s Class</h3>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
              <ChevronLeft size={14} className="cursor-pointer hover:text-blue-500"/>
              16 May 2024
              <ChevronRight size={14} className="cursor-pointer hover:text-blue-500"/>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {classes.map((c,i)=>(
              <div key={i} className="flex-shrink-0 flex flex-col items-center gap-1">
                <span className={`${c.color} text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap`}>{c.time}</span>
                <span className="text-[9px] text-slate-600 font-medium whitespace-nowrap">{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="col-span-3 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-700">Schedules</h3>
            <div className="flex gap-1">
              <ChevronLeft size={12} className="cursor-pointer text-slate-400 hover:text-blue-500"/>
              <ChevronRight size={12} className="cursor-pointer text-slate-400 hover:text-blue-500"/>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-medium mb-2">{calMonth}</p>
          <div className="grid grid-cols-7 text-center text-[9px] gap-y-1">
            {calDays.map((d,i)=><span key={i} className="text-slate-400 font-bold">{d}</span>)}
            {calNums.map(n=>(
              <div key={n} className={`py-0.5 rounded cursor-pointer text-[9px] font-medium ${n===6?"bg-blue-500 text-white font-bold":n===7?"bg-blue-600 text-white font-bold":n===12?"bg-slate-200 text-slate-700":n===27?"bg-yellow-400 text-white font-bold":"text-slate-600 hover:bg-slate-50"}`}>{n}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Row: Attendance + Best Performers + Student Progress + Upcoming Events */}
      <div className="grid grid-cols-12 gap-4 mb-4">
        {/* Attendance */}
        <div className="col-span-3 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-700">Attendance</h3>
            <span className="text-[9px] text-slate-500 border border-slate-200 px-2 py-0.5 rounded-lg flex items-center gap-1">This Month <ChevronDown size={10}/></span>
          </div>
          <div className="flex gap-3 text-[9px] font-medium text-slate-500 mb-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Present</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span>Absent</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400 inline-block"></span>Late</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-300 inline-block"></span>Half Day</span>
          </div>
          <p className="text-[9px] text-slate-500 font-medium mb-1">Last 7 Days <span className="float-right text-slate-400">14 May 2024 - 21 May 2024</span></p>
          <div className="flex gap-1 mb-3">
            {["M","T","W","T","F","S"].map((d,i)=>(
              <div key={i} className={`flex-1 py-1 text-[9px] font-black text-center rounded ${i<5?"bg-blue-500 text-white":"bg-slate-100 text-slate-400"}`}>{d}</div>
            ))}
          </div>
          <div className="flex justify-center mb-3">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="4"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="75 100" strokeLinecap="round"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="15 100" strokeDashoffset="-75" strokeLinecap="round"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="7 100" strokeDashoffset="-90" strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-black text-slate-700">Attendance</span>
                <span className="text-xl font-black text-blue-600">95%</span>
              </div>
            </div>
          </div>
          <p className="text-[9px] text-slate-500 text-center mb-2">No of total working days <span className="font-bold text-slate-700">28 Days</span></p>
          <div className="grid grid-cols-4 text-center text-[9px]">
            {[{l:"Present",v:25},{l:"Absent",v:2},{l:"Halfday",v:0},{l:"Late",v:1}].map((s,i)=>(
              <div key={i}><span className="block text-base font-black text-slate-800">{s.v}</span><span className="text-slate-400">{s.l}</span></div>
            ))}
          </div>
        </div>

        {/* Best Performers */}
        <div className="col-span-3 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-700">Best Performers</h3>
            <span className="text-[9px] text-slate-500 border border-slate-200 px-2 py-0.5 rounded-lg flex items-center gap-1">This Month <ChevronDown size={10}/></span>
          </div>
          <div className="space-y-3 mb-4">
            {bestPerformers.map((b,i)=>(
              <div key={i}>
                <div className="flex justify-between text-[10px] font-medium text-slate-600 mb-1">
                  <span>{b.cls}</span><span>{b.pct}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${b.color} rounded-full`} style={{width:`${b.pct}%`}}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-700">Student Progress</h3>
            <span className="text-[9px] text-blue-500 font-medium flex items-center gap-1">⭐ Top Performer <ChevronDown size={10}/></span>
          </div>
          <div className="space-y-2">
            {students.map((s,i)=>(
              <div key={i} className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-xl">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}`} className="w-8 h-8 rounded-full bg-slate-100" alt=""/>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-slate-800 truncate">{s.name}</p>
                  <p className="text-[9px] text-slate-400">{s.cls}</p>
                </div>
                <span className={`${s.color} text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full`}>{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="col-span-3 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <h3 className="text-xs font-bold text-slate-700 mb-3">Upcoming Events</h3>
          <div className="space-y-3">
            {events.map((e,i)=>(
              <div key={i} className={`border-l-4 ${e.color} pl-3 py-1`}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold text-slate-700">{e.title}</span>
                </div>
                <p className="text-[9px] text-slate-500">📅 {e.date}</p>
                <p className="text-[9px] text-slate-400">🕘 09:10AM - 10:50PM</p>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder for alignment */}
        <div className="col-span-3"></div>
      </div>

      {/* Syllabus / Lesson Plan */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-700">Syllabus / Lesson Plan</h3>
          <div className="flex gap-1">
            <ChevronLeft size={14} className="cursor-pointer text-slate-400 hover:text-blue-500"/>
            <ChevronRight size={14} className="cursor-pointer text-slate-400 hover:text-blue-500"/>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {syllabus.map((s,i)=>(
            <div key={i} className="border border-slate-100 rounded-xl p-3 hover:shadow-md transition-all">
              <div className="bg-slate-800 text-white text-[9px] font-bold px-2 py-0.5 rounded-lg inline-block mb-2">{s.cls}</div>
              <p className="text-[10px] font-medium text-slate-700 mb-2 leading-snug">{s.topic}</p>
              <div className="h-1 bg-blue-200 rounded-full mb-2"><div className="h-full bg-blue-500 rounded-full" style={{width:"60%"}}></div></div>
              <div className="flex gap-2 text-[9px] text-blue-500 font-medium">
                <button className="hover:underline">↻ Reschedule</button>
                <button className="hover:underline">🔗 Share</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row: Notice Board + Leave Status + Activities */}
      <div className="grid grid-cols-12 gap-4">
        {/* Notice Board */}
        <div className="col-span-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-700">Notice Board</h3>
            <button className="text-[9px] text-blue-500 font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-2">
            {notices.map((n,i)=>(
              <div key={i} className="flex items-start gap-2.5 p-2 hover:bg-slate-50 rounded-xl cursor-pointer">
                <div className={`w-7 h-7 ${n.color} rounded-lg flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold`}>N</div>
                <div>
                  <p className="text-[10px] font-medium text-slate-700 leading-snug">{n.text}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leave Status */}
        <div className="col-span-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-700">Leave Status</h3>
            <div className="flex items-center gap-2">
              <button className="text-[9px] text-blue-500 font-bold border border-blue-200 px-2 py-0.5 rounded-lg hover:bg-blue-50">Apply Leave</button>
              <span className="text-[9px] text-slate-400 border border-slate-200 px-2 py-0.5 rounded-lg flex items-center gap-1">This Year <ChevronDown size={10}/></span>
            </div>
          </div>
          <div className="flex gap-3 border-b border-slate-100 mb-3">
            <button onClick={()=>setActiveLeaveTab("approval")} className={`text-[10px] font-bold pb-2 ${activeLeaveTab==="approval"?"text-blue-600 border-b-2 border-blue-600":"text-slate-400"}`}>Approval Status</button>
            <button onClick={()=>setActiveLeaveTab("holidays")} className={`text-[10px] font-bold pb-2 ${activeLeaveTab==="holidays"?"text-blue-600 border-b-2 border-blue-600":"text-slate-400"}`}>Holidays</button>
          </div>
          <div className="space-y-2.5">
            {leaves.map((l,i)=>(
              <div key={i}>
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-[10px] font-bold text-slate-700">{l.type}</p>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${l.statusColor}`}>{l.status}</span>
                </div>
                <p className="text-[9px] text-slate-400">Applied : {l.applied} &nbsp; Leave : {l.leave}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div className="col-span-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-700">Activities</h3>
            <span className="text-[9px] text-slate-400 border border-slate-200 px-2 py-0.5 rounded-lg flex items-center gap-1">2024 - 2025 <ChevronDown size={10}/></span>
          </div>
          <div className="flex gap-3 border-b border-slate-100 mb-3">
            {["Library","Transports","Reports","Payslip"].map(t=>(
              <button key={t} onClick={()=>setActiveActivityTab(t.toLowerCase())} className={`text-[10px] font-bold pb-2 ${activeActivityTab===t.toLowerCase()?"text-blue-600 border-b-2 border-blue-600":"text-slate-400"}`}>{t}</button>
            ))}
          </div>
          <div className="space-y-2">
            {reports.map((r,i)=>(
              <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-7 h-7 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-blue-500"><FileText size={13}/></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-slate-700 truncate">{r.title}</p>
                  {r.date && <p className="text-[9px] text-slate-400">{r.date}</p>}
                </div>
                <Download size={12} className="text-slate-300 hover:text-blue-500 cursor-pointer"/>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 py-2 bg-blue-600 text-white text-[10px] font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-1">
            <Upload size={12}/> Upload New Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
