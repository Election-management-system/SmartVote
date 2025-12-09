import React from 'react';
import { useElection } from '../../context/ElectionContext';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Radio, 
  Trophy 
} from 'lucide-react';
import StatCard from '../../components/StatCard'; // Assuming this component exists

const AdminDashboard = () => {
  const { electionPhase, setElectionPhase } = useElection();

  // Configuration for the phases to keep JSX clean
  const phases = [
    { id: 'PRE_ELECTION', label: 'Setup & Nominations', icon: Settings },
    { id: 'VOTING', label: 'Election Day (Live)', icon: Radio },
    { id: 'RESULTS', label: 'Results & Reports', icon: Trophy },
  ];

  const currentPhaseIndex = phases.findIndex(p => p.id === electionPhase);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Election Overview</h1>
           <p className="text-slate-500 mt-1">Manage the lifecycle and view live statistics.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
           <span>Status:</span>
           <span className="uppercase tracking-wider text-indigo-600">{electionPhase.replace('_', ' ')}</span>
        </div>
      </div>
      
      {/* 2. Interactive Phase Stepper */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
            Election Lifecycle Control
        </h3>
        
        <div className="relative flex justify-between">
          {/* Background Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full" />
          
          {/* Active Progress Line */}
          <div 
            className="absolute top-1/2 left-0 h-1 bg-indigo-600 -translate-y-1/2 z-0 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${(currentPhaseIndex / (phases.length - 1)) * 100}%` }}
          />

          {/* Stepper Buttons */}
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const isActive = electionPhase === phase.id;
            const isCompleted = index < currentPhaseIndex;
            
            // Interaction: Only allow moving forward or to current (strict flow)
            // Or allow clicking any for flexibility. Here we simply set it.
            return (
              <button
                key={phase.id}
                onClick={() => setElectionPhase(phase.id)}
                className="relative z-10 group flex flex-col items-center focus:outline-none"
              >
                <div 
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300
                    ${isActive 
                        ? 'bg-indigo-600 border-white shadow-lg scale-110' 
                        : isCompleted 
                            ? 'bg-indigo-600 border-indigo-600 text-white' 
                            : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                    }
                  `}
                >
                  <Icon size={isActive ? 20 : 18} className={isActive ? 'text-white' : 'currentColor'} />
                </div>
                
                <span 
                    className={`
                        absolute top-14 text-sm font-medium whitespace-nowrap transition-colors duration-300
                        ${isActive ? 'text-indigo-700 font-bold' : 'text-slate-500'}
                    `}
                >
                    {phase.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
            title="Total Voters" 
            value="1,250" 
            icon={<Users size={24} />} 
            // UX Tip: Neutral/Blue implies general data
            color="bg-blue-50 text-blue-600" 
        />
        <StatCard 
            title="Nominations" 
            value="12" 
            icon={<FileText size={24} />} 
            // UX Tip: Purple/Orange usually implies 'candidates' or 'people of interest'
            color="bg-purple-50 text-purple-600" 
        />
        <StatCard 
            title="Voter Turnout" 
            value="0%" 
            icon={<BarChart3 size={24} />} 
            // UX Tip: Green implies success or live metrics
            color="bg-green-50 text-green-600" 
        />
      </div>
    </div>
  );
};

export default AdminDashboard;