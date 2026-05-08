import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CreditCard, Search, Filter, Download, Plus, ChevronRight,
  Calendar, IndianRupee, ArrowUpRight, CheckCircle2, Clock,
  XCircle, TrendingUp, TrendingDown, Users, BookOpen,
  AlertCircle, MoreHorizontal, Eye, Printer, RefreshCw, ChevronDown
} from "lucide-react";

const TERMS = ["All", "Term 1", "Term 2", "Annual"];
const STATUS_OPTS = ["All", "Paid", "Pending"];

const StatCard = ({ label, value, sub, icon: Icon, bg, iconColor, badge, badgeColor, progress }) => (
  <div className={`rounded-2xl p-6 relative overflow-hidden shadow-lg border border-white/10 ${bg}`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconColor}`}>
        <Icon size={20} />
      </div>
      {badge && <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${badgeColor}`}>{badge}</span>}
    </div>
    <p className="text-2xl font-black text-white mb-0.5">{value}</p>
    <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">{label}</p>
    {progress !== undefined && (
      <div className="mt-4">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-white/50 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-white/40 text-[9px] font-bold mt-1.5">{sub}</p>
      </div>
    )}
    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full"></div>
  </div>
);

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [stats, setStats] = useState({ collected: 0, pending: 0, target: 0 });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [termFilter, setTermFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [formData, setFormData] = useState({ student_id: "", amount: "", term: "Term 1", status: "Paid" });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [feesRes, statsRes, studentsRes] = await Promise.all([
        axios.get("http://localhost:8000/fees/"),
        axios.get("http://localhost:8000/dashboard/stats"),
        axios.get("http://localhost:8000/students/")
      ]);
      setFees(feesRes.data);
      setStats(statsRes.data.fees);
      setStudents(studentsRes.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleAddFee = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/fees/", formData);
      setShowModal(false);
      fetchData();
      setFormData({ student_id: "", amount: "", term: "Term 1", status: "Paid" });
    } catch { alert("Error recording fee."); }
  };

  const filtered = fees.filter(f => {
    const matchSearch = f.student_name.toLowerCase().includes(search.toLowerCase());
    const matchTerm = termFilter === "All" || f.term === termFilter;
    const matchStatus = statusFilter === "All" || f.status === statusFilter;
    return matchSearch && matchTerm && matchStatus;
  });

  const pct = Math.round((stats.collected / (stats.target || 1)) * 100);
  const paidCount = fees.filter(f => f.status === "Paid").length;
  const pendingCount = fees.filter(f => f.status === "Pending").length;

  // Term-wise breakdown
  const termData = ["Term 1", "Term 2", "Annual"].map(term => {
    const termFees = fees.filter(f => f.term === term);
    const collected = termFees.filter(f => f.status === "Paid").reduce((s, f) => s + f.amount, 0);
    const total = termFees.reduce((s, f) => s + f.amount, 0);
    return { term, collected, total, count: termFees.length };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 px-10 pt-8 pb-10" style={{boxShadow:"0 8px 32px rgba(79,70,229,0.2)"}}>
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-1.5 text-indigo-300/60 text-[10px] font-bold uppercase tracking-wider mb-3">
            <span>Dashboard</span><ChevronRight size={10}/><span>Financial</span><ChevronRight size={10}/><span className="text-indigo-200">Fees Details</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-black text-white mb-1">Fees &amp; Financial Ledger</h1>
              <p className="text-indigo-300/70 text-sm font-medium">Manage student fees, track collections and outstanding dues</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => fetchData()} className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold rounded-xl transition-all">
                <RefreshCw size={13}/> Refresh
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold rounded-xl transition-all">
                <Download size={13}/> Export
              </button>
              <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-emerald-500/30">
                <Plus size={14}/> Record Payment
              </button>
            </div>
          </div>

          {/* Stat Cards Row */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            <StatCard label="Total Collected" value={`₹${stats.collected.toLocaleString("en-IN")}`}
              sub={`${pct}% of target achieved`} icon={IndianRupee}
              bg="bg-gradient-to-br from-emerald-600 to-emerald-800"
              iconColor="bg-emerald-500/30 text-white"
              badge={`${pct}%`} badgeColor="bg-white/20 text-white"
              progress={pct}
            />
            <StatCard label="Pending Dues" value={`₹${stats.pending.toLocaleString("en-IN")}`}
              sub={`${pendingCount} students overdue`} icon={Clock}
              bg="bg-gradient-to-br from-orange-500 to-orange-700"
              iconColor="bg-orange-400/30 text-white"
              badge="Urgent" badgeColor="bg-red-500/30 text-white"
              progress={100 - pct}
            />
            <StatCard label="Total Target" value={`₹${stats.target.toLocaleString("en-IN")}`}
              sub="Academic Year 2024-25" icon={TrendingUp}
              bg="bg-gradient-to-br from-blue-600 to-blue-800"
              iconColor="bg-blue-400/30 text-white"
              badge="FY 2025" badgeColor="bg-white/20 text-white"
            />
            <StatCard label="Paid Students" value={paidCount}
              sub={`${pendingCount} still pending`} icon={CheckCircle2}
              bg="bg-gradient-to-br from-purple-600 to-purple-800"
              iconColor="bg-purple-400/30 text-white"
              badge={`${fees.length} total`} badgeColor="bg-white/20 text-white"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-10 py-8">
        {/* Collection Progress + Term Breakdown */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Overall Progress */}
          <div className="col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-black text-slate-800">Collection Progress</h3>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Academic Year 2024-25</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span>Collected</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-100 inline-block border border-slate-200"></span>Remaining</span>
              </div>
            </div>
            {/* Progress bar visual */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-black mb-2">
                <span className="text-indigo-600">₹{stats.collected.toLocaleString("en-IN")}</span>
                <span className="text-slate-400">₹{stats.target.toLocaleString("en-IN")}</span>
              </div>
              <div className="h-5 bg-slate-100 rounded-full overflow-hidden relative">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-1000 flex items-center justify-end pr-3"
                  style={{ width: `${pct}%` }}>
                  <span className="text-white text-[9px] font-black">{pct}%</span>
                </div>
              </div>
            </div>
            {/* Mini bar chart - term wise */}
            <div className="grid grid-cols-3 gap-4">
              {termData.map(t => (
                <div key={t.term} className="bg-slate-50 rounded-xl p-4">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-2">{t.term}</p>
                  <p className="text-base font-black text-slate-800 mb-1">₹{t.collected.toLocaleString("en-IN")}</p>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-1.5">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${t.total ? Math.round((t.collected / t.total) * 100) : 0}%` }}></div>
                  </div>
                  <p className="text-[9px] text-slate-400 font-medium">{t.count} records</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <h3 className="text-xs font-black text-slate-700 mb-4">Payment Status</h3>
              <div className="space-y-3">
                {[
                  { label: "Paid", count: paidCount, total: fees.length, color: "bg-emerald-500" },
                  { label: "Pending", count: pendingCount, total: fees.length, color: "bg-orange-400" },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span className="text-slate-600">{s.label}</span>
                      <span className="text-slate-800">{s.count} / {s.total}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.total ? (s.count / s.total) * 100 : 0}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-5 text-white">
              <CreditCard size={20} className="text-white/60 mb-3" />
              <h3 className="text-sm font-black mb-1">Download Report</h3>
              <p className="text-white/50 text-[10px] font-medium mb-4 leading-relaxed">Generate full financial report for the current session.</p>
              <button className="w-full bg-white/15 hover:bg-white/25 border border-white/20 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                <Printer size={13}/> Print Statement
              </button>
            </div>
          </div>
        </div>

        {/* Filters + Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Filter bar */}
          <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search student..."
                  className="bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-9 pr-4 text-xs font-medium text-slate-600 w-52 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
              </div>
              {/* Term filter */}
              <div className="flex gap-1 bg-slate-50 rounded-xl p-1 border border-slate-100">
                {TERMS.map(t => (
                  <button key={t} onClick={() => setTermFilter(t)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${termFilter === t ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-slate-600"}`}>
                    {t}
                  </button>
                ))}
              </div>
              {/* Status filter */}
              <div className="flex gap-1 bg-slate-50 rounded-xl p-1 border border-slate-100">
                {STATUS_OPTS.map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${statusFilter === s ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-slate-600"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-bold">{filtered.length} records</span>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100">
                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Class / Sec</th>
                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Term</th>
                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={7} className="py-20 text-center text-slate-300 text-xs font-black uppercase tracking-widest animate-pulse">Loading records...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="py-20 text-center text-slate-300 text-xs font-black uppercase tracking-widest">No records found</td></tr>
              ) : filtered.map((fee, i) => (
                <tr key={fee.id} className="hover:bg-indigo-50/30 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        {fee.student_name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-800">{fee.student_name}</p>
                        <p className="text-[9px] text-slate-400 font-medium">ID #{fee.student_id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">{fee.grade} - {fee.section}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">{fee.term}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-slate-800">₹{fee.amount.toLocaleString("en-IN")}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                      fee.status === "Paid"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : "bg-orange-50 text-orange-600 border-orange-100"
                    }`}>
                      {fee.status === "Paid" ? <CheckCircle2 size={10}/> : <Clock size={10}/>}
                      {fee.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-medium text-slate-400">
                    {fee.payment_date ? new Date(fee.payment_date).toLocaleDateString("en-IN") : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Eye size={14}/></button>
                      <button className="p-1.5 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Printer size={14}/></button>
                      <button className="p-1.5 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><MoreHorizontal size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Fee Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
              <h2 className="text-lg font-black text-white">Record New Payment</h2>
              <p className="text-indigo-200/70 text-xs font-medium mt-1">Add a fee transaction for a student</p>
            </div>
            <div className="p-8">
              <form onSubmit={handleAddFee} className="space-y-5">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Select Student</label>
                  <select required value={formData.student_id} onChange={e => setFormData({...formData, student_id: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                    <option value="">Choose student...</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.full_name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Amount (₹)</label>
                    <input required type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})}
                      placeholder="0.00" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Term</label>
                    <select value={formData.term} onChange={e => setFormData({...formData, term: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                      <option>Term 1</option>
                      <option>Term 2</option>
                      <option>Annual</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Payment Status</label>
                  <div className="flex gap-3">
                    {["Paid", "Pending"].map(s => (
                      <button type="button" key={s} onClick={() => setFormData({...formData, status: s})}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs border-2 transition-all flex items-center justify-center gap-2 ${
                          formData.status === s
                            ? s === "Paid" ? "bg-emerald-600 border-emerald-600 text-white" : "bg-orange-500 border-orange-500 text-white"
                            : "bg-white border-slate-100 text-slate-400"
                        }`}>
                        {s === "Paid" ? <CheckCircle2 size={13}/> : <Clock size={13}/>} {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-500 py-3.5 rounded-2xl font-bold text-sm transition-all">Cancel</button>
                  <button type="submit" className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-200">
                    Record Fee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fees;
