import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, UserSquare2, Mail, BookOpen, MoreHorizontal, ShieldCheck } from 'lucide-react';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
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
      const response = await axios.get('http://localhost:8000/teachers/');
      setTeachers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setLoading(false);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/teachers/', formData);
      setShowModal(false);
      fetchTeachers();
      setFormData({ full_name: '', email: '', subject: '', is_active: true });
    } catch (error) {
      alert('Error adding teacher.');
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Teacher Faculty</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Manage teaching staff and departments</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-200"
        >
          <Plus size={18} /> Add New Teacher
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="card p-6 group hover:shadow-2xl hover:shadow-slate-200/50 transition-all border-none relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 transition-all group-hover:scale-150 bg-blue-500`}></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl shadow-inner">
                {teacher.full_name.charAt(0)}
              </div>
              <button className="text-slate-300 hover:text-slate-600 transition-all p-1.5 hover:bg-slate-50 rounded-lg">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="relative z-10">
              <h3 className="text-lg font-black text-slate-800 leading-tight mb-1">{teacher.full_name}</h3>
              <p className="text-blue-600 font-bold text-[11px] uppercase tracking-widest flex items-center gap-1.5 mb-4">
                <BookOpen size={12} /> {teacher.subject} Specialist
              </p>
              
              <div className="space-y-3 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-500">
                  <Mail size={16} className="text-slate-300" />
                  <span className="text-xs font-bold truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <ShieldCheck size={16} className="text-slate-300" />
                  <span className={`text-[10px] font-black uppercase tracking-widest ${teacher.is_active ? 'text-green-500' : 'text-red-400'}`}>
                    {teacher.is_active ? 'Verified Faculty' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-3 rounded-xl bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-600 font-black text-[10px] uppercase tracking-[0.2em] transition-all relative z-10">
              View Profile
            </button>
          </div>
        ))}
        
        {loading && (
          <div className="col-span-full py-20 text-center text-slate-300 font-black text-xs tracking-[0.3em] uppercase animate-pulse">
            Retrieving Faculty Database...
          </div>
        )}
      </div>

      {/* Add Teacher Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-lg p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-black text-slate-800 mb-2">Register Teacher</h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-8">Onboard new faculty member</p>
            
            <form onSubmit={handleAddTeacher} className="space-y-5">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Full Name</label>
                <input required type="text" value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} placeholder="e.g. Adrian Rubell" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Email Address</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="adrian@school.com" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Primary Subject</label>
                <input required type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder="e.g. Physics" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold text-sm transition-all">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-blue-100 transition-all">Onboard Faculty</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachers;
