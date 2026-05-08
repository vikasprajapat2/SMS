import React, { useState } from "react";
import { 
  ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, 
  Clock, MapPin, Users, MoreHorizontal, CheckCircle2,
  AlertCircle, Star, Filter, Search, Download, Printer, X
} from "lucide-react";

const EVENT_TYPES = {
  EXAM: { color: "bg-red-500", text: "text-red-600", light: "bg-red-50", label: "Examination" },
  EVENT: { color: "bg-blue-500", text: "text-blue-600", light: "bg-blue-50", label: "School Event" },
  HOLIDAY: { color: "bg-emerald-500", text: "text-emerald-600", light: "bg-emerald-50", label: "Public Holiday" },
  MEETING: { color: "bg-purple-500", text: "text-purple-600", light: "bg-purple-50", label: "Parent Meet" },
};

const INITIAL_EVENTS = [
  { id: 1, title: "Final Semester Exam", type: "EXAM", date: "2024-05-15", time: "09:00 AM", location: "Main Hall" },
  { id: 2, title: "Summer Vacation Starts", type: "HOLIDAY", date: "2024-05-24", time: "All Day", location: "Campus" },
  { id: 3, title: "Annual Sports Day", type: "EVENT", date: "2024-05-10", time: "08:00 AM", location: "Sports Ground" },
  { id: 4, title: "Staff Meeting", type: "MEETING", date: "2024-05-08", time: "02:30 PM", location: "Conference Room" },
  { id: 5, title: "Parent-Teacher Meet", type: "MEETING", date: "2024-05-20", time: "10:00 AM", location: "Auditorium" },
];

