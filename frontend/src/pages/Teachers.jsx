import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  Plus, Search, UserSquare2, Mail, BookOpen, MoreHorizontal, 
  ShieldCheck, X, Phone, Calendar, Clock, Award, Briefcase,
  Users, Star, Download, ChevronRight, FileText
} from 'lucide-react';

/* ── Teacher Profile Modal ── */
const TeacherProfileModal = ({ teacher, onClose }) => {
  if (!teacher) return null;

  const safeName = teacher.full_name || "Faculty Member";
  const safeEmail = teacher.email || "No email provided";
  const safeSubject = teacher.subject || "General Education";
  const safeID = teacher.id || "000";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>
      
      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-[40px] shadow-2xl relative z-10 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
        {/* Banner */}
        <div className="h-44 bg-gradient-to-r from-blue-600 to-indigo-700 relative shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl backdrop-blur-md border border-white/10 transition-all z-20"
          >
            <X size={20} />
          </button>

          <div className="absolute -bottom-16 left-10 flex items-end gap-6">
            <div className="w-32 h-32 rounded-[32px] bg-white p-2 shadow-xl">
              <div className="w-full h-full rounded-[24px] overflow-hidden bg-slate-100">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(safeName)}`} 
                  alt={safeName} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-3xl font-black text-white leading-none tracking-tight">{safeName}</h2>
              <div className="flex items-center gap-3 mt-3">
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl border border-white/10">
                  EMP ID: #FAC-{safeID}
                </span>
                <span className="bg-blue-400 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-lg shadow-blue-500/30">
                  Verified Faculty
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pt-24 pb-10 px-10 scrollbar-none">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Col */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 p-5 rounded-[32px] border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Subject</p>
                  <p className="text-base font-black text-slate-800 truncate">{safeSubject}</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-[32px] border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Experience</p>
                  <p className="text-xl font-black text-blue-600">8+ Years</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-[32px] border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rating</p>
                  <p className="text-xl font-black text-emerald-500 flex items-center gap-1.5">
                    4.9 <Star size={16} className="fill-emerald-500" />
                  </p>
                </div>
              </div>

              {/* Bio / About */}
              <section className="bg-slate-50/50 p-8 rounded-[40px] border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <Award size={18} className="text-blue-600" />
                  <h3 className="text-lg font-black text-slate-800">Faculty Expertise</h3>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</p>
                    <p className="text-sm font-bold text-slate-700 mt-1">{safeSubject} & Science</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qualifications</p>
                    <p className="text-sm font-bold text-slate-700 mt-1">M.Sc in Applied {safeSubject}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Contact</p>
                    <p className="text-sm font-bold text-slate-700 mt-1">{safeEmail}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Joined Date</p>
                    <p className="text-sm font-bold text-slate-700 mt-1">15 August 2019</p>
                  </div>
                </div>
              </section>

              {/* Workload */}
              <section>
                <div className="flex items-center gap-2 mb-4 ml-2">
                  <Briefcase size={18} className="text-blue-600" />
                  <h3 className="text-lg font-black text-slate-800">Current Workload</h3>
                </div>
                <div className="bg-white border border-slate-100 rounded-[32px] p-4 space-y-3">
                  {[
                    { class: '10 - A', timing: '08:30 AM - 09:30 AM', students: 42 },
                    { class: '12 - C', timing: '11:00 AM - 12:30 PM', students: 38 }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600"><Users size={18} /></div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">Class {item.class}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.timing}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-slate-800">{item.students}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Students</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Col */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              {/* Profile Card */}
              <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-xl shadow-slate-200">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Contact Details</h4>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Mobile Number</p>
                      <p className="text-sm font-bold">+91 98765 00000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Address</p>
                      <p className="text-sm font-bold truncate">Sector 5, Mansarovar, Jaipur</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Certifications</h4>
                <div className="space-y-3">
                  {['National Teaching Award 2022', 'Advanced Pedagogy (Oxford)'].map((cert) => (
                    <div key={cert} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-slate-400 group-hover:text-blue-600" />
                        <span className="text-xs font-bold text-slate-600 group-hover:text-slate-800 truncate">{cert}</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-600 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button className="w-full bg-blue-600 text-white py-4 rounded-[20px] font-black text-[11px] uppercase tracking-wider hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                  Update Teacher Details
                </button>
                <button className="w-full bg-slate-100 text-slate-600 py-4 rounded-[20px] font-black text-[11px] uppercase tracking-wider hover:bg-slate-200 transition-all border border-slate-200">
                  View Performance History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Teachers Component ── */
const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    subject: '',
    is_active: true
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await api.get('/teachers/');
      setTeachers(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setLoading(false);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      await api.post('/teachers/', formData);
      setShowModal(false);
      fetchTeachers();
      setFormData({ full_name: '', email: '', subject: '', is_active: true });
    } catch (error) {
      alert('Error adding teacher.');
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tighter">Teacher Faculty</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mt-1">Manage teaching staff and academic departments</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-[20px] font-black text-sm flex items-center gap-3 transition-all shadow-xl shadow-blue-100 active:scale-95"
        >
          <Plus size={20} /> ONBOARD TEACHER
        </button>
      </div>

      <div className="bg-white p-4 mb-10 rounded-[32px] border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:w-[450px] group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search faculty by name, ID or department..." 
            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-medium focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-300"
          />
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none bg-slate-50 hover:bg-slate-100 px-6 py-4 rounded-2xl text-slate-600 font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-slate-100">
            Export Faculty List
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white p-7 rounded-[40px] group hover:shadow-2xl hover:shadow-slate-200/50 transition-all border border-slate-100 relative overflow-hidden flex flex-col">
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 transition-all group-hover:scale-150 bg-blue-500`}></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="w-16 h-16 rounded-[24px] bg-white border border-slate-100 p-1 shadow-sm ring-1 ring-slate-100 group-hover:ring-blue-100 transition-all overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(teacher.full_name || 'Teacher')}`} alt="" className="w-full h-full bg-slate-50 rounded-xl" />
              </div>
              <button className="text-slate-300 hover:text-blue-600 transition-all p-2 hover:bg-slate-50 rounded-xl">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="relative z-10 flex-1">
              <h3 className="text-lg font-black text-slate-800 leading-tight mb-1 group-hover:text-blue-600 transition-colors">{teacher.full_name}</h3>
              <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-1.5 mb-6">
                <BookOpen size={12} strokeWidth={2.5} /> {teacher.subject} Specialist
              </p>
              
              <div className="space-y-4 pt-5 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-500">
                  <Mail size={16} className="text-slate-300" />
                  <span className="text-[11px] font-bold truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider ${
                    teacher.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-400'
                  }`}>
                    <span className={`w-1 h-1 rounded-full ${teacher.is_active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {teacher.is_active ? 'Verified Faculty' : 'Inactive'}
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setSelectedTeacher(teacher)}
              className="w-full mt-8 py-4 rounded-[20px] bg-slate-50 group-hover:bg-blue-600 group-hover:text-white text-slate-600 font-black text-[10px] uppercase tracking-[0.2em] transition-all relative z-10 shadow-none group-hover:shadow-lg group-hover:shadow-blue-200"
            >
              View Full Profile
            </button>
          </div>
        ))}
      </div>

      {loading && (
        <div className="py-32 text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-300 font-black text-xs uppercase tracking-[0.3em]">Connecting Faculty Server...</p>
        </div>
      )}

      {/* Add Teacher Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="bg-white rounded-[40px] w-full max-w-lg p-10 shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 border border-slate-100">
            <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Register Faculty</h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-10">Onboard a new faculty member</p>
            
            <form onSubmit={handleAddTeacher} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2.5 ml-1">Full Name</label>
                <input required type="text" value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} placeholder="e.g. Adrian Rubell" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2.5 ml-1">Email Address</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="adrian@school.com" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2.5 ml-1">Subject Expertise</label>
                <input required type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder="e.g. Physics" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-500 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 transition-all active:scale-95">Register Now</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Profile Modal */}
      {selectedTeacher && (
        <TeacherProfileModal 
          teacher={selectedTeacher} 
          onClose={() => setSelectedTeacher(null)} 
        />
      )}
    </div>
  );
};

export default Teachers;
