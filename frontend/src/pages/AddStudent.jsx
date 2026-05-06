import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, Save, User, GraduationCap, Phone, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

const AddStudent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    grade: '',
    section: '',
    roll_number: '',
    phone: '',
    address: '',
    is_active: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/students/', formData);
      navigate('/students');
    } catch (error) {
      alert('Error registering student. Please check all fields.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-100 py-10 px-8 mb-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/students')}
              className="w-12 h-12 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-800 flex items-center justify-center transition-all group"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">New Student Admission</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Academic Year 2024-25</p>
              </div>
            </div>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-3 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50"
          >
            {loading ? 'Processing...' : <><Save size={18} /> Complete Admission</>}
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Personal Profile */}
          <div className="card p-8 border-none shadow-2xl shadow-slate-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-slate-50 opacity-10">
              <User size={120} />
            </div>
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shadow-inner">
                <User size={20} />
              </div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Personal Profile</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <FormInput 
                label="Full Legal Name" 
                placeholder="e.g. Fahed Bin"
                value={formData.full_name}
                onChange={(v) => setFormData({...formData, full_name: v})}
              />
              <FormInput 
                label="Email Address" 
                type="email"
                placeholder="student@example.com"
                value={formData.email}
                onChange={(v) => setFormData({...formData, email: v})}
              />
              <FormInput 
                label="Phone Number" 
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={(v) => setFormData({...formData, phone: v})}
              />
              <FormInput 
                label="Home Address" 
                placeholder="Street, City, State"
                value={formData.address}
                onChange={(v) => setFormData({...formData, address: v})}
              />
            </div>
          </div>

          {/* Section 2: Academic Details */}
          <div className="card p-8 border-none shadow-2xl shadow-slate-200/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 text-slate-50 opacity-10">
              <GraduationCap size={120} />
            </div>
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shadow-inner">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Academic Assignment</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <FormInput 
                label="Grade / Class" 
                placeholder="e.g. XII"
                value={formData.grade}
                onChange={(v) => setFormData({...formData, grade: v})}
              />
              <FormInput 
                label="Section" 
                placeholder="e.g. A"
                value={formData.section}
                onChange={(v) => setFormData({...formData, section: v})}
              />
              <FormInput 
                label="Roll Number" 
                placeholder="e.g. 1042"
                value={formData.roll_number}
                onChange={(v) => setFormData({...formData, roll_number: v})}
              />
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex items-center gap-3 justify-center text-slate-400 bg-slate-50/50 py-4 rounded-2xl border border-dashed border-slate-200">
            <ShieldCheck size={16} />
            <p className="text-[10px] font-black uppercase tracking-[0.2em]">Data verified & secured by school administrative system</p>
          </div>
        </form>
      </div>
    </div>
  );
};

const FormInput = ({ label, type = "text", placeholder, value, onChange }) => (
  <div>
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 ml-1">{label}</label>
    <input 
      required
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all placeholder:text-slate-300 shadow-inner"
    />
  </div>
);

export default AddStudent;
