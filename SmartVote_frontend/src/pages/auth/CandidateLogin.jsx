import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  UserPlus, 
  CreditCard, 
  KeyRound, 
  ArrowRight, 
  Loader2,
  CheckCircle2,
  HelpCircle
} from "lucide-react";

export default function CandidateLogin() {
  const [step, setStep] = useState(1); // 1: Enter ID, 2: Enter OTP
  const [form, setForm] = useState({ id: "", otp: "" });
  const [status, setStatus] = useState("idle"); // idle, sending_otp, verifying, error
  const [timeLeft, setTimeLeft] = useState(0); // For OTP countdown
  const navigate = useNavigate();

  // Countdown timer for OTP resend
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  function handleSendOtp(e) {
    e.preventDefault();
    if (!form.id) {
        setStatus("error"); 
        return;
    }
    
    setStatus("sending_otp");
    // Simulate API call to send OTP
    setTimeout(() => {
        setStep(2);
        setStatus("idle");
        setTimeLeft(30); // 30 second cooldown
    }, 1500);
  }

  function handleLogin(e) {
    e.preventDefault();
    if (!form.otp) return;

    setStatus("verifying");
    // Simulate verification
    setTimeout(() => {
        navigate("/candidate/nomination");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 font-sans">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header - Distinct from Admin (Warmer tone) */}
        <div className="bg-indigo-600 px-8 py-8 text-center relative overflow-hidden">
            {/* Abstract Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 text-white shadow-inner border border-white/30">
                    <UserPlus size={28} />
                </div>
                <h2 className="text-2xl font-bold text-white">Candidate Portal</h2>
                <p className="text-indigo-100 text-sm mt-1">
                    Submit your nomination & manifesto.
                </p>
            </div>
        </div>

        <div className="p-8">
            {/* STEP 1: Identification */}
            {step === 1 && (
                <form onSubmit={handleSendOtp} className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Student Enrollment ID</label>
                        <div className="relative group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                <CreditCard size={18} />
                            </div>
                            <input
                                value={form.id}
                                onChange={(e) => setForm({...form, id: e.target.value})}
                                placeholder="e.g. 2024-CSE-042"
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium uppercase placeholder:normal-case"
                                autoFocus
                            />
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1 ml-1">
                            <HelpCircle size={12} /> Use the ID printed on your college ID card.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={!form.id || status === "sending_otp"}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 text-sm font-medium transition-all shadow-lg shadow-slate-200 hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {status === "sending_otp" ? (
                            <> <Loader2 size={18} className="animate-spin" /> Verifying ID... </>
                        ) : (
                            <> Verify & Get OTP <ArrowRight size={18} /> </>
                        )}
                    </button>
                </form>
            )}

            {/* STEP 2: Authentication */}
            
            {step === 2 && (
                <form onSubmit={handleLogin} className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    
                    {/* Context Banner */}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3">
                        <CheckCircle2 className="text-blue-600 shrink-0 mt-0.5" size={16} />
                        <div className="text-xs text-blue-800">
                            <p className="font-semibold">Code sent to {form.id}</p>
                            <p className="opacity-80">Please check your registered email address.</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-sm font-semibold text-slate-700">One-Time Password</label>
                            {timeLeft > 0 ? (
                                <span className="text-xs text-slate-400 font-mono">Resend in 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
                            ) : (
                                <button type="button" onClick={() => setTimeLeft(30)} className="text-xs font-medium text-indigo-600 hover:underline">
                                    Resend Code
                                </button>
                            )}
                        </div>
                        <div className="relative group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                <KeyRound size={18} />
                            </div>
                            <input
                                value={form.otp}
                                onChange={(e) => setForm({...form, otp: e.target.value})}
                                placeholder="• • • • • •"
                                maxLength={6}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-mono text-lg tracking-[0.2em] placeholder:tracking-normal"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            type="submit"
                            disabled={!form.otp || status === "verifying"}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 text-sm font-medium transition-all shadow-lg shadow-indigo-200 hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {status === "verifying" ? (
                                <> <Loader2 size={18} className="animate-spin" /> Authenticating... </>
                            ) : (
                                "Access Nomination Form"
                            )}
                        </button>
                        
                        <button 
                            type="button" 
                            onClick={() => setStep(1)}
                            className="text-xs text-slate-500 hover:text-slate-800 py-2"
                        >
                            Wrong ID? Go Back
                        </button>
                    </div>
                </form>
            )}
        </div>
      </div>
    </div>
  );
}