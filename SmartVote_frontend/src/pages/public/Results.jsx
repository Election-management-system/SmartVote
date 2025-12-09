import React, { useMemo } from 'react';
import { useElection } from '../../context/ElectionContext';
import { MOCK_POSTS } from '../../mock/initialData';
import { 
  Trophy, 
  Lock, 
  Clock, 
  BarChart3, 
  User, 
  Share2,
  Download
} from 'lucide-react';
import PageHeader from '../../components/PageHeader.jsx';

const Results = () => {
  const { candidates, electionPhase, electionSetup } = useElection();

  // --- STATE 1: AWAITING RESULTS ---
  if (electionPhase !== 'RESULTS') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-10 text-center relative overflow-hidden">
           {/* Background Decor */}
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200" />
           
           <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
              <Lock size={40} />
           </div>
           
           <h1 className="text-2xl font-bold text-slate-900 mb-2">Results are Locked</h1>
           <p className="text-slate-500 mb-8">
             Voting is either in progress or counting is underway. Results will be declared by the administrator.
           </p>
           
           <div className="bg-slate-50 rounded-lg p-4 flex items-center justify-center gap-3 text-sm font-medium text-slate-600">
              <Clock size={16} />
              <span>Expected Declaration: {electionSetup?.resultsDate || "TBA"}</span>
           </div>
        </div>
      </div>
    );
  }

  // --- STATE 2: RESULTS DECLARED ---
  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* 1. Celebratory Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <Trophy size={12} /> Official Results
                </span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Election Winners <span className="text-indigo-600">2025</span>
            </h1>
            <p className="text-slate-500 mt-2">
                Total votes cast and final standings per post.
            </p>
        </div>
        
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-700 transition-colors">
                <Share2 size={16} /> Share
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                <Download size={16} /> Download Report
             </button>
        </div>
      </div>

      {/* 2. Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {MOCK_POSTS.map((post, index) => (
            <ResultCard 
                key={post.id} 
                post={post} 
                candidates={candidates} 
                delay={index * 100} // Stagger animation
            />
        ))}
      </div>
    </div>
  );
};

// --- Sub-Component: The Result Card ---
function ResultCard({ post, candidates, delay }) {
    // 1. Filter & Sort Candidates
    const postCandidates = useMemo(() => {
        return candidates
            .filter(c => c.post === post.title) // Assuming matching logic
            .sort((a, b) => b.votes - a.votes);
    }, [candidates, post.title]);

    const winner = postCandidates[0];
    const totalVotes = postCandidates.reduce((sum, c) => sum + (c.votes || 0), 0);

    return (
        <div 
            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-forwards opacity-0"
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h2 className="font-bold text-lg text-slate-800">{post.title}</h2>
                <div className="text-xs font-medium text-slate-500 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200">
                    <BarChart3 size={12} /> {totalVotes.toLocaleString()} votes
                </div>
            </div>

            {/* Winner Spotlight */}
            {winner && (
                <div className="p-6 bg-gradient-to-br from-white to-amber-50/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Trophy size={100} className="text-amber-500" />
                    </div>
                    
                    <div className="relative z-10 flex items-center gap-5">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                                {winner.photoUrl ? (
                                    <img src={winner.photoUrl} alt="" className="w-full h-full object-cover"/>
                                ) : (
                                    <User size={40} className="text-slate-400" />
                                )}
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-1.5 rounded-full border-4 border-white shadow-sm">
                                <Trophy size={14} fill="currentColor" />
                            </div>
                        </div>
                        
                        <div>
                            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Elected Winner</p>
                            <h3 className="text-2xl font-bold text-slate-900 leading-tight">{winner.name}</h3>
                            <p className="text-sm text-slate-500">{winner.dept} • {winner.year}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* The Bars (Runners Up + Winner) */}
            <div className="p-6 pt-2 space-y-4">
                {postCandidates.map((candidate, idx) => {
                    const percentage = totalVotes > 0 ? ((candidate.votes / totalVotes) * 100).toFixed(1) : 0;
                    const isWinner = idx === 0;

                    return (
                        <div key={candidate.id}>
                            <div className="flex justify-between items-end mb-1">
                                <span className={`text-sm font-medium ${isWinner ? 'text-slate-900' : 'text-slate-600'}`}>
                                    {candidate.name}
                                </span>
                                <span className="text-sm font-bold text-slate-900">
                                    {candidate.votes} <span className="text-xs font-normal text-slate-400">({percentage}%)</span>
                                </span>
                            </div>
                            
                            {/* Horizontal Bar */}
                            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 ease-out
                                        ${isWinner ? 'bg-amber-500' : 'bg-slate-400'}
                                    `}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Results;