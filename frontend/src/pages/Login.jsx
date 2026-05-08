import React, { useState } from "react";
import { Eye, EyeOff, GraduationCap, Lock, Mail, ArrowRight, Shield } from "lucide-react";

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "", role: "admin" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roles = [
    { id: "admin", label: "Admin", icon: "🛡️" },
    { id: "teacher", label: "Teacher", icon: "👩‍🏫" },
    { id: "student", label: "Student", icon: "🎓" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onLogin) onLogin(form.role);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex" style={{background:"linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0f172a 100%)"}}>
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #6366f1 0%, transparent 40%)"}}></div>
        {/* Floating Cards */}
        <div className="absolute top-32 right-12 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl w-52">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center"><span className="text-green-400 text-sm">✓</span></div>
            <div><p className="text-white text-[10px] font-bold">Attendance Marked</p><p className="text-white/50 text-[9px]">Class V, B • Just now</p></div>
          </div>
          <div className="h-1 bg-white/10 rounded-full"><div className="h-full bg-green-400 rounded-full" style={{width:"92%"}}></div></div>
          <p className="text-white/50 text-[9px] mt-1">92% Present today</p>
        </div>
        <div className="absolute bottom-48 right-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl w-48">
          <p className="text-white/50 text-[9px] font-bold uppercase tracking-wider mb-2">Fee Collection</p>
          <p className="text-white text-lg font-black">₹2,40,000</p>
          <p className="text-green-400 text-[9px] font-bold mt-1">↑ 18% this month</p>
        </div>
        <div className="absolute top-64 left-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl w-44">
          <p className="text-white/50 text-[9px] font-bold mb-2">Total Students</p>
          <p className="text-white text-2xl font-black">1,240</p>
          <div className="flex gap-1 mt-2">{[...Array(5)].map((_,i)=><div key={i} className="flex-1 h-1.5 rounded-full bg-blue-500/60"></div>)}</div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <GraduationCap className="text-white" size={24} />
            </div>
            <span className="text-white font-black text-2xl tracking-tight">SMS<span className="text-blue-400 text-3xl leading-none">.</span></span>
          </div>
          <h1 className="text-4xl font-black text-white leading-tight mb-4">
            Smart School<br/><span className="text-blue-400">Management</span><br/>System
          </h1>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Manage students, teachers, attendance, fees and more — all in one powerful platform.
          </p>
          <div className="flex gap-6 mt-10">
            {[{n:"1,240",l:"Students"},{n:"86",l:"Teachers"},{n:"95%",l:"Attendance"}].map((s,i)=>(
              <div key={i}>
                <p className="text-white font-black text-xl">{s.n}</p>
                <p className="text-white/40 text-[10px] font-medium">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-white/20 text-[10px]">© 2024 SMS — Student Management System</p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="text-white" size={20} />
            </div>
            <span className="text-white font-black text-xl">SMS<span className="text-blue-400 text-2xl">.</span></span>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-white mb-1">Welcome Back 👋</h2>
              <p className="text-white/40 text-sm">Sign in to your account to continue</p>
            </div>

            {/* Role Selector */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-2xl mb-6 border border-white/10">
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => setForm(f => ({ ...f, role: r.id }))}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    form.role === r.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  <span>{r.icon}</span>{r.label}
                </button>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium flex items-center gap-2">
                <Shield size={14}/>{error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest block mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="email"
                    placeholder="admin@school.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest block mb-2">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type={show ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-12 text-white text-sm placeholder-white/20 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all"
                  />
                  <button type="button" onClick={() => setShow(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-all">
                    {show ? <EyeOff size={15}/> : <Eye size={15}/>}
                  </button>
                </div>
              </div>

              {/* Forgot */}
              <div className="flex justify-end">
                <button type="button" className="text-blue-400 text-xs font-medium hover:text-blue-300 transition-all">Forgot password?</button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Signing in...</>
                ) : (
                  <>Sign In <ArrowRight size={16}/></>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-2">Demo Credentials</p>
              <div className="space-y-1">
                {[{r:"Admin",e:"admin@school.com",p:"admin123"},{r:"Teacher",e:"teacher@school.com",p:"teacher123"}].map((d,i)=>(
                  <button key={i} type="button"
                    onClick={()=>setForm({email:d.e,password:d.p,role:d.r.toLowerCase()})}
                    className="w-full flex justify-between items-center text-[10px] px-3 py-1.5 rounded-xl hover:bg-white/5 transition-all group"
                  >
                    <span className="text-white/40 group-hover:text-white/70 font-medium">{d.r}: {d.e}</span>
                    <span className="text-white/20 group-hover:text-blue-400 font-bold">{d.p}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-white/20 text-[10px] mt-6">Secured with end-to-end encryption 🔒</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
