import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Vote, 
  Activity, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  RefreshCcw
} from 'lucide-react';
import PageHeader from "../../components/PageHeader.jsx";
import ChartCard from "../../components/ChartCard.jsx"; // Assuming this handles the chart rendering
import { useElection } from "../../context/ElectionContext.jsx";

export default function LiveDashboard() {
  const { voters, results, electionSetup } = useElection();
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Derived metrics
  const totalVoters = voters.length;
  const votesCast = voters.filter((v) => v.hasVoted).length;
  const turnoutPercentage = totalVoters ? Math.round((votesCast / totalVoters) * 100) : 0;
  
  // Mock live data update effect
  useEffect(() => {
    const interval = setInterval(() => setLastUpdated(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* 1. Enhanced Header with LIVE Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-slate-900">Live Election Monitor</h1>
                {electionSetup.isElectionActive && (
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-100 uppercase tracking-wider animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-red-600"></span>
                        Live
                    </span>
                )}
            </div>
            <p className="text-slate-500 text-sm">
                Real-time voting metrics and anomaly detection.
            </p>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
            <RefreshCcw size={12} className="animate-spin-slow" />
            Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      {/* 2. Hero Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Card 1: Total Voters */}
        <StatWidget 
            label="Total Eligible Voters" 
            value={totalVoters.toLocaleString()} 
            icon={Users}
            color="blue"
            subtext="Finalized list"
        />

        {/* Card 2: Votes Cast */}
        <StatWidget 
            label="Votes Cast" 
            value={votesCast.toLocaleString()} 
            icon={Vote}
            color="indigo"
            subtext={
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                   <Activity size={12} /> +12 in last min
                </span>
            }
        />

        {/* Card 3: Turnout (The Hero) */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-slate-500">Voter Turnout</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${turnoutPercentage > 50 ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                    {turnoutPercentage > 50 ? 'Strong' : 'Moderate'}
                </span>
            </div>
            <div className="flex items-end gap-2 mb-3">
                <span className="text-3xl font-bold text-slate-900">{turnoutPercentage}%</span>
            </div>
            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${turnoutPercentage}%` }}
                />
            </div>
            <p className="text-xs text-slate-400 mt-2">Target: 80% turnout</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* 3. Main Chart Area */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-1">
           {/* Wrapper to ensure the chart card fits the new design language */}
           <div className="p-4 border-b border-slate-100 mb-4">
                <h3 className="font-semibold text-slate-800">Turnout by Department</h3>
           </div>
           <div className="px-4 pb-4">
               {/* Passing data to your existing component */}
               <ChartCard 
                    labels={Object.keys(results.turnoutByDepartment)} 
                    values={Object.values(results.turnoutByDepartment)} 
               />
           </div>
        </div>

        {/* 4. Sidebar: Activity & Health */}
        <div className="space-y-6">
            
            {/* System Health Module */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Activity size={18} className="text-slate-400" /> System Health
                </h3>
                
                {/* Status Indicator */}
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 p-3 rounded-lg mb-4">
                    <div className="bg-emerald-100 p-1.5 rounded-full">
                        <CheckCircle size={18} className="text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-emerald-800">All Systems Operational</p>
                        <p className="text-xs text-emerald-600">0 anomalies detected</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <HealthMetric label="Server Latency" value="24ms" status="good" />
                    <HealthMetric label="Active Sessions" value="142" status="neutral" />
                    <HealthMetric label="Failed Logins" value="0" status="good" />
                </div>
            </div>

            {/* Live Feed Module */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                 <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Clock size={18} className="text-slate-400" /> Recent Votes
                </h3>
                <div className="space-y-0">
                    {/* Mock Feed Items */}
                    <FeedItem dept="Computer Science" time="Just now" />
                    <FeedItem dept="Mechanical Eng." time="2 mins ago" />
                    <FeedItem dept="Business Admin" time="5 mins ago" />
                    <FeedItem dept="Biotech" time="8 mins ago" isLast />
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}

// --- Sub-components ---

function StatWidget({ label, value, icon: Icon, color, subtext }) {
    const colors = {
        blue: "bg-blue-50 text-blue-600",
        indigo: "bg-indigo-50 text-indigo-600",
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
                <h4 className="text-3xl font-bold text-slate-900 mb-1">{value}</h4>
                <div className="text-xs text-slate-400">{subtext}</div>
            </div>
            <div className={`p-3 rounded-lg ${colors[color] || 'bg-slate-100 text-slate-600'}`}>
                <Icon size={24} />
            </div>
        </div>
    );
}

function HealthMetric({ label, value, status }) {
    const statusColor = status === 'good' ? 'text-emerald-600' : 'text-slate-600';
    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">{label}</span>
            <span className={`font-mono font-medium ${statusColor}`}>{value}</span>
        </div>
    );
}

function FeedItem({ dept, time, isLast }) {
    return (
        <div className="relative pl-6 pb-6">
            {/* Timeline Line */}
            {!isLast && <div className="absolute left-[9px] top-2 h-full w-[2px] bg-slate-100" />}
            
            {/* Dot */}
            <div className="absolute left-0 top-1.5 w-[20px] h-[20px] bg-white border-2 border-indigo-100 rounded-full flex items-center justify-center">
                 <div className="w-2 h-2 bg-indigo-500 rounded-full" />
            </div>

            <div>
                <p className="text-sm font-medium text-slate-800">Vote cast from <span className="text-indigo-600">{dept}</span></p>
                <p className="text-xs text-slate-400 mt-0.5">{time}</p>
            </div>
        </div>
    );
}