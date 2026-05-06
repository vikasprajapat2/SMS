import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, Search, BookOpen, Hash, Layers, 
  CheckCircle2, MoreHorizontal, Filter, 
  ArrowRight, Download
} from 'lucide-react';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    department: ''
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/subjects/');
      setSubjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setLoading(false);
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/subjects/', formData);
      setShowModal(false);
      fetchSubjects();
      setFormData({ title: '', code: '', department: '' });
    } catch (error) {
      alert('Error adding subject. Check if the code is unique.');
    }
  };

  const getDeptColor = (dept) => {
    switch (dept.toLowerCase()) {
      case 'science': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'humanities': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'technology': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Academic Curriculum</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Manage school subjects and departments</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-purple-100"
        >
          <Plus size={18} /> Define New Subject
        </button>
      </div>

      <div className="card p-5 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between border-none shadow-xl shadow-slate-100/50">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Search by subject or code..." 
            className="w-full bg-slate-50 border-none rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="border border-slate-100 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-slate-600 font-bold text-xs flex items-center gap-2 transition-all">
            <Filter size={16} /> Departments
          </button>
          <button className="border border-slate-100 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-slate-600 font-bold text-xs flex items-center gap-2 transition-all">
            <Download size={16} /> Export Syllabus
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subjects.map((sub) => (
          <div key={sub.id} className="card p-6 border-none shadow-lg shadow-slate-100/50 group hover:shadow-2xl hover:shadow-purple-100/50 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-inner ${getDeptColor(sub.department)}`}>
                <BookOpen size={24} />
              </div>
              <button className="p-2 text-slate-200 hover:text-slate-400">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <h3 className="text-lg font-black text-slate-800 mb-1 group-hover:text-purple-600 transition-colors">{sub.title}</h3>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-6">
              <Hash size={12} /> {sub.code}
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</span>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${getDeptColor(sub.department)}`}>
                  {sub.department}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                <div className="flex items-center gap-1.5 text-green-500 font-black text-[10px] uppercase">
                  <CheckCircle2 size={12} /> Live
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end text-purple-600 font-black text-[10px] uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-all">
              Manage Content <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="py-20 text-center animate-pulse text-slate-300 font-black text-xs tracking-[0.3em] uppercase">Loading Curriculum...</div>
      )}

      {/* Add Subject Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-lg p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-black text-slate-800 mb-2">New Subject</h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-8">Add to the academic catalog</p>
            
            <form onSubmit={handleAddSubject} className="space-y-5">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Subject Title</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. Advanced Mathematics" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-purple-500 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Subject Code</label>
                  <input required type="text" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} placeholder="MATH101" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-purple-500 transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Department</label>
                  <select required value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-purple-500 transition-all appearance-none">
                    <option value="">Select...</option>
                    <option value="Science">Science</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Technology">Technology</option>
                    <option value="Commerce">Commerce</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold text-sm transition-all">Cancel</button>
                <button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-purple-100 transition-all">Define Subject</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subjects;
