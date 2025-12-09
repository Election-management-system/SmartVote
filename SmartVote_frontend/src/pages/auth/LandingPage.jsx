import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Vote, 
  UserPlus, 
  BarChart3, 
  ShieldCheck, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 1. Navbar: Discrete Admin Access */}
      <nav className="w-full px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <GraduationCap size={24} />
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">UniVote</span>
        </div>
        
        <Link 
            to="/admin/login" 
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors px-3 py-2 rounded-lg hover:bg-white hover:shadow-sm"
        >
            <ShieldCheck size={16} /> Admin Portal
        </Link>
      </nav>

      {/* 2. Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                Election 2025 is Live
           </div>
           
           <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
             Your Voice, <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Your Future.
             </span>
           </h1>
           
           <p className="text-lg text-slate-500 mb-8 max-w-lg mx-auto leading-relaxed">
             Welcome to the official University voting platform. Securely cast your vote, track live results, or file your nomination.
           </p>
        </div>

        {/* 3. The "Action Cards" Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-150">
           
           {/* Card 1: Voter (Primary Action) */}
           <RoleCard 
                to="/voter/login"
                title="Student Voter"
                desc="Login with your Student ID to verify eligibility and cast your ballot."
                icon={Vote}
                theme="indigo"
                primary
           />

           {/* Card 2: Candidate */}
           <RoleCard 
                to="/candidate/login"
                title="Candidate Nomination"
                desc="Submit your application, manifesto and view scrutiny status."
                icon={UserPlus}
                theme="purple"
           />

           {/* Card 3: Public Results */}
           <RoleCard 
                to="/results"
                title="Live Results"
                desc="View real-time turnout statistics and election winners."
                icon={BarChart3}
                theme="emerald"
           />

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200">
        <p>© 2025 University Election Commission. Secure & Auditable System.</p>
      </footer>
    </div>
  );
};

// --- Sub-Components ---

const RoleCard = ({ to, title, desc, icon: Icon, theme, primary }) => {
    // Theme configurations
    const themes = {
        indigo: { 
            bg: "bg-white hover:border-indigo-500", 
            iconBg: "bg-indigo-50 text-indigo-600",
            border: "border-slate-200",
            hoverRing: "group-hover:ring-indigo-500"
        },
        purple: { 
            bg: "bg-white hover:border-purple-500", 
            iconBg: "bg-purple-50 text-purple-600",
            border: "border-slate-200",
             hoverRing: "group-hover:ring-purple-500"
        },
        emerald: { 
            bg: "bg-white hover:border-emerald-500", 
            iconBg: "bg-emerald-50 text-emerald-600",
            border: "border-slate-200",
             hoverRing: "group-hover:ring-emerald-500"
        }
    };
    
    const t = themes[theme];

    return (
        <Link 
            to={to} 
            className={`group relative flex flex-col p-8 rounded-2xl transition-all duration-300 border ${t.border} ${t.bg} hover:shadow-xl hover:-translate-y-1`}
        >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${t.iconBg}`}>
                <Icon size={28} />
            </div>
            
            <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-900 transition-colors">
                {title}
            </h2>
            
            <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                {desc}
            </p>

            <div className="flex items-center text-sm font-semibold text-slate-900 group-hover:gap-2 transition-all">
                Continue <ChevronRight size={16} className="text-slate-400 group-hover:text-indigo-600" />
            </div>

            {/* Subtle Active Indicator for Primary Card */}
            {primary && (
                <div className="absolute top-4 right-4 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                </div>
            )}
        </Link>
    );
};

export default LandingPage;