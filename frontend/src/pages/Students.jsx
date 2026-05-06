import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Search, Filter, MoreHorizontal, GraduationCap, Mail, Calendar, Trash2 } from 'lucide-react';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/students/');
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/students/', formData);
      setShowModal(false);
      fetchStudents();
      setFormData({ full_name: '', email: '', grade: '', section: '', is_active: true });
    } catch (error) {
      alert('Error adding student. Please try again.');
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Student Management</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Manage admissions and student records</p>
        </div>
        <Link 
          to="/students/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-200"
        >
          <Plus size={18} /> Add New Student
        </Link>
      </div>

      <div className="card p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search students by name or email..." 
            className="w-full bg-slate-50 border-none rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none border border-slate-100 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition-all">
            <Filter size={16} /> Filters
          </button>
          <button className="flex-1 md:flex-none border border-slate-100 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition-all">
             Export CSV
          </button>
        </div>
      </div>

      <div className="card overflow-hidden border-none shadow-xl shadow-slate-100/50">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Details</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Class</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Admission Date</th>
              <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/50 transition-all group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center font-bold">
                      {student.full_name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{student.full_name}</h4>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium mt-0.5">
                        <Mail size={12} /> {student.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-bold text-slate-600">
                  <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Grade {student.grade} - {student.section}</span>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                    student.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                  }`}>
                    {student.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-5 text-xs font-bold text-slate-400">
                  {new Date(student.admission_date || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 hover:bg-white hover:shadow-md rounded-lg text-slate-300 hover:text-slate-600 transition-all">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="p-20 text-center text-slate-300 font-bold text-sm tracking-widest animate-pulse">LOADING RECORDS...</div>
        )}
      </div>
    </div>
  );
};

export default Students;
