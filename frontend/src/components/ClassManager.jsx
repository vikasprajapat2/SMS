import React, { useState, useEffect, useCallback } from "react";
import {
  Settings2, Plus, Trash2, X, Check, Loader2,
  GraduationCap, Edit2, AlertTriangle
} from "lucide-react";
import { classService } from "../services/api";

const GROUP_OPTIONS = [
  "Pre-Primary",
  "Primary (1-5)",
  "Middle (6-8)",
  "Secondary (9-10)",
  "Sr. Secondary (11-12)",
  "Custom",
];

/**
 * ClassManager — modal for admin to add, rename, and delete classes.
 *
 * Props:
 *  onClose()         — close the modal
 *  onClassesChanged  — called after any mutation so parent can re-fetch
 */
export default function ClassManager({ onClose, onClassesChanged }) {
  const [groups,      setGroups]      = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [saving,      setSaving]      = useState(false);
  const [deleteId,    setDeleteId]    = useState(null);
  const [editRow,     setEditRow]     = useState(null);   // { id, name, group_label }
  const [newClass,    setNewClass]    = useState({ name: "", group_label: "Custom" });
  const [error,       setError]       = useState("");
  const [tab,         setTab]         = useState("list"); // "list" | "add"

  /* ── Fetch ── */
  const fetchClasses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await classService.getAll();
      setGroups(res.data.groups || []);
    } catch {
      setError("Could not load classes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchClasses(); }, [fetchClasses]);

  /* ── Add ── */
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newClass.name.trim()) return;
    setSaving(true);
    setError("");
    try {
      await classService.create({ name: newClass.name.trim(), group_label: newClass.group_label });
      setNewClass({ name: "", group_label: "Custom" });
      await fetchClasses();
      onClassesChanged?.();
      setTab("list");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to add class.");
    } finally {
      setSaving(false);
    }
  };

  /* ── Edit ── */
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editRow.name.trim()) return;
    setSaving(true);
    setError("");
    try {
      await classService.update(editRow.id, { name: editRow.name.trim(), group_label: editRow.group_label });
      setEditRow(null);
      await fetchClasses();
      onClassesChanged?.();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to update class.");
    } finally {
      setSaving(false);
    }
  };

  /* ── Delete ── */
  const handleDelete = async (id) => {
    setSaving(true);
    try {
      await classService.remove(id);
      setDeleteId(null);
      await fetchClasses();
      onClassesChanged?.();
    } catch {
      setError("Failed to delete class.");
    } finally {
      setSaving(false);
    }
  };

  const totalClasses = groups.reduce((a, g) => a + g.options.length, 0);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-[28px] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-indigo-900 px-8 py-6 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
              <Settings2 size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black">Manage Classes</h2>
              <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                {totalClasses} classes configured
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 shrink-0">
          <button onClick={() => setTab("list")}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all ${tab === "list" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-slate-400 hover:text-slate-600"}`}>
            All Classes
          </button>
          <button onClick={() => setTab("add")}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 ${tab === "add" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-slate-400 hover:text-slate-600"}`}>
            <Plus size={13} /> Add New Class
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mx-6 mt-4 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold px-4 py-2.5 rounded-2xl flex items-center justify-between shrink-0">
            <span className="flex items-center gap-2"><AlertTriangle size={14} /> {error}</span>
            <button onClick={() => setError("")}><X size={14} /></button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto">

          {/* ── LIST TAB ── */}
          {tab === "list" && (
            <div className="p-6 space-y-5">
              {loading ? (
                <div className="flex flex-col items-center gap-3 py-12">
                  <Loader2 size={28} className="text-indigo-400 animate-spin" />
                  <p className="text-slate-400 text-sm font-bold">Loading classes…</p>
                </div>
              ) : groups.length === 0 ? (
                <div className="text-center py-12 text-slate-400 font-bold text-sm">
                  No classes found. Add your first class →
                </div>
              ) : groups.map(group => (
                <div key={group.label}>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">{group.label}</p>
                  <div className="space-y-1.5">
                    {group.options.map(cls => (
                      <div key={cls.id}>
                        {editRow?.id === cls.id ? (
                          /* Inline edit form */
                          <form onSubmit={handleEdit}
                            className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-2xl px-4 py-2.5">
                            <GraduationCap size={14} className="text-indigo-400 shrink-0" />
                            <input
                              autoFocus
                              value={editRow.name}
                              onChange={e => setEditRow({ ...editRow, name: e.target.value })}
                              className="flex-1 bg-transparent text-sm font-bold text-slate-800 outline-none" />
                            <select
                              value={editRow.group_label}
                              onChange={e => setEditRow({ ...editRow, group_label: e.target.value })}
                              className="text-[10px] font-black text-slate-500 bg-white border border-slate-200 rounded-lg px-2 py-1 outline-none">
                              {GROUP_OPTIONS.map(g => <option key={g}>{g}</option>)}
                            </select>
                            <button type="submit" disabled={saving}
                              className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                              {saving ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                            </button>
                            <button type="button" onClick={() => setEditRow(null)}
                              className="p-1.5 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 transition-colors">
                              <X size={13} />
                            </button>
                          </form>
                        ) : (
                          /* Normal row */
                          <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 hover:bg-indigo-50/50 rounded-2xl border border-transparent hover:border-indigo-100 transition-all group">
                            <GraduationCap size={14} className="text-slate-400 shrink-0" />
                            <span className="flex-1 text-sm font-bold text-slate-700">{cls.name}</span>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                              <button onClick={() => setEditRow({ id: cls.id, name: cls.name, group_label: cls.group_label })}
                                className="p-1.5 hover:bg-indigo-100 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors">
                                <Edit2 size={13} />
                              </button>
                              <button onClick={() => setDeleteId(cls.id)}
                                className="p-1.5 hover:bg-rose-100 text-slate-400 hover:text-rose-500 rounded-lg transition-colors">
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── ADD TAB ── */}
          {tab === "add" && (
            <form onSubmit={handleAdd} className="p-8 space-y-5">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                  Class Name *
                </label>
                <input
                  required
                  autoFocus
                  type="text"
                  placeholder="e.g. 8th - C  or  Play Group - A"
                  value={newClass.name}
                  onChange={e => setNewClass({ ...newClass, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                  Group / Category
                </label>
                <select
                  value={newClass.group_label}
                  onChange={e => setNewClass({ ...newClass, group_label: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none">
                  {GROUP_OPTIONS.map(g => <option key={g}>{g}</option>)}
                </select>
                <p className="text-[10px] text-slate-400 font-medium mt-1.5 ml-1">
                  Group is used for organizing classes in the dropdown.
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setTab("list")}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-500 py-3.5 rounded-2xl font-bold text-sm transition-all">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                  Add Class
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-slate-900/40 z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] w-full max-w-sm shadow-2xl p-8 text-center">
            <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-rose-500" />
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-2">Delete Class?</h3>
            <p className="text-slate-400 text-sm font-medium mb-6">
              This won't delete existing timetable data for this class.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-500 py-3 rounded-2xl font-bold text-sm transition-all">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} disabled={saving}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                {saving ? <Loader2 size={15} className="animate-spin" /> : null} Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
