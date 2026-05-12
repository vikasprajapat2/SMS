import React, { useState, useEffect, useCallback } from "react";
import {
  Search, Printer, Plus, Calendar, Clock,
  BookOpen, MapPin, FileText, CheckCircle2,
  AlertCircle, X, Edit2, Trash2, ChevronDown, Check, Loader2
} from "lucide-react";
import { examTimetableService } from "../services/api";

const CLASS_GROUPS = [
  { label: "Pre-Primary",  options: ["Nursery - A","Nursery - B","LKG - A","LKG - B","UKG - A","UKG - B"] },
  { label: "Primary (1–5)", options: ["1st - A","1st - B","2nd - A","2nd - B","3rd - A","3rd - B","4th - A","4th - B","5th - A","5th - B"] },
  { label: "Middle (6–8)",  options: ["6th - A","6th - B","7th - A","7th - B","8th - A","8th - B"] },
  { label: "Secondary (9–10)", options: ["9th - A","9th - B","10th - A","10th - B"] },
  { label: "Sr. Secondary (11–12)", options: ["11th - Sci","11th - Com","11th - Arts","12th - Sci","12th - Com","12th - Arts"] },
];
const CLASSES = CLASS_GROUPS.flatMap(g => g.options);
const TERMS   = ["Unit Test 1", "Unit Test 2", "Half Yearly", "Pre-Board", "Annual Examination"];

const SUBJECT_COLORS = [
  "bg-indigo-100 text-indigo-700", "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",       "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",   "bg-rose-100 text-rose-700",
  "bg-fuchsia-100 text-fuchsia-700","bg-teal-100 text-teal-700",
];

const getStatus = (dateStr) => {
  const today = new Date(); today.setHours(0,0,0,0);
  const d = new Date(dateStr + "T00:00:00"); d.setHours(0,0,0,0);
  if (d < today) return "Completed";
  if (d.getTime() === today.getTime()) return "Today";
  return "Upcoming";
};

const statusStyle = {
  Upcoming:  "bg-indigo-50 text-indigo-600",
  Today:     "bg-amber-50  text-amber-600",
  Completed: "bg-emerald-50 text-emerald-600",
};

const EMPTY_FORM = { subject: "", date: "", start_time: "09:00", end_time: "12:00", marks: "", room: "" };

