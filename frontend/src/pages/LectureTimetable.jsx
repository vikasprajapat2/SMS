import React, { useState, useEffect, useCallback } from "react";
import {
  CalendarDays, Clock, BookOpen, User, MapPin,
  Plus, X, Edit2, Trash2, Printer, Check, GraduationCap, Loader2, ChevronDown
} from "lucide-react";
import { lectureTimetableService } from "../services/api";

const CLASS_GROUPS = [
  { label: "Pre-Primary",        options: ["Nursery - A","Nursery - B","LKG - A","LKG - B","UKG - A","UKG - B"] },
  { label: "Primary (1–5)",      options: ["1st - A","1st - B","2nd - A","2nd - B","3rd - A","3rd - B","4th - A","4th - B","5th - A","5th - B"] },
  { label: "Middle (6–8)",       options: ["6th - A","6th - B","7th - A","7th - B","8th - A","8th - B"] },
  { label: "Secondary (9–10)",   options: ["9th - A","9th - B","10th - A","10th - B"] },
  { label: "Sr. Secondary (11–12)", options: ["11th - Sci","11th - Com","11th - Arts","12th - Sci","12th - Com","12th - Arts"] },
];
const CLASSES = CLASS_GROUPS.flatMap(g => g.options);
const DAYS    = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const PERIODS = [1,2,3,4,5,6,7,8];
const TIMES   = [
  "07:30–08:20","08:20–09:10","09:10–10:00","10:20–11:10",
  "11:10–12:00","12:00–12:50","13:30–14:20","14:20–15:10",
];

const PALETTE = [
  { bg:"bg-indigo-500",   light:"bg-indigo-50",   text:"text-indigo-700",  border:"border-indigo-200"  },
  { bg:"bg-violet-500",   light:"bg-violet-50",   text:"text-violet-700",  border:"border-violet-200"  },
  { bg:"bg-sky-500",      light:"bg-sky-50",       text:"text-sky-700",     border:"border-sky-200"     },
  { bg:"bg-emerald-500",  light:"bg-emerald-50",  text:"text-emerald-700", border:"border-emerald-200" },
  { bg:"bg-amber-500",    light:"bg-amber-50",    text:"text-amber-700",   border:"border-amber-200"   },
  { bg:"bg-rose-500",     light:"bg-rose-50",     text:"text-rose-700",    border:"border-rose-200"    },
  { bg:"bg-fuchsia-500",  light:"bg-fuchsia-50",  text:"text-fuchsia-700", border:"border-fuchsia-200" },
  { bg:"bg-teal-500",     light:"bg-teal-50",     text:"text-teal-700",    border:"border-teal-200"    },
  { bg:"bg-orange-500",   light:"bg-orange-50",   text:"text-orange-700",  border:"border-orange-200"  },
  { bg:"bg-cyan-500",     light:"bg-cyan-50",     text:"text-cyan-700",    border:"border-cyan-200"    },
];

const EMPTY_FORM = { subject: "", teacher: "", room: "" };

/* Convert flat API rows → nested { day: { period: rowObj } } */
const rowsToGrid = (rows) => {
  const grid = {};
  rows.forEach(row => {
    if (!grid[row.day]) grid[row.day] = {};
    grid[row.day][row.period] = row;
  });
  return grid;
};

/* Build subject → palette map from grid */
const buildColorMap = (grid) => {
  const subjects = new Set();
  Object.values(grid).forEach(dayObj =>
    Object.values(dayObj).forEach(cell => { if (cell?.subject) subjects.add(cell.subject); })
  );
  const map = {};
  Array.from(subjects).forEach((s, i) => { map[s] = PALETTE[i % PALETTE.length]; });
  return map;
};

