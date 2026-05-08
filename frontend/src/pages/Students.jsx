import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { 
  Plus, Search, Filter, MoreHorizontal, GraduationCap, Mail, 
  Calendar, Trash2, X, Phone, MapPin, User, IndianRupee, 
  BookOpen, Clock, CheckCircle2, ShieldCheck, Download, Edit2
} from 'lucide-react';

/* ── Defensive Student Profile Modal ── */
const StudentProfileModal = ({ student, onClose }) => {
  // 1. Basic safety check
  if (!student) return null;

  // 2. Safe variable mapping to prevent access of undefined
  const name = student.full_name || "Guest Student";
  const id = student.id || "N/A";
  const email = student.email || "No email provided";
  const grade = student.grade || "N/A";
  const section = student.section || "N/A";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-[32px] shadow-2xl relative z-10 flex flex-col overflow-hidden border border-slate-100 transition-all">
        {/* Header */}
        <div className="h-40 bg-indigo-600 relative shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-md border border-white/20 transition-all z-20"
          >
            <X size={20} />
          </button>
          
          <div className="absolute -bottom-12 left-8 flex items-end gap-5">
            <div className="w-28 h-28 rounded-3xl bg-white p-1.5 shadow-xl">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-50">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(String(name))}`} 
                  alt={name} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-black text-white leading-tight">{name}</h2>
              <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mt-1">ID: #STU-{id}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pt-16 pb-8 px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {/* General Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <User size={16} className="text-indigo-600" />
                <h3 className="text-base font-black text-slate-800">Student Profile</h3>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                  <p className="text-sm font-bold text-slate-700">{name}</p>
                </div>
                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                  <p className="text-sm font-bold text-slate-700">{email}</p>
                </div>
                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Current Grade</label>
                  <p className="text-sm font-bold text-slate-700">Class {grade} - Section {section}</p>
                </div>
                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Admission Date</label>
                  <p className="text-sm font-bold text-slate-700">01 Sep 2023</p>
                </div>
              </div>
            </div>

            {/* Parent Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={16} className="text-indigo-600" />
                <h3 className="text-base font-black text-slate-800">Parental Information</h3>
              </div>
              <div className="bg-slate-900 p-6 rounded-3xl text-white space-y-4">
                <div>
                  <label className="text-[9px] font-black text-white/30 uppercase tracking-widest">Guardian Name</label>
                  <p className="text-sm font-bold">Mr. Rajesh Prajapat</p>
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/30 uppercase tracking-widest">Contact Number</label>
                  <p className="text-sm font-bold">+91 94140 12345</p>
                </div>
                <div className="pt-2">
                  <button className="w-full bg-indigo-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all">
                    Send Notification
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex gap-3">
             <button className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-black text-[11px] uppercase tracking-wider hover:bg-slate-200 transition-all">
               View Full Documents
             </button>
             <button className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-wider hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
               Update Academic Record
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/students/');
        setStudents(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-4 sm:p-8 max-w-[1400px] mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Student Management</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Manage admissions and records</p>
        </div>
        <Link 
          to="/students/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg active:scale-95 shrink-0"
        >
          <Plus size={18} /> Add Student
        </Link>
      </div>

      <div className="bg-white p-4 mb-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search students..." 
            className="w-full bg-slate-50 border-none rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none border border-slate-100 px-4 py-3 rounded-xl text-slate-600 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
            <Filter size={16} /> Filters
          </button>
          <button className="flex-1 md:flex-none bg-slate-900 text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider">
             Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/20">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Class</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((s, idx) => (
                <tr 
                  key={s.id || idx} 
                  className="hover:bg-slate-50/50 transition-all cursor-pointer group"
                  onClick={() => setSelectedStudent(s)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(String(s.full_name || ''))}`} 
                          alt="" 
                          className="w-full h-full"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-800 truncate">{s.full_name}</h4>
                        <p className="text-[10px] font-medium text-slate-400 truncate">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">Grade {s.grade}-{s.section}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${s.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                      {s.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-600">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && (
          <div className="p-20 text-center text-slate-300 font-bold text-xs uppercase tracking-[0.2em]">Syncing...</div>
        )}
      </div>

      {selectedStudent && (
        <StudentProfileModal 
          student={selectedStudent} 
          onClose={() => setSelectedStudent(null)} 
        />
      )}
    </div>
  );
};

export default Students;