export default function ExamTimetable() {
  const [selectedClass, setSelectedClass] = useState(CLASSES[0]);
  const [selectedTerm,  setSelectedTerm]  = useState(TERMS[2]);
  const [exams,         setExams]         = useState([]);
  const [loading,       setLoading]       = useState(false);
  const [saving,        setSaving]        = useState(false);
  const [showModal,     setShowModal]     = useState(false);
  const [editingExam,   setEditingExam]   = useState(null);
  const [formData,      setFormData]      = useState(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search,        setSearch]        = useState("");
  const [error,         setError]         = useState("");

  /* ── Color map ── */
  const buildColorMap = (list) => {
    const map = {};
    let idx = 0;
    list.forEach(e => { if (!map[e.subject]) { map[e.subject] = SUBJECT_COLORS[idx % SUBJECT_COLORS.length]; idx++; } });
    return map;
  };
  const [subjectColors, setSubjectColors] = useState({});

  /* ── Fetch ── */
  const fetchExams = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await examTimetableService.getAll(selectedClass, selectedTerm);
      setExams(res.data);
      setSubjectColors(buildColorMap(res.data));
    } catch (err) {
      setError("Could not load exams. Is the backend running?");
      setExams([]);
    } finally {
      setLoading(false);
    }
  }, [selectedClass, selectedTerm]);

  useEffect(() => { fetchExams(); }, [fetchExams]);

  /* ── Handlers ── */
  const openAdd  = () => { setEditingExam(null); setFormData(EMPTY_FORM); setShowModal(true); };
  const openEdit = (exam) => { setEditingExam(exam); setFormData({ ...exam }); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditingExam(null); setFormData(EMPTY_FORM); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...formData, class_name: selectedClass, term: selectedTerm, marks: Number(formData.marks) };
      if (editingExam) {
        await examTimetableService.update(editingExam.id, payload);
      } else {
        await examTimetableService.create(payload);
      }
      await fetchExams();
      closeModal();
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await examTimetableService.remove(id);
      await fetchExams();
    } catch {
      setError("Failed to delete. Please try again.");
    }
    setDeleteConfirm(null);
  };

  /* ── Derived ── */
  const filtered = exams
    .filter(e => e.subject?.toLowerCase().includes(search.toLowerCase()) || e.room?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const totalMarks = exams.reduce((a, e) => a + Number(e.marks || 0), 0);
  const datesArr   = exams.map(e => new Date(e.date + "T00:00:00")).filter(Boolean);
  const startDate  = datesArr.length ? new Date(Math.min(...datesArr)).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) : "—";
  const endDate    = datesArr.length ? new Date(Math.max(...datesArr)).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) : "—";
  const upcoming   = exams.filter(e => getStatus(e.date) === "Upcoming").length;
  const completed  = exams.filter(e => getStatus(e.date) === "Completed").length;

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* ── Header ── */}
      <div className="bg-white border-b border-slate-200 px-6 lg:px-10 py-8 print:hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">
                <FileText size={12} /> Academic Records
              </div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight flex flex-wrap items-center gap-3">
                Exam Timetable
                <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full">{selectedTerm}</span>
              </h1>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-black rounded-xl transition-all border border-slate-200">
                <Printer size={14} /> Print
              </button>
              <button onClick={openAdd}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-indigo-200">
                <Plus size={16} /> Add Exam
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Class Dropdown */}
            <div className="relative">
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-xl pl-4 pr-9 py-2.5 text-xs font-black text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none min-w-[160px]">
                {CLASS_GROUPS.map(group => (
                  <optgroup key={group.label} label={group.label}>
                    {group.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </optgroup>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
            </div>
            {/* Term Dropdown */}
            <div className="relative">
              <select value={selectedTerm} onChange={e => setSelectedTerm(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-xl pl-4 pr-9 py-2.5 text-xs font-black text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none">
                {TERMS.map(t => <option key={t}>{t}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
            </div>
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2.5 ml-auto">
              <Search size={14} className="text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search subject or room..."
                className="text-xs font-bold text-slate-600 outline-none bg-transparent w-40 lg:w-52" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-8">

        {/* Error banner */}
        {error && (
          <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-600 text-sm font-bold px-5 py-3 rounded-2xl flex items-center justify-between">
            {error}
            <button onClick={() => setError("")}><X size={16} /></button>
          </div>
        )}

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { label: "Total Exams",  value: `${exams.length.toString().padStart(2,"0")} Subjects`, icon: BookOpen,     color: "bg-blue-500"    },
            { label: "Exam Period",  value: `${startDate} – ${endDate}`,                           icon: Calendar,     color: "bg-indigo-500"  },
            { label: "Total Marks",  value: `${totalMarks} Marks`,                                 icon: CheckCircle2, color: "bg-emerald-500" },
            { label: "Upcoming",     value: `${upcoming} Remaining`,                               icon: AlertCircle,  color: "bg-amber-500"   },
          ].map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-[28px] border border-slate-200 shadow-sm flex items-center gap-4">
              <div className={`${s.color} w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0`}>
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{s.label}</p>
                <p className="text-base font-black text-slate-800 leading-none">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Table ── */}
        {loading ? (
          <div className="bg-white rounded-[32px] border border-slate-200 p-16 flex flex-col items-center gap-4">
            <Loader2 size={32} className="text-indigo-400 animate-spin" />
            <p className="text-slate-400 font-bold text-sm">Loading timetable from Supabase…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-[32px] border border-slate-200 p-16 text-center">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText size={28} className="text-indigo-300" />
            </div>
            <p className="text-slate-400 font-bold">No exams scheduled yet for <strong>{selectedClass}</strong> — {selectedTerm}</p>
            <button onClick={openAdd}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-xs font-black rounded-xl">
              <Plus size={14} /> Add First Exam
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/60 border-b border-slate-100">
                    {["Date & Day","Subject","Timing","Marks","Room","Status","Actions"].map(h => (
                      <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map(exam => {
                    const status = getStatus(exam.date);
                    const color  = subjectColors[exam.subject] || SUBJECT_COLORS[0];
                    return (
                      <tr key={exam.id} className="hover:bg-slate-50/60 transition-all group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex flex-col items-center justify-center shrink-0">
                              <span className="text-[7px] font-black uppercase">{new Date(exam.date+"T00:00:00").toLocaleString("default",{weekday:"short"})}</span>
                              <span className="text-sm font-black leading-none">{exam.date?.split("-")[2]}</span>
                            </div>
                            <p className="text-xs font-black text-slate-700 whitespace-nowrap">
                              {new Date(exam.date+"T00:00:00").toLocaleString("default",{month:"long",year:"numeric"})}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-3 py-1 rounded-lg text-xs font-black ${color}`}>{exam.subject}</span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg text-[10px] font-black text-slate-600 whitespace-nowrap w-fit">
                            <Clock size={11} /> {exam.start_time} – {exam.end_time}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-sm font-black text-slate-800">{exam.marks}</span>
                          <span className="text-[10px] font-bold text-slate-400 ml-1">pts</span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-1.5 text-slate-500 font-bold text-xs whitespace-nowrap">
                            <MapPin size={11} className="text-slate-400" /> {exam.room}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black ${statusStyle[status]}`}>{status}</span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-1">
                            <button onClick={() => openEdit(exam)}
                              className="p-2 hover:bg-indigo-50 rounded-lg transition-all text-slate-400 hover:text-indigo-600">
                              <Edit2 size={15} />
                            </button>
                            <button onClick={() => setDeleteConfirm(exam.id)}
                              className="p-2 hover:bg-rose-50 rounded-lg transition-all text-slate-400 hover:text-rose-500">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 px-8 py-4 flex items-center justify-between border-t border-slate-100">
              <p className="text-xs font-bold text-slate-400 italic">* Arrive 30 minutes early. Admit card required.</p>
              <div className="flex items-center gap-4 text-[10px] font-black text-slate-400">
                <span className="text-emerald-600">{completed} Completed</span>
                <span className="text-indigo-600">{upcoming} Upcoming</span>
              </div>
            </div>
          </div>
        )}

        {/* Info Banner */}
        <div className="bg-indigo-900 rounded-[32px] p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-8 relative overflow-hidden print:hidden">
          <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full blur-3xl -mr-24 -mt-24" />
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-1">Important Instructions</h3>
            <p className="text-indigo-200 text-sm font-medium max-w-xl">
              All students must carry their admit cards. Electronic devices are strictly prohibited in the examination hall.
            </p>
          </div>
          <button className="relative z-10 shrink-0 bg-white text-indigo-900 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all">
            Download Admit Cards
          </button>
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-6 flex justify-between items-center text-white">
              <div>
                <h2 className="text-xl font-black">{editingExam ? "Edit Exam" : "Add Exam"}</h2>
                <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mt-1">
                  {selectedClass} — {selectedTerm}
                </p>
              </div>
              <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-xl transition-all"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Subject Name</label>
                <input required type="text" placeholder="e.g. Higher Mathematics"
                  value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Exam Date</label>
                  <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Max Marks</label>
                  <input required type="number" placeholder="100"
                    value={formData.marks} onChange={e => setFormData({...formData, marks: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Start Time</label>
                  <input required type="time" value={formData.start_time} onChange={e => setFormData({...formData, start_time: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">End Time</label>
                  <input required type="time" value={formData.end_time} onChange={e => setFormData({...formData, end_time: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Room / Hall</label>
                <input required type="text" placeholder="e.g. Hall A / Lab 2"
                  value={formData.room} onChange={e => setFormData({...formData, room: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-500 py-3.5 rounded-2xl font-bold text-sm transition-all">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                  {editingExam ? "Save Changes" : "Add Exam"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] w-full max-w-sm shadow-2xl p-8 text-center">
            <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-rose-500" />
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-2">Delete Exam?</h3>
            <p className="text-slate-400 text-sm font-medium mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-500 py-3 rounded-2xl font-bold text-sm transition-all">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-2xl font-bold text-sm transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
