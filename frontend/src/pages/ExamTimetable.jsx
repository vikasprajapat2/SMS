import React, { useState } from "react";
import { 
  Search, Filter, Download, Printer, Plus, 
  Calendar, Clock, BookOpen, MapPin, 
  ChevronRight, MoreVertical, FileText, 
  ArrowRight, CheckCircle2, AlertCircle, X
} from "lucide-react";

const INITIAL_EXAMS = [
  { id: 1, subject: "Mathematics", date: "2024-05-15", time: "09:00 AM - 12:00 PM", marks: 100, room: "Lab 1", status: "Upcoming" },
  { id: 2, subject: "Physics", date: "2024-05-17", time: "09:00 AM - 12:00 PM", marks: 100, room: "Lab 2", status: "Upcoming" },
  { id: 3, subject: "Chemistry", date: "2024-05-19", time: "09:00 AM - 12:00 PM", marks: 100, room: "Hall A", status: "Upcoming" },
  { id: 4, subject: "English Literature", date: "2024-05-21", time: "09:00 AM - 12:00 PM", marks: 80, room: "Room 102", status: "Upcoming" },
  { id: 5, subject: "Computer Science", date: "2024-05-23", time: "10:00 AM - 01:00 PM", marks: 70, room: "IT Lab", status: "Upcoming" },
];

const ExamTimetable = () => {
  const [selectedClass, setSelectedClass] = useState("10th - A");
  const [selectedTerm, setSelectedTerm] = useState("Annual Examination");
  const [showModal, setShowModal] = useState(false);
  const [exams, setExams] = useState(INITIAL_EXAMS);
  const [formData, setFormData] = useState({
    subject: "",
    date: "",
    time: "",
    marks: "",
    room: ""
  });

  const handleAddExam = (e) => {
    e.preventDefault();
    const newExam = {
      id: exams.length + 1,
      ...formData,
      status: "Upcoming"
    };
    setExams([...exams, newExam]);
    setShowModal(false);
    setFormData({ subject: "", date: "", time: "", marks: "", room: "" });
  };

  const totalMarks = exams.reduce((acc, curr) => acc + parseInt(curr.marks || 0), 0);
  const startDate = exams.length > 0 ? new Date(Math.min(...exams.map(e => new Date(e.date)))).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : "---";
  const endDate = exams.length > 0 ? new Date(Math.max(...exams.map(e => new Date(e.date)))).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : "---";

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Premium Header Section */}
      <div className="bg-white border-b border-slate-200 px-10 py-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">
                <FileText size={12}/> Academic Records
              </div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-4">
                Exam Time Table
                <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full uppercase tracking-tighter">Live for May 2024</span>
              </h1>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-black rounded-xl transition-all border border-slate-200">
                <Printer size={14}/> Print PDF
              </button>
              <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-indigo-200">
                <Plus size={16}/> Create New Schedule
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
              {["10th - A", "10th - B", "12th - Sci", "12th - Com"].map(cls => (
                <button key={cls} onClick={() => setSelectedClass(cls)}
                  className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${selectedClass === cls ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}>
                  {cls}
                </button>
              ))}
            </div>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-black text-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all outline-none">
              <option>Unit Test 1</option>
              <option>Half Yearly</option>
              <option>Annual Examination</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-10 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Exams", value: `${exams.length.toString().padStart(2, '0')} Subjects`, icon: BookOpen, color: "bg-blue-500" },
            { label: "Exam Period", value: `${startDate} - ${endDate}`, icon: Calendar, color: "bg-indigo-500" },
            { label: "Total Marks", value: `${totalMarks} Marks`, icon: CheckCircle2, color: "bg-emerald-500" },
            { label: "Status", value: "Schedule Confirmed", icon: AlertCircle, color: "bg-orange-500" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex items-center gap-5">
              <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                <stat.icon size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                <p className="text-lg font-black text-slate-800 leading-none">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Timetable Table */}
        <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date & Day</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Timing</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Marks</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Room</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {exams.map((exam) => (
                <tr key={exam.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex flex-col items-center justify-center shrink-0">
                        <span className="text-[8px] font-black uppercase leading-none">{new Date(exam.date).toLocaleString('default', { weekday: 'short' })}</span>
                        <span className="text-sm font-black leading-none">{exam.date.split("-")[2]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{new Date(exam.date).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                        <BookOpen size={16}/>
                      </div>
                      <span className="text-sm font-black text-slate-800">{exam.subject}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black">
                        <Clock size={12}/> {exam.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-center">
                      <span className="text-sm font-black text-slate-800">{exam.marks}</span>
                      <span className="text-[10px] font-bold text-slate-400 ml-1">Total</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-2 text-slate-500 font-bold text-xs">
                      <MapPin size={12} className="text-slate-400"/> {exam.room}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-400 hover:text-indigo-600">
                      <MoreVertical size={18}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="bg-slate-50 px-8 py-5 flex items-center justify-between border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 italic">* Students must arrive 30 minutes before the scheduled exam time.</p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">
                View Guidelines <ArrowRight size={12}/>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Instructions Card */}
      <div className="max-w-[1600px] mx-auto px-10 pb-12">
        <div className="bg-indigo-900 rounded-[40px] p-10 text-white flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-2">Important Instructions</h3>
            <p className="text-indigo-200 text-sm font-medium max-w-xl mb-6">Please ensure all students have their admit cards. Electronic devices are strictly prohibited in the examination hall.</p>
            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div> Admit Card Required
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div> ID Verification
              </div>
            </div>
          </div>
          <button className="relative z-10 bg-white text-indigo-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all">
            Download Admit Cards
          </button>
        </div>
      </div>

      {/* Create Exam Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="bg-indigo-600 px-8 py-6 flex justify-between items-center text-white">
              <div>
                <h2 className="text-xl font-black">Create Exam Schedule</h2>
                <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mt-1">Add new subject to {selectedClass}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddExam} className="p-8 space-y-5">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Subject Name</label>
                <input required type="text" placeholder="e.g. Higher Mathematics" 
                  value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Exam Date</label>
                  <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Maximum Marks</label>
                  <input required type="number" placeholder="e.g. 100" 
                    value={formData.marks} onChange={e => setFormData({...formData, marks: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Exam Timing</label>
                  <input required type="text" placeholder="e.g. 09:00 AM - 12:00 PM" 
                    value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Room Number</label>
                  <input required type="text" placeholder="e.g. Lab 4 / Hall B" 
                    value={formData.room} onChange={e => setFormData({...formData, room: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all" />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-500 py-4 rounded-2xl font-bold text-sm transition-all">Cancel</button>
                <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 transition-all">Publish Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamTimetable;
