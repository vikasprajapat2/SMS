import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { 
  CheckCircle2, AlertCircle, Clock, Calendar, 
  Search, Filter, ChevronRight, UserCheck, 
  ArrowUpRight, Download, Users
} from 'lucide-react';

const Attendance = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ present: 0, absent: 0, late: 0, medical: 0 });
  const [loading, setLoading] = useState(true);
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ student_id: '', status: 'Present' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [logsRes, statsRes, studentsRes] = await Promise.all([
        axios.get('http://localhost:8000/attendance/'),
        axios.get('http://localhost:8000/dashboard/stats'),
        axios.get('http://localhost:8000/students/')
      ]);
      setLogs(logsRes.data);
      setStats(statsRes.data.attendance.students);
      setStudents(studentsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/attendance/', formData);
      setShowMarkModal(false);
      fetchData();
    } catch (error) {
      alert('Error marking attendance.');
    }
  };

  const exportToExcel = () => {
    if (logs.length === 0) {
      alert("No data available to export.");
      return;
    }

    const data = logs.map(log => ({
      "Student Name": log.student_name,
      "Grade": log.grade,
      "Section": log.section,
      "Check-in Time": new Date(log.date).toLocaleTimeString(),
      "Attendance Status": log.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    
    const wscols = [
      {wch: 25}, {wch: 10}, {wch: 10}, {wch: 15}, {wch: 15}
    ];
    worksheet['!cols'] = wscols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Daily Attendance");

    const dateStr = new Date().toLocaleDateString().replace(/\//g, '-');
    XLSX.writeFile(workbook, `Attendance_Report_${dateStr}.xlsx`);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'present': return 'bg-green-50 text-green-600 border-green-100';
      case 'absent': return 'bg-red-50 text-red-500 border-red-100';
      case 'late': return 'bg-orange-50 text-orange-500 border-orange-100';
      default: return 'bg-blue-50 text-blue-500 border-blue-100';
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Attendance Logs</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Real-time presence tracking & reports</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={exportToExcel}
            className="bg-slate-50 hover:bg-slate-100 text-slate-600 px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all border border-slate-100"
          >
            <Download size={18} /> Export Daily Report
          </button>
          <button 
            onClick={() => setShowMarkModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-100"
          >
            <UserCheck size={18} /> Mark Attendance
          </button>
        </div>
      </div>

      {/* Attendance Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AttendanceStat title="Present Today" value={stats.present} change="+12%" icon={CheckCircle2} color="bg-indigo-500" />
        <AttendanceStat title="Absent" value={stats.absent} change="0%" icon={AlertCircle} color="bg-rose-500" />
        <AttendanceStat title="Late Arrival" value={stats.late} change="-2%" icon={Clock} color="bg-orange-500" />
        <AttendanceStat title="Medical Leave" value={stats.medical} change="+1" icon={Users} color="bg-blue-500" />
      </div>

      <div className="card p-5 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between border-none shadow-xl shadow-slate-100/50">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Search by student name..." 
            className="w-full bg-slate-50 border-none rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-500">
            <Calendar size={16} /> May 25, 2024
          </div>
          <button className="border border-slate-100 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-slate-600 font-bold text-xs flex items-center gap-2 transition-all">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      <div className="card overflow-hidden border-none shadow-2xl shadow-slate-200/40">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Student</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Grade/Sec</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Check-in Time</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
              <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Report</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/50 transition-all group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm">
                      {log.student_name.charAt(0)}
                    </div>
                    <span className="text-sm font-black text-slate-800">{log.student_name}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {log.grade} - {log.section}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <Clock size={14} /> {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${getStatusColor(log.status)}`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 text-slate-300 hover:text-indigo-600 transition-all">
                    <ArrowUpRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {logs.length === 0 && !loading && (
              <tr>
                <td colSpan="5" className="py-20 text-center text-slate-300 font-bold text-xs uppercase tracking-widest">
                  No attendance records found for this date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {loading && (
          <div className="p-20 text-center animate-pulse text-slate-300 font-black text-xs tracking-widest">SYNCHRONIZING LOGS...</div>
        )}
      </div>

      {/* Mark Attendance Modal */}
      {showMarkModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-lg p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-black text-slate-800 mb-2">Daily Presence</h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-8">Register student attendance for today</p>
            
            <form onSubmit={handleMarkAttendance} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Select Student</label>
                <select 
                  required
                  value={formData.student_id}
                  onChange={(e) => setFormData({...formData, student_id: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                >
                  <option value="">Choose a student...</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.full_name} ({s.grade}-{s.section})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Attendance Status</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Present', 'Absent', 'Late', 'Medical'].map(status => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData({...formData, status})}
                      className={`py-3 rounded-xl font-bold text-xs transition-all border-2 ${
                        formData.status === status 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                          : 'bg-white border-slate-50 text-slate-400 hover:border-slate-100'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowMarkModal(false)}
                  className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold text-sm transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 transition-all"
                >
                  Submit Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const AttendanceStat = ({ title, value, change, icon: Icon, color }) => (
  <div className="card p-6 border-none shadow-lg shadow-slate-100/50 flex items-center gap-5 relative overflow-hidden group">
    <div className={`p-4 rounded-2xl bg-opacity-10 ${color} transition-all group-hover:scale-110`}>
      <Icon size={24} className={color.replace('bg-', 'text-')} />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-end gap-2">
        <h4 className="text-2xl font-black text-slate-800 leading-none">{value}</h4>
        <span className="text-[10px] font-bold text-green-500 mb-0.5">{change}</span>
      </div>
    </div>
    <div className={`absolute top-0 right-0 w-2 h-full opacity-20 ${color}`}></div>
  </div>
);

export default Attendance;
