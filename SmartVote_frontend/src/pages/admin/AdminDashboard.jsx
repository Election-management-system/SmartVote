import React from 'react';
import { Play, Square, Users, FileText, CheckCircle, AlertCircle } from 'lucide-react'; // Assuming you use lucide or similar icons
import PageHeader from "../../components/PageHeader.jsx";
import StatCard from "../../components/StatCard.jsx";
import PhaseIndicator from "../../components/PhaseIndicator.jsx";
import { useElection } from "../../context/ElectionContext.jsx";

export default function AdminDashboard() {
  const { electionSetup, voters, candidates, setElectionSetup } = useElection();

  const totalVoters = voters.length;
  const approvedCandidates = candidates.filter((c) => c.status === "approved").length;

  // Determine current phase string for logic
  let phase = "pre-election";
  if (electionSetup.isElectionActive) phase = "election-day";
  else if (electionSetup.isResultsPublished) phase = "post-election";

  // Handler for toggle (In real app, add a confirmation modal here!)
  const handleToggleElection = () => {
    setElectionSetup((prev) => ({
      ...prev,
      isElectionActive: !prev.isElectionActive,
    }));
  };

  return (
    <div className="space-y-6">
      {/* 1. Enhanced Header: Includes the Primary Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title={electionSetup.name}
          subtitle={`Academic Year ${electionSetup.academicYear}`}
          // PhaseIndicator is now more integrated, perhaps next to title or subtitle in your component
        />
        
        <div className="flex items-center gap-3">
           <div className="hidden sm:block">
              <PhaseIndicator phase={phase} />
           </div>
          
           {/* Primary Control - Context Sensitive Color */}
           <button
            onClick={handleToggleElection}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm
              ${electionSetup.isElectionActive 
                ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200" 
                : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
          >
            {electionSetup.isElectionActive ? (
              <>
                <Square size={16} fill="currentColor" /> Stop Election
              </>
            ) : (
              <>
                <Play size={16} fill="currentColor" /> Start Election
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Stats Row: Improved "Results" visualization */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard 
            label="Total Voters" 
            value={totalVoters} 
            icon={<Users className="text-slate-400" size={20}/>} 
        />
        <StatCard 
            label="Approved Candidates" 
            value={approvedCandidates} 
            icon={<FileText className="text-slate-400" size={20}/>}
        />
        
        {/* Replaced boolean "Yes/No" with a Status Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-500 font-medium">Election Status</p>
                <div className="flex items-center gap-2 mt-1">
                    <span className={`h-2.5 w-2.5 rounded-full ${electionSetup.isElectionActive ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></span>
                    <span className="text-2xl font-semibold text-slate-900">
                        {electionSetup.isElectionActive ? "Live" : "Inactive"}
                    </span>
                </div>
            </div>
             {/* Visual helper for results */}
            {electionSetup.isResultsPublished && (
                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-100">
                    Results Published
                </span>
            )}
        </div>
      </div>

      {/* 3. Workflow Section: Visualizing the Lifecycle */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Election Lifecycle</h3>
        <div className="grid gap-4 md:grid-cols-3">
            <AdminPhaseCard
            title="Pre-Election"
            isActive={phase === "pre-election"}
            step="1"
            items={[
                "Configure election details",
                "Define posts and rules",
                "Manage voters",
                "Review nominations",
            ]}
            />
            <AdminPhaseCard
            title="Election Day"
            isActive={phase === "election-day"}
            step="2"
            items={["Monitor live turnout", "Track anomalies", "Support voters"]}
            />
            <AdminPhaseCard
            title="Post-Election"
            isActive={phase === "post-election"}
            step="3"
            items={[
                "Run counting workflow",
                "Verify and publish results",
                "Review analytics",
            ]}
            />
        </div>
      </div>
    </div>
  );
}

// 4. Enhanced Phase Card Component
function AdminPhaseCard({ title, items, isActive, step }) {
  return (
    <div 
        className={`relative p-5 rounded-xl border transition-all duration-200
        ${isActive 
            ? "bg-white border-blue-500 ring-1 ring-blue-500 shadow-md" 
            : "bg-slate-50 border-slate-200 opacity-80 hover:opacity-100 hover:bg-white hover:border-slate-300"
        }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
            <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold
                ${isActive ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-600"}`}>
                {step}
            </span>
            <h3 className={`font-semibold ${isActive ? "text-slate-900" : "text-slate-700"}`}>
                {title}
            </h3>
        </div>
        {isActive && <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Current</span>}
      </div>
      
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
             {/* Checkmark implies these are tasks to be done */}
             <div className="mt-0.5 min-w-[4px] h-[4px] rounded-full bg-slate-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}