const HOURS = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState("MONTH"); // MONTH, WEEK, DAY
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [formData, setFormData] = useState({
    title: "", type: "EVENT", date: "", time: "", location: ""
  });

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const prev = () => {
    if (viewMode === "MONTH") setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    else if (viewMode === "WEEK") setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
    else setCurrentDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000));
  };

  const next = () => {
    if (viewMode === "MONTH") setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    else if (viewMode === "WEEK") setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
    else setCurrentDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    setEvents([...events, { ...formData, id: events.length + 1 }]);
    setShowModal(false);
    setFormData({ title: "", type: "EVENT", date: "", time: "", location: "" });
  };

  const getWeekDays = (date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const renderMonthView = () => {
    const daysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
    const firstDay = new Date(year, currentDate.getMonth(), 1).getDay();
    const totalDays = daysInMonth(currentDate.getMonth(), year);
    const grid = [];

    for (let i = 0; i < firstDay; i++) grid.push(<div key={`p-${i}`} className="h-32 border-b border-r border-slate-100 bg-slate-50/30"></div>);
    for (let d = 1; d <= totalDays; d++) {
      const dStr = `${year}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}-${d.toString().padStart(2, "0")}`;
      const dEvents = events.filter(e => e.date === dStr);
      const isToday = d === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && year === new Date().getFullYear();
      grid.push(
        <div key={d} className="h-32 border-b border-r border-slate-100 p-2 hover:bg-indigo-50/30 transition-all cursor-pointer bg-white group">
          <div className="flex justify-between items-start">
            <span className={`text-xs font-black w-7 h-7 flex items-center justify-center rounded-full ${isToday ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "text-slate-400"}`}>{d}</span>
            {dEvents.length > 0 && <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>}
          </div>
          <div className="mt-2 space-y-1">
            {dEvents.slice(0, 2).map(e => (
              <div key={e.id} className={`${EVENT_TYPES[e.type].light} ${EVENT_TYPES[e.type].text} px-2 py-0.5 rounded text-[8px] font-black truncate border border-slate-100/50`}>{e.title}</div>
            ))}
          </div>
        </div>
      );
    }
    return <div className="grid grid-cols-7 border-l border-t border-slate-100">{grid}</div>;
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    return (
      <div className="flex flex-col overflow-hidden h-[600px]">
        <div className="grid grid-cols-8 border-b border-slate-100 bg-slate-50">
          <div className="p-4 border-r border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</div>
          {weekDays.map(d => (
            <div key={d} className="p-4 text-center border-r border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase">{d.toLocaleDateString('en-US', { weekday: 'short' })}</p>
              <p className={`text-sm font-black ${d.getDate() === new Date().getDate() ? 'text-indigo-600' : 'text-slate-800'}`}>{d.getDate()}</p>
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          {HOURS.map(h => (
            <div key={h} className="grid grid-cols-8 border-b border-slate-100 group">
              <div className="p-4 border-r border-slate-100 text-[10px] font-black text-slate-400">{h}:00 {h >= 12 ? 'PM' : 'AM'}</div>
              {weekDays.map(d => {
                const dStr = d.toISOString().split('T')[0];
                const hEvents = events.filter(e => e.date === dStr && e.time.includes(`${h}:`) || (h === 9 && e.time.includes('09:')));
                return (
                  <div key={d} className="border-r border-slate-100 min-h-[60px] p-1 bg-white group-hover:bg-slate-50/50 transition-all">
                    {hEvents.map(e => (
                      <div key={e.id} className={`${EVENT_TYPES[e.type].light} ${EVENT_TYPES[e.type].text} p-1.5 rounded-lg text-[9px] font-black border border-slate-100 mb-1 shadow-sm`}>{e.title}</div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dStr = currentDate.toISOString().split('T')[0];
    return (
      <div className="flex flex-col h-[600px]">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{currentDate.toLocaleDateString('en-US', { weekday: 'long' })}</p>
            <h3 className="text-2xl font-black text-slate-800">{currentDate.getDate()} {monthName}</h3>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-[10px] font-black uppercase">Schedule</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {HOURS.map(h => {
            const hEvents = events.filter(e => e.date === dStr && e.time.includes(`${h}:`) || (h === 9 && e.time.includes('09:')));
            return (
              <div key={h} className="flex border-b border-slate-100 group hover:bg-slate-50 transition-all">
                <div className="w-24 p-6 border-r border-slate-100 text-[10px] font-black text-slate-400">{h}:00 {h >= 12 ? 'PM' : 'AM'}</div>
                <div className="flex-1 p-4 flex gap-3 flex-wrap">
                  {hEvents.length > 0 ? hEvents.map(e => (
                    <div key={e.id} className={`${EVENT_TYPES[e.type].light} ${EVENT_TYPES[e.type].text} p-4 rounded-2xl border border-slate-100 shadow-sm min-w-[200px]`}>
                      <p className="text-[10px] font-black uppercase opacity-60 mb-1">{EVENT_TYPES[e.type].label}</p>
                      <h4 className="text-sm font-black mb-2">{e.title}</h4>
                      <div className="flex items-center gap-3 text-[10px] font-bold opacity-70">
                        <span className="flex items-center gap-1"><Clock size={12}/> {e.time}</span>
                        <span className="flex items-center gap-1"><MapPin size={12}/> {e.location}</span>
                      </div>
                    </div>
                  )) : <div className="text-slate-200 flex items-center italic text-[10px] font-medium">No schedule</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="bg-white border-b border-slate-200 px-10 py-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">Academic Calendar</h1>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Schedule exams, holidays and events</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-indigo-200"><Plus size={16}/> Create Event</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <button onClick={prev} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"><ChevronLeft size={20}/></button>
                <h2 className="text-xl font-black text-slate-800 min-w-[150px] text-center">{monthName} {year}</h2>
                <button onClick={next} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"><ChevronRight size={20}/></button>
              </div>
              <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
                {["MONTH", "WEEK", "DAY"].map(v => (
                  <button key={v} onClick={() => setViewMode(v)} className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${viewMode === v ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}>{v}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-10 py-8 grid grid-cols-4 gap-8">
        <div className="col-span-3 bg-white rounded-[32px] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
          {viewMode === "MONTH" && renderMonthView()}
          {viewMode === "WEEK" && renderWeekView()}
          {viewMode === "DAY" && renderDayView()}
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm max-h-[600px] overflow-y-auto">
            <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center justify-between sticky top-0 bg-white">Upcoming Events</h3>
            <div className="space-y-4">
              {events.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 5).map(e => (
                <div key={e.id} className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 transition-all cursor-pointer border border-transparent hover:border-indigo-100">
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 ${EVENT_TYPES[e.type].color} text-white`}>
                      <span className="text-[10px] font-black uppercase opacity-70">{new Date(e.date).toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-lg font-black">{e.date.split("-")[2]}</span>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-slate-800 truncate">{e.title}</h4>
                      <p className="text-[9px] font-bold text-slate-400 mt-1 flex items-center gap-1"><Clock size={10}/> {e.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="bg-indigo-600 px-8 py-6 flex justify-between items-center text-white">
              <h2 className="text-xl font-black">Create New Event</h2>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddEvent} className="p-8 space-y-5">
              <input required type="text" placeholder="Event Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500" />
              <div className="grid grid-cols-2 gap-5">
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500">
                  {Object.entries(EVENT_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
                <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <input required type="text" placeholder="Time (e.g. 10:00 AM)" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500" />
                <input required type="text" placeholder="Location" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500" />
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 transition-all">Create Event</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
