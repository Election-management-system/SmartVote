import { useState } from "react";
import { 
  BarChart3, 
  PieChart, 
  ShieldCheck, 
  Download, 
  Trophy, 
  Hash, 
  Clock,
  User,
  FileSpreadsheet
} from "lucide-react";
import PageHeader from "../../components/PageHeader.jsx";
import ChartCard from "../../components/ChartCard.jsx";
import { useElection } from "../../context/ElectionContext.jsx";

export default function Reports() {
  const { results, electionSetup } = useElection();
  const [activeTab, setActiveTab] = useState("results"); // Default to what matters most
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    // Simulate generation delay
    setTimeout(() => setIsExporting(false), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* 1. Actionable Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <PageHeader
            title="Analytics & Reports"
            subtitle="Detailed breakdown of results, demographics, and system integrity."
        />
        <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm"
        >
            {isExporting ? (
                <span className="flex items-center gap-2">Generating PDF...</span>
            ) : (
                <>
                    <Download size={16} /> Export Final Report
                </>
            )}
        </button>
      </div>

      {/* 2. Segmented Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-100 p-1 rounded-xl inline-flex gap-1">
            <TabButton 
                id="results" 
                label="Election Results" 
                icon={Trophy} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
            />
            <TabButton 
                id="turnout" 
                label="Turnout Analysis" 
                icon={BarChart3} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
            />
            <TabButton 
                id="audit" 
                label="Audit Logs" 
                icon={ShieldCheck} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
            />
        </div>
      </div>

      {/* 3. Dynamic Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {activeTab === "turnout" && (
            <TurnoutView results={results} />
        )}

        {activeTab === "results" && (
             <ResultsView />
        )}

        {activeTab === "audit" && (
            <AuditView />
        )}

      </div>
    </div>
  );
}

// --- Sub-Views ---

function ResultsView() {
    // Mock Data for visualization
    const posts = [
        { 
            id: 1, 
            title: "Student Council President", 
            totalVotes: 1200, 
            candidates: [
                { name: "Shubham Shinde", votes: 850, percentage: 70, isWinner: true },
                { name: "Omkar Kamble", votes: 350, percentage: 30, isWinner: false },
            ]
        },
        { 
            id: 2, 
            title: "Cultural Secretary", 
            totalVotes: 1150, 
            candidates: [
                { name: "Arti TT", votes: 600, percentage: 52, isWinner: true },
                { name: "Vighnesh Devkate", votes: 550, percentage: 48, isWinner: false },
            ]
        }
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-semibold text-slate-800">{post.title}</h3>
                        <span className="text-xs text-slate-500">{post.totalVotes} votes cast</span>
                    </div>
                    <div className="p-5 space-y-5">
                        {post.candidates.map((candidate, idx) => (
                            <div key={idx} className="relative">
                                <div className="flex justify-between items-end mb-1">
                                    <div className="flex items-center gap-2">
                                        {candidate.isWinner && <Trophy size={14} className="text-amber-500" fill="currentColor" />}
                                        <span className={`text-sm font-medium ${candidate.isWinner ? 'text-slate-900' : 'text-slate-600'}`}>
                                            {candidate.name}
                                        </span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">{candidate.votes}</span>
                                </div>
                                {/* Progress Bar */}
                                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${candidate.isWinner ? 'bg-indigo-600' : 'bg-slate-300'}`} 
                                        style={{ width: `${candidate.percentage}%` }}
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-1 text-right">{candidate.percentage}%</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

function TurnoutView({ results }) {
    const labels = Object.keys(results?.turnoutByDepartment || { 'CS': 40, 'Mech': 20 });
    const values = Object.values(results?.turnoutByDepartment || { 'CS': 40, 'Mech': 20 });

    return (
        <div className="grid gap-6 md:grid-cols-3">
             {/* Key Metrics Cards */}
            <div className="md:col-span-1 space-y-4">
                 <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                    <p className="text-indigo-600 text-sm font-medium mb-1">Highest Participation</p>
                    <h3 className="text-2xl font-bold text-indigo-900">Computer Science</h3>
                    <p className="text-indigo-600/80 text-xs mt-2">85% of eligible voters</p>
                 </div>
                 <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                    <p className="text-orange-600 text-sm font-medium mb-1">Lowest Participation</p>
                    <h3 className="text-2xl font-bold text-orange-900">Mechanical Eng.</h3>
                    <p className="text-orange-600/80 text-xs mt-2">42% of eligible voters</p>
                 </div>
            </div>

            {/* Main Chart */}
            <div className="md:col-span-2">
                <ChartCard
                    title="Turnout Distribution"
                    labels={labels}
                    values={values}
                />
            </div>
        </div>
    );
}

function AuditView() {
    // Mock Audit Logs
    const logs = [
        { id: "LOG-9921", action: "Results Published", actor: "Admin (You)", time: "10:05 AM", hash: "8f4a...92b1" },
        { id: "LOG-9920", action: "Voting Ended", actor: "System", time: "10:00 AM", hash: "7c2d...11a0" },
        { id: "LOG-9919", action: "Vote Cast", actor: "Voter #4421", time: "09:58 AM", hash: "1b3x...88z9" },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <ShieldCheck size={18} className="text-slate-500" />
                    Integrity Audit Trail
                </h3>
            </div>
            <table className="w-full text-sm text-left">
                <thead className="bg-white text-slate-500 font-medium border-b border-slate-100">
                    <tr>
                        <th className="px-6 py-3">Timestamp</th>
                        <th className="px-6 py-3">Action</th>
                        <th className="px-6 py-3">Actor</th>
                        <th className="px-6 py-3">Verification Hash</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-3 text-slate-500 flex items-center gap-2">
                                <Clock size={14} /> {log.time}
                            </td>
                            <td className="px-6 py-3 font-medium text-slate-900">{log.action}</td>
                            <td className="px-6 py-3 text-slate-600">{log.actor}</td>
                            <td className="px-6 py-3 font-mono text-xs text-slate-400 bg-slate-50/50">
                                <span className="flex items-center gap-1"><Hash size={10}/> {log.hash}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-center text-slate-500">
                End of verifiable log chain.
            </div>
        </div>
    );
}

// --- Shared Components ---

function TabButton({ id, label, icon: Icon, activeTab, setActiveTab }) {
    const isActive = activeTab === id;
    return (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive 
                    ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }
            `}
        >
            <Icon size={16} className={isActive ? "text-indigo-600" : "currentColor"} />
            {label}
        </button>
    );
}