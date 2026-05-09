import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  Plus, Search, Mail, BookOpen, MoreHorizontal, ShieldCheck,
  X, Phone, MapPin, Award, Clock, Users, Star, GraduationCap,
  Briefcase, Calendar, CheckCircle2, FileText, BarChart3
} from 'lucide-react';

/* ── Teacher Profile Modal ── */
const TeacherProfileModal = ({ teacher, onClose }) => {
  if (!teacher) return null;

  const name    = teacher.full_name || 'Faculty Member';
  const email   = teacher.email    || 'No email';
  const subject = teacher.subject  || 'General';
  const id      = teacher.id       || 'N/A';

  const subjectColor = {
    Mathematics: 'from-amber-500 to-orange-500',
    Physics:     'from-blue-500 to-indigo-600',
    Chemistry:   'from-emerald-500 to-teal-500',
    Biology:     'from-green-500 to-emerald-600',
    English:     'from-violet-500 to-purple-600',
    History:     'from-rose-500 to-pink-600',
  };
  const gradient = subjectColor[subject] || 'from-blue-600 to-indigo-600';

  const stats = [
    { label: 'Classes', value: '6', icon: BookOpen },
    { label: 'Students', value: '180', icon: Users },
    { label: 'Exp. Years', value: '8', icon: Briefcase },
    { label: 'Rating', value: '4.9', icon: Star },
  ];

  const schedule = [
    { day: 'Monday',    class: 'Class X-A',   time: '09:00 – 10:00' },
    { day: 'Tuesday',   class: 'Class IX-B',  time: '10:30 – 11:30' },
    { day: 'Wednesday', class: 'Class VIII-A', time: '08:00 – 09:00' },
    { day: 'Thursday',  class: 'Class X-B',   time: '11:00 – 12:00' },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-[36px] shadow-2xl relative z-10 flex flex-col overflow-hidden border border-slate-100">

        {/* ─── Banner ─── */}
        <div className={`bg-gradient-to-r ${gradient} h-44 relative shrink-0`}>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 bg-white/15 hover:bg-white/25 text-white rounded-xl border border-white/20 transition-all"
          >
            <X size={20} />
          </button>

          {/* Avatar + Name */}
          <div className="absolute -bottom-14 left-8 flex items-end gap-5">
            <div className="w-28 h-28 rounded-3xl bg-white p-1.5 shadow-xl shrink-0">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-50">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(String(name))}&backgroundColor=b6e3f4`}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-black text-white leading-tight tracking-tight">{name}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5">
                  <BookOpen size={10} /> {subject} Specialist
                </span>
                <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl ${teacher.is_active ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-white/20 text-white border border-white/20'}`}>
                  {teacher.is_active ? 'Active Faculty' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Scrollable Content ─── */}
        <div className="flex-1 overflow-y-auto pt-20 pb-8 px-8 scrollbar-none">

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                <div className="flex justify-center mb-1">
                  <Icon size={16} className="text-indigo-400" />
                </div>
                <p className="text-xl font-black text-slate-800">{value}</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ── Left Column ── */}
            <div className="space-y-6">

              {/* Professional Info */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase size={16} className="text-indigo-600" />
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Professional Info</h3>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Faculty ID</label>
                    <p className="text-sm font-bold text-slate-700">#TCH-{String(id).padStart(4, '0')}</p>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                    <p className="text-sm font-bold text-slate-700 truncate">{email}</p>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Primary Subject</label>
                    <p className="text-sm font-bold text-slate-700">{subject}</p>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Department</label>
                    <p className="text-sm font-bold text-slate-700">{subject} Department</p>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Phone</label>
                    <p className="text-sm font-bold text-slate-700">+91 98765 43210</p>
                  </div>
                </div>
              </section>

              {/* Qualifications */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Award size={16} className="text-indigo-600" />
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Qualifications</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { degree: `M.Sc. in ${subject}`, institute: 'Delhi University', year: '2016' },
                    { degree: 'B.Ed. (Bachelor of Education)', institute: 'IGNOU', year: '2018' },
                  ].map((q) => (
                    <div key={q.degree} className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl">
                      <div className="w-8 h-8 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                        <GraduationCap size={16} className="text-indigo-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-700 truncate">{q.degree}</p>
                        <p className="text-[10px] font-bold text-slate-400">{q.institute} · {q.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* ── Right Column ── */}
            <div className="space-y-6">

              {/* Weekly Schedule */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={16} className="text-indigo-600" />
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Weekly Schedule</h3>
                </div>
                <div className="space-y-2">
                  {schedule.map((s) => (
                    <div key={s.day} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
                          <Clock size={12} className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-700">{s.day}</p>
                          <p className="text-[10px] font-bold text-slate-400">{s.class}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">{s.time}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Performance */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 size={16} className="text-indigo-600" />
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Performance</h3>
                </div>
                <div className="bg-slate-900 rounded-2xl p-5 text-white space-y-3">
                  {[
                    { label: 'Student Pass Rate', value: 97 },
                    { label: 'Attendance Record', value: 98 },
                    { label: 'Parent Satisfaction', value: 94 },
                  ].map((p) => (
                    <div key={p.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">{p.label}</span>
                        <span className="text-[10px] font-black text-white">{p.value}%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-400 rounded-full"
                          style={{ width: `${p.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-4 rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all">
              Send Message
            </button>
            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all shadow-lg shadow-indigo-100">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Teachers Page ── */
const Teachers = () => {
  const [teachers, setTeachers]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData]         = useState({ full_name: '', email: '', subject: '', is_active: true });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/teachers/');
        setTeachers(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('/teachers/', formData);
      setShowAddModal(false);
      setFormData({ full_name: '', email: '', subject: '', is_active: true });
      const res = await api.get('/teachers/');
      setTeachers(Array.isArray(res.data) ? res.data : []);
    } catch {
      alert('Error adding teacher. Please try again.');
    }
  };

  const subjectAccent = (subject) => {
    const map = {
      Mathematics: 'bg-amber-50 text-amber-600',
      Physics:     'bg-blue-50 text-blue-600',
      Chemistry:   'bg-emerald-50 text-emerald-600',
      Biology:     'bg-green-50 text-green-600',
      English:     'bg-violet-50 text-violet-600',
      History:     'bg-rose-50 text-rose-600',
    };
    return map[subject] || 'bg-indigo-50 text-indigo-600';
  };

  return (
    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Teacher Faculty</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
            Manage teaching staff, schedules and performance
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-100 active:scale-95 shrink-0"
        >
          <Plus size={18} /> Add New Teacher
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 mb-8 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search faculty by name or subject..."
            className="w-full bg-slate-50 border-none rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group relative overflow-hidden cursor-pointer"
            onClick={() => setSelectedTeacher(teacher)}
          >
            {/* Background glow */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-blue-500 opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-150 transition-all duration-500" />

            {/* Top row */}
            <div className="flex justify-between items-start mb-5">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(String(teacher.full_name || ''))}&backgroundColor=b6e3f4`}
                  alt={teacher.full_name}
                  className="w-full h-full object-cover bg-slate-50"
                />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${subjectAccent(teacher.subject)}`}>
                {teacher.subject}
              </span>
            </div>

            {/* Info */}
            <h3 className="text-base font-black text-slate-800 leading-tight mb-1">{teacher.full_name}</h3>
            <p className="text-[11px] font-bold text-slate-400 truncate mb-4">{teacher.email}</p>

            <div className="flex items-center gap-2 mb-5">
              <span className={`w-1.5 h-1.5 rounded-full ${teacher.is_active ? 'bg-emerald-500' : 'bg-rose-400'}`} />
              <span className={`text-[10px] font-black uppercase tracking-widest ${teacher.is_active ? 'text-emerald-600' : 'text-rose-400'}`}>
                {teacher.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            {/* CTA */}
            <button
              className="w-full py-2.5 rounded-xl bg-slate-50 group-hover:bg-blue-600 group-hover:text-white text-slate-500 font-black text-[10px] uppercase tracking-[0.2em] transition-all border border-slate-100 group-hover:border-transparent"
            >
              View Profile →
            </button>
          </div>
        ))}

        {loading && (
          <div className="col-span-full py-20 text-center text-slate-300 font-black text-xs tracking-[0.3em] uppercase animate-pulse">
            Retrieving Faculty Database...
          </div>
        )}
      </div>

      {/* ── Add Teacher Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-lg p-8 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-800">Register Teacher</h2>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Onboard new faculty member</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-5">
              {[
                { label: 'Full Name',     key: 'full_name', type: 'text',  placeholder: 'e.g. Dr. Anita Singh' },
                { label: 'Email Address', key: 'email',     type: 'email', placeholder: 'anita@school.com' },
                { label: 'Primary Subject', key: 'subject', type: 'text',  placeholder: 'e.g. Physics' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{label}</label>
                  <input
                    required type={type} value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold text-sm transition-all">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-blue-100 transition-all">Onboard Faculty</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Teacher Profile Modal ── */}
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
