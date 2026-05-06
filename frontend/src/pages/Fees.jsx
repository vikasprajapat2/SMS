import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  CreditCard, Search, Filter, Download, Plus,
  ChevronRight, Calendar, IndianRupee, ArrowUpRight,
  CheckCircle2, Clock, MoreHorizontal
} from 'lucide-react';

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [stats, setStats] = useState({ collected: 0, pending: 0, target: 0 });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    student_id: '',
    amount: '',
    term: 'Term 1',
    status: 'Paid'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [feesRes, statsRes, studentsRes] = await Promise.all([
        axios.get('http://localhost:8000/fees/'),
        axios.get('http://localhost:8000/dashboard/stats'),
        axios.get('http://localhost:8000/students/')
      ]);
      setFees(feesRes.data);
      setStats(statsRes.data.fees);
      setStudents(studentsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleAddFee = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/fees/', formData);
      setShowModal(false);
      fetchData();
      setFormData({ student_id: '', amount: '', term: 'Term 1', status: 'Paid' });
    } catch (error) {
      alert('Error recording fee.');
    }
  };

  return (
    <div className="p-10 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Financial Ledger</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Manage student fees and revenue collection</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-100"
        >
          <Plus size={18} /> Record New Fee
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
              <IndianRupee size={24} />
            </div>
            <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-lg uppercase tracking-widest">Revenue</span>
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-1">₹{stats.collected.toLocaleString('en-IN')}</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Collected</p>
          <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Collection Rate</span>
            <span className="text-xs font-black text-emerald-600">{Math.round((stats.collected / (stats.target || 1)) * 100)}%</span>
          </div>
        </div>

        <div className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 rounded-2xl bg-orange-50 text-orange-600">
              <IndianRupee size={24} />
            </div>
            <span className="text-[10px] font-black text-orange-500 bg-orange-50 px-2.5 py-1 rounded-lg uppercase tracking-widest">Outstanding</span>
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-1">₹{stats.pending.toLocaleString('en-IN')}</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Dues</p>
          <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Target Goal</span>
            <span className="text-xs font-black text-slate-800">₹{stats.target.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="bg-[#101035] p-7 rounded-[32px] text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 rounded-2xl bg-white/10 text-white">
              <CreditCard size={24} />
            </div>
          </div>
          <h3 className="text-lg font-black mb-1">Quick Statement</h3>
          <p className="text-indigo-200/60 text-[10px] font-medium leading-relaxed mb-6">Generate and download financial reports for the current academic session.</p>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all">
            <Download size={14} /> Download Ledger
          </button>
        </div>
      </div>

      <div className="card p-5 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between border-none shadow-xl shadow-slate-100/50">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Search by student name..." 
            className="w-full bg-slate-50 border-none rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-500">
            <Calendar size={16} /> Session 2024-25
          </div>
          <button className="border border-slate-100 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-slate-600 font-bold text-xs flex items-center gap-2 transition-all">
            <Filter size={16} /> Status
          </button>
        </div>
      </div>

      <div className="card overflow-hidden border-none shadow-2xl shadow-slate-200/40">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Grade/Sec</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Term</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {fees.map((fee) => (
              <tr key={fee.id} className="hover:bg-slate-50/50 transition-all group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center font-black text-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      {fee.student_name.charAt(0)}
                    </div>
                    <span className="text-sm font-black text-slate-800">{fee.student_name}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {fee.grade} - {fee.section}
                  </span>
                </td>
                <td className="px-8 py-5 text-sm font-black text-slate-800">
                  ₹{fee.amount.toLocaleString('en-IN')}
                </td>
                <td className="px-8 py-5 text-xs font-bold text-slate-400">
                  {fee.term}
                </td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                    fee.status === 'Paid' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                  }`}>
                    {fee.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 text-slate-300 hover:text-emerald-600 transition-all">
                    <ArrowUpRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="p-20 text-center animate-pulse text-slate-300 font-black text-xs tracking-widest">SYNCHRONIZING LEDGER...</div>
        )}
      </div>

      {/* Add Fee Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-lg p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-black text-slate-800 mb-2">Record Payment</h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-8">Add a new fee transaction</p>
            
            <form onSubmit={handleAddFee} className="space-y-5">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Select Student</label>
                <select required value={formData.student_id} onChange={(e) => setFormData({...formData, student_id: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-emerald-500 transition-all">
                  <option value="">Choose student...</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.full_name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Amount (₹)</label>
                  <input required type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} placeholder="0.00" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-emerald-500 transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Term</label>
                  <select value={formData.term} onChange={(e) => setFormData({...formData, term: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-emerald-500 transition-all">
                    <option value="Term 1">Term 1</option>
                    <option value="Term 2">Term 2</option>
                    <option value="Annual">Annual</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Status</label>
                <div className="flex gap-3">
                  {['Paid', 'Pending'].map(s => (
                    <button type="button" key={s} onClick={() => setFormData({...formData, status: s})} className={`flex-1 py-3 rounded-xl font-bold text-xs border-2 transition-all ${formData.status === s ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100' : 'bg-white border-slate-50 text-slate-400'}`}>{s}</button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold text-sm transition-all">Cancel</button>
                <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-100 transition-all">Record Fee</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fees;
