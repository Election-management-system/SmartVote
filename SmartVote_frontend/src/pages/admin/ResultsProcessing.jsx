import { useState, useEffect, useRef } from "react";
import { 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Cpu, 
  FileCheck, 
  Play, 
  Loader2,
  Terminal,
  ArrowRight
} from "lucide-react";
import PageHeader from "../../components/PageHeader.jsx";

// Richer step definitions
const WORKFLOW_STEPS = [
  { 
    id: "lock",
    title: "Close Voting", 
    desc: "Terminate all active voting sessions.",
    icon: Lock 
  },
  { 
    id: "verify",
    title: "Integrity Check", 
    desc: "Verify blockchain hashes and voter signatures.",
    icon: FileCheck 
  },
  { 
    id: "decrypt",
    title: "Decrypt Votes", 
    desc: "Apply private keys to reveal ballot choices.",
    icon: Unlock 
  },
  { 
    id: "tally",
    title: "Automated Tally", 
    desc: "Aggregate votes per candidate and department.",
    icon: Cpu 
  },
  { 
    id: "publish",
    title: "Finalize Results", 
    desc: "Generate signed result sheet for publication.",
    icon: CheckCircle2 
  },
];

export default function ResultsProcessing() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState([]);
  const logsEndRef = useRef(null);

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  function addLog(message) {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg: message }]);
  }

  function handleProcessStep() {
    if (isProcessing) return;
    setIsProcessing(true);
    
    const stepData = WORKFLOW_STEPS[currentStep];
    addLog(`INITIATING: ${stepData.title}...`);

    // Simulate system work
    setTimeout(() => {
        addLog(`SUCCESS: ${stepData.title} completed.`);
        
        if (currentStep < WORKFLOW_STEPS.length - 1) {
            setCurrentStep(c => c + 1);
        } else {
            addLog("WORKFLOW COMPLETE. Results ready.");
        }
        setIsProcessing(false);
    }, 1500); // 1.5s simulated delay
  }

  const isComplete = currentStep === WORKFLOW_STEPS.length - 1 && !isProcessing;

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <PageHeader
        title="Result Processing Console"
        subtitle="Secure environment for vote tabulation and verification."
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Progress Stepper */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Sequence</h3>
            <div className="space-y-0 relative">
                {/* Vertical Line */}
                <div className="absolute left-3.5 top-2 bottom-4 w-0.5 bg-slate-100" />

                {WORKFLOW_STEPS.map((step, index) => {
                    const isActive = index === currentStep;
                    const isDone = index < currentStep;
                    const Icon = step.icon;

                    return (
                        <div key={step.id} className="relative flex items-start gap-4 mb-6 last:mb-0 z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2
                                ${isActive 
                                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md scale-110" 
                                    : isDone 
                                        ? "bg-green-500 border-green-500 text-white" 
                                        : "bg-white border-slate-200 text-slate-300"
                                }`}>
                                {isDone ? <CheckCircle2 size={16} /> : <Icon size={16} />}
                            </div>
                            <div className={`transition-opacity duration-300 ${index > currentStep ? 'opacity-40' : 'opacity-100'}`}>
                                <h4 className={`text-sm font-semibold ${isActive ? 'text-indigo-700' : 'text-slate-800'}`}>
                                    {step.title}
                                </h4>
                                <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* RIGHT COLUMN: Action & Logs */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Active Task Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col items-center justify-center text-center min-h-[240px]">
                {isComplete ? (
                     <div className="animate-in zoom-in duration-500">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Processing Complete</h2>
                        <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                            All votes have been successfully decrypted, tallied, and verified. The results are ready for publication.
                        </p>
                        <button className="mt-6 bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-slate-800">
                            View Final Results
                        </button>
                     </div>
                ) : (
                    <>
                        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                             {isProcessing ? <Loader2 size={32} className="animate-spin" /> : <Play size={32} className="ml-1" />}
                        </div>
                        
                        <h2 className="text-xl font-bold text-slate-900 mb-2">
                            Step {currentStep + 1}: {WORKFLOW_STEPS[currentStep].title}
                        </h2>
                        <p className="text-slate-500 text-sm max-w-md mb-8">
                            {WORKFLOW_STEPS[currentStep].desc} <br/>
                            This action will be logged in the immutable audit trail.
                        </p>

                        <button 
                            onClick={handleProcessStep}
                            disabled={isProcessing}
                            className={`flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold transition-all
                                ${isProcessing 
                                    ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                                    : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg active:scale-95"
                                }
                            `}
                        >
                            {isProcessing ? "Processing..." : `Execute: ${WORKFLOW_STEPS[currentStep].title}`}
                            {!isProcessing && <ArrowRight size={16} />}
                        </button>
                    </>
                )}
            </div>

            {/* 2. System Log (Terminal) */}
            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-md font-mono text-xs">
                <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                    <Terminal size={14} className="text-slate-400" />
                    <span className="text-slate-300 font-medium">System Output Log</span>
                </div>
                <div className="p-4 h-48 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    <div className="text-slate-500">Waiting for command...</div>
                    {logs.map((log, i) => (
                        <div key={i} className="flex gap-3">
                            <span className="text-slate-500 shrink-0">[{log.time}]</span>
                            <span className="text-green-400">{log.msg}</span>
                        </div>
                    ))}
                    <div ref={logsEndRef} />
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}