export default function LectureTimetable() {
  const [selectedClass, setSelectedClass] = useState(CLASSES[0]);
  const [grid,          setGrid]          = useState({});
  const [loading,       setLoading]       = useState(false);
  const [saving,        setSaving]        = useState(false);
  const [modal,         setModal]         = useState(null);
  const [form,          setForm]          = useState(EMPTY_FORM);
  const [deleteTarget,  setDeleteTarget]  = useState(null);
  const [colorMap,      setColorMap]      = useState({});
  const [error,         setError]         = useState("");

  /* ── Fetch ── */
  const fetchGrid = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await lectureTimetableService.getAll(selectedClass);
      const g = rowsToGrid(res.data);
      setGrid(g);
      setColorMap(buildColorMap(g));
    } catch {
      setError("Could not load timetable. Is the backend running?");
      setGrid({});
    } finally {
      setLoading(false);
    }
  }, [selectedClass]);

  useEffect(() => { fetchGrid(); }, [fetchGrid]);

  /* ── Helpers ── */
  const getCell   = (day, period) => grid[day]?.[period] || null;

  const openModal = (day, period) => {
    const existing = getCell(day, period);
    setForm(existing ? { subject: existing.subject, teacher: existing.teacher || "", room: existing.room || "" } : EMPTY_FORM);
    setModal({ day, period });
  };
  const closeModal = () => { setModal(null); setForm(EMPTY_FORM); };

  /* ── Save (upsert) ── */
  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.subject.trim()) return;
    setSaving(true);
    try {
      await lectureTimetableService.upsert({
        class_name: selectedClass,
        day:        modal.day,
        period:     modal.period,
        subject:    form.subject,
        teacher:    form.teacher,
        room:       form.room,
      });
      await fetchGrid();
      closeModal();
    } catch {
      setError("Failed to save period. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  /* ── Clear ── */
  const handleClear = async (day, period) => {
    try {
      await lectureTimetableService.remove(selectedClass, day, period);
      await fetchGrid();
    } catch {
      setError("Failed to clear period. Please try again.");
    }
    setDeleteTarget(null);
  };

  /* ── Stats ── */
  const allCells       = Object.values(grid).flatMap(d => Object.values(d)).filter(c => c?.subject);
  const totalPeriods   = allCells.length;
  const uniqueSubjects = new Set(allCells.map(c => c.subject)).size;
  const uniqueTeachers = new Set(allCells.map(c => c.teacher).filter(Boolean)).size;
  const filledDays     = Object.values(grid).filter(d => Object.keys(d).length > 0).length;

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* ── Header ── */}
      <div className="bg-white border-b border-slate-200 px-6 lg:px-10 py-8 print:hidden">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">
                <CalendarDays size={12} /> Academic Schedule
              </div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight flex flex-wrap items-center gap-3">
                Lecture Timetable
                <span className="text-xs font-bold px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full">Weekly View</span>
              </h1>
            </div>
            <button onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-black rounded-xl transition-all border border-slate-200">
              <Printer size={14} /> Print Timetable
            </button>
          </div>

          {/* Class Selector — grouped dropdown */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-xl pl-4 pr-9 py-2.5 text-xs font-black text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none min-w-[180px]">
                {CLASS_GROUPS.map(group => (
                  <optgroup key={group.label} label={group.label}>
                    {group.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </optgroup>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {CLASSES.length} classes available
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 lg:px-10 py-8">

        {/* Error banner */}
        {error && (
          <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-600 text-sm font-bold px-5 py-3 rounded-2xl flex items-center justify-between">
            {error}
            <button onClick={() => setError("")}><X size={16} /></button>
          </div>
        )}

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label:"Total Periods",   value: totalPeriods,   suffix:"this week", icon: Clock,       color:"bg-indigo-500"  },
            { label:"Subjects",        value: uniqueSubjects, suffix:"assigned",  icon: BookOpen,    color:"bg-violet-500"  },
            { label:"Teachers",        value: uniqueTeachers, suffix:"scheduled", icon: User,        color:"bg-sky-500"     },
            { label:"Active Days",     value: filledDays,     suffix:"/ 6 days",  icon: CalendarDays,color:"bg-emerald-500" },
          ].map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-[24px] border border-slate-200 shadow-sm flex items-center gap-4">
              <div className={`${s.color} w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0`}>
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{s.label}</p>
                <p className="text-lg font-black text-slate-800 leading-none">
                  {s.value} <span className="text-xs font-bold text-slate-400">{s.suffix}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        {Object.keys(colorMap).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {Object.entries(colorMap).map(([subj, pal]) => (
              <span key={subj} className={`px-3 py-1 rounded-full text-[10px] font-black border ${pal.light} ${pal.text} ${pal.border}`}>
                {subj}
              </span>
            ))}
          </div>
        )}

        {/* ── Grid ── */}
        {loading ? (
          <div className="bg-white rounded-[28px] border border-slate-200 p-16 flex flex-col items-center gap-4">
            <Loader2 size={32} className="text-indigo-400 animate-spin" />
            <p className="text-slate-400 font-bold text-sm">Loading timetable from Supabase…</p>
          </div>
        ) : (
          <div className="bg-white rounded-[28px] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse" style={{ minWidth: "900px" }}>
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-4 text-left w-28 sticky left-0 bg-slate-50 z-10">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Period</span>
                    </th>
                    {DAYS.map(day => (
                      <th key={day} className="px-3 py-4 text-center">
                        <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">{day}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PERIODS.map(period => (
                    <tr key={period} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors group">
                      <td className="px-4 py-3 sticky left-0 bg-white group-hover:bg-slate-50/30 z-10 border-r border-slate-100">
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-700">P{period}</span>
                          <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap">{TIMES[period-1]}</span>
                        </div>
                      </td>
                      {DAYS.map(day => {
                        const cell = getCell(day, period);
                        const pal  = cell ? (colorMap[cell.subject] || PALETTE[0]) : null;
                        return (
                          <td key={day} className="px-2 py-2 align-top">
                            {cell ? (
                              <div className={`relative rounded-2xl p-3 border ${pal.light} ${pal.border} group/cell min-h-[80px]`}>
                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/cell:opacity-100 transition-all">
                                  <button onClick={() => openModal(day, period)}
                                    className="p-1 bg-white rounded-lg shadow-sm hover:bg-indigo-50 transition-colors">
                                    <Edit2 size={11} className="text-slate-500" />
                                  </button>
                                  <button onClick={() => setDeleteTarget({ day, period })}
                                    className="p-1 bg-white rounded-lg shadow-sm hover:bg-rose-50 transition-colors">
                                    <Trash2 size={11} className="text-rose-400" />
                                  </button>
                                </div>
                                <p className={`text-[11px] font-black leading-tight mb-1 pr-10 ${pal.text}`}>{cell.subject}</p>
                                {cell.teacher && (
                                  <p className="text-[9px] font-bold text-slate-500 flex items-center gap-1 mt-1">
                                    <User size={9} /> {cell.teacher}
                                  </p>
                                )}
                                {cell.room && (
                                  <p className="text-[9px] font-bold text-slate-400 flex items-center gap-1 mt-0.5">
                                    <MapPin size={9} /> {cell.room}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <button onClick={() => openModal(day, period)}
                                className="w-full min-h-[80px] rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 flex items-center justify-center transition-all group/empty">
                                <Plus size={16} className="text-slate-300 group-hover/empty:text-indigo-400 transition-colors" />
                              </button>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 border-t border-slate-100 px-8 py-4 flex items-center justify-between">
              <p className="text-xs font-bold text-slate-400 italic">
                Click any cell to add or edit a period. Hover a filled cell to edit or clear.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400">
                <GraduationCap size={12} /> Class: <span className="text-indigo-600">{selectedClass}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      {modal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-6 flex justify-between items-center text-white">
              <div>
                <h2 className="text-xl font-black">{getCell(modal.day, modal.period) ? "Edit Period" : "Add Period"}</h2>
                <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mt-1">
                  {modal.day} • Period {modal.period} • {TIMES[modal.period-1]}
                </p>
              </div>
              <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Subject *</label>
                <input required type="text" placeholder="e.g. Mathematics"
                  value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Teacher</label>
                <input type="text" placeholder="e.g. Mr. Sharma"
                  value={form.teacher} onChange={e => setForm({...form, teacher: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Room / Lab</label>
                <input type="text" placeholder="e.g. Room 101 / Science Lab"
                  value={form.room} onChange={e => setForm({...form, room: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-500 py-3.5 rounded-2xl font-bold text-sm transition-all">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] w-full max-w-sm shadow-2xl p-8 text-center">
            <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-rose-500" />
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-2">Clear Period?</h3>
            <p className="text-slate-400 text-sm font-medium mb-6">
              Remove {deleteTarget.day} Period {deleteTarget.period} from the schedule?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-500 py-3 rounded-2xl font-bold text-sm transition-all">Cancel</button>
              <button onClick={() => handleClear(deleteTarget.day, deleteTarget.period)}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-2xl font-bold text-sm transition-all">Clear</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
