import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  Loader2 
} from "lucide-react";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (status === "error") setStatus("idle");
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    // Basic validation
    if (!form.email || !form.password) {
      setStatus("error");
      setErrorMessage("Please enter your credentials.");
      return;
    }

    setStatus("loading");

    // Simulate API Network Request
    setTimeout(() => {
        // Mock successful login
        // In real app: await login(form)
        setStatus("idle");
        navigate("/admin/dashboard");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      {/* Background Decor (Optional) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/50 blur-3xl" />
         <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="px-8 pt-8 pb-6 text-center">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg text-white">
                <ShieldCheck size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Admin Portal</h2>
            <p className="text-sm text-slate-500 mt-2">
                Secure access for election commissioners.
            </p>
        </div>

        {/* Form Section */}
        <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Email Field */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                            <Mail size={18} />
                        </div>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="admin@university.edu"
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between ml-1">
                         <label className="text-sm font-medium text-slate-700">Password</label>
                         <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">Forgot?</a>
                    </div>
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                            <Lock size={18} />
                        </div>
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                        {/* Toggle Visibility */}
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Error State */}
                {status === "error" && (
                    <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium border border-red-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                        {errorMessage}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 text-sm font-medium transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {status === "loading" ? (
                        <>
                            <Loader2 size={18} className="animate-spin" /> Signing in...
                        </>
                    ) : (
                        <>
                            Login to Dashboard <ArrowRight size={16} />
                        </>
                    )}
                </button>
            </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
                Authorized personnel only. <br/> Access is monitored and logged.
            </p>
        </div>
      </div>
    </div>
  );
}