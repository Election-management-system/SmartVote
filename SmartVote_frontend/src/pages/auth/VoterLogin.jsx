import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Vote, 
  Smartphone, 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  History 
} from "lucide-react";
import { useElection } from "../../context/ElectionContext.jsx";

export default function VoterLogin() {
  const { voters, setCurrentVoter } = useElection();
  const navigate = useNavigate();

  // State Machine: 'identify' -> 'authenticate'
  const [step, setStep] = useState("identify"); 
  const [enrollment, setEnrollment] = useState("");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, error
  const [errorMsg, setErrorMsg] = useState("");
  
  // Ref for focus management
  const otpInputRef = useRef(null);

  // Focus OTP input when step changes
  useEffect(() => {
    if (step === "authenticate" && otpInputRef.current) {
        otpInputRef.current.focus();
    }
  }, [step]);

  function handleSendOtp(e) {
    e.preventDefault();
    if (!enrollment.trim()) {
        setStatus("error");
        setErrorMsg("Enrollment number is required.");
        return;
    }

    setStatus("loading");
    setErrorMsg("");

    // Simulate Server Lookup
    setTimeout(() => {
        // Mock validation: In real app, check if user exists
        setStep("authenticate");
        setStatus("idle");
    }, 1200);
  }

  function handleLogin(e) {
    e.preventDefault();
    if (otp.length < 4) {
        setStatus("error");
        setErrorMsg("Please enter the complete 6-digit code.");
        return;
    }

    setStatus("loading");
    
    // Simulate Verification
    setTimeout(() => {
        // Mock Login Success: Pick first voter or find by enrollment
        const voter = voters[0] || { name: "Student", id: enrollment }; 
        setCurrentVoter(voter);
        navigate("/voter/ballot");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 font-sans">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-50/50 blur-3xl" />
         <div className="absolute top-[20%] -left-[10%] w-[30%] h-[30%] rounded-full bg-teal-50/50 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-emerald-600 px-8 py-6 text-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mx-auto mb-3 shadow-inner border border-white/30 text-white">
                <Vote size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">Secure Ballot Access</h2>
            <p className="text-emerald-100 text-xs mt-1">
                University Election 2025
            </p>
        </div>

        {/* Content Section */}
        <div className="p-8">
            
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
                <div className={`h-1.5 w-12 rounded-full transition-colors ${step === 'identify' ? 'bg-emerald-500' : 'bg-emerald-200'}`} />
                <div className={`h-1.5 w-12 rounded-full transition-colors ${step === 'authenticate' ? 'bg-emerald-500' : 'bg-slate-100'}`} />
            </div>

            {/* ERROR ALERT */}
            {status === "error" && (
                <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2 text-xs text-red-600 animate-in shake">
                    <span className="font-bold">Error:</span> {errorMsg}
                </div>
            )}

            {/* STEP 1: IDENTIFICATION */}
            {step === "identify" && (
                <form onSubmit={handleSendOtp} className="space-y-5 animate-in fade-in slide-in-from-left-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                            Enrollment Number
                        </label>
                        <div className="relative group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                <ShieldCheck size={18} />
                            </div>
                            <input
                                value={enrollment}
                                onChange={(e) => {
                                    setEnrollment(e.target.value.toUpperCase());
                                    setStatus("idle");
                                }}
                                placeholder="e.g. 2021-MECH-042"
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium placeholder:font-normal placeholder:text-slate-400"
                                autoFocus
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!enrollment || status === "loading"}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 text-sm font-medium transition-all shadow-lg shadow-slate-200 hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {status === "loading" ? (
                            <> <Loader2 size={18} className="animate-spin" /> Verifying... </>
                        ) : (
                            <> Verify Identity <ArrowRight size={18} /> </>
                        )}
                    </button>
                </form>
            )}

            {/* STEP 2: AUTHENTICATION */}
            {step === "authenticate" && (
                <form onSubmit={handleLogin} className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <div className="text-center">
                        <p className="text-sm text-slate-600">
                            We've sent a 6-digit code to the mobile number registered with 
                            <span className="font-bold text-slate-900"> {enrollment}</span>.
                        </p>
                    </div>

                    <div>
                        <div className="relative group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                <Smartphone size={18} />
                            </div>
                            <input
                                ref={otpInputRef}
                                type="tel" 
                                maxLength={6}
                                value={otp}
                                onChange={(e) => {
                                    // Allow only numbers
                                    if (/^\d*$/.test(e.target.value)) {
                                        setOtp(e.target.value);
                                        setStatus("idle");
                                    }
                                }}
                                placeholder="• • • • • •"
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-center font-mono text-lg tracking-[0.5em] placeholder:tracking-normal"
                            />
                        </div>
                        <div className="flex justify-between mt-2 px-1">
                            <button type="button" onClick={() => setStep("identify")} className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">
                                <History size={12} /> Wrong ID?
                            </button>
                            <button type="button" className="text-xs font-medium text-emerald-600 hover:underline">
                                Resend Code
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={otp.length < 6 || status === "loading"}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3 text-sm font-medium transition-all shadow-lg shadow-emerald-200 hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {status === "loading" ? (
                            <> <Loader2 size={18} className="animate-spin" /> Decrypting Ballot... </>
                        ) : (
                            "Enter Voting Booth"
                        )}
                    </button>
                </form>
            )}

            <div className="mt-8 text-center border-t border-slate-100 pt-4">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                    Powered by SecureVote Blockchain
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}