import React, { useMemo } from 'react';
import { 
  Trophy, 
  Lock, 
  Clock, 
  BarChart3, 
  User, 
  CheckCircle2,
  Share2
} from 'lucide-react';
import PageHeader from "../../components/PageHeader.jsx";
import ChartCard from "../../components/ChartCard.jsx";
import { useElection } from "../../context/ElectionContext.jsx";

export default function ResultsPublic() {
  const { posts, candidates, results, electionSetup } = useElection();

  // --- STATE 1: AWAITING RESULTS ---
  // If results are not published yet, show the "Locked" screen
  if (!electionSetup?.isResultsPublished) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-10 text-center relative overflow-hidden">
           {/* Background Decor */}
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200" />
           
           <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
              <Lock size={40} />
           </div>
           
           <h1 className="text-2xl font-bold text-slate-900 mb-2">Results are Sealed</h1>
           <p className="text-slate-500 mb-8">
             The counting process is underway. Official results will be declared here once verified by the Election Commission.
           </p>
           
           <div className="bg-slate-50 rounded-lg p-4 flex items-center justify-center gap-3 text-sm font-medium text-slate-600">
              <Clock size={16} />
              <span>Declaration Expected: {electionSetup?.resultsDate || "Soon"}</span>
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
                    <Trophy size={12} /> Official Declaration
                </span>
            </div>
            <PageHeader
                title="Election Results 2025"
                subtitle="Final winners and detailed vote breakdown."
            />
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-700 transition-colors shadow-sm">
            <Share2 size={16} /> Share Result Card
        </button>
      </div>

      {/* 2. Winners Gallery (High Level Summary) */}
      <section className="mb-12">
         <h3 className="font-bold text-slate-900 mb-4 text-lg flex items-center gap-2">
            <Trophy className="text-amber-500" size={20} /> New Council Members
         </h3>
         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
                const winnerId = results.winnersByPost[post.id];
                const winner = candidates.find(c => c.id === winnerId);

                return (
                    <div key={post.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-amber-300 transition-all">
                        {/* Winner Decor */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-full -mr-8 -mt-8 z-0" />
                        
                        <div className="relative z-10">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                {post.name}
                            </p>
                            
                            {winner ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm border border-amber-200">
                                        {winner.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-lg leading-none">{winner.name}</p>
                                        <p className="text-xs text-slate-500 mt-1">{winner.department}</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-slate-400 italic">Result Pending</p>
                            )}
                            
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-[10px] text-green-600 font-medium">
                                <CheckCircle2 size={12} /> Verified by Admin
                            </div>
                        </div>
                    </div>
                );
            })}
         </div>
      </section>

      {/* 3. Detailed Breakdown (Bar Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Left Col: Vote Counts */}
         <div className="lg:col-span-2 space-y-8">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2 border-b border-slate-200 pb-2">
                <BarChart3 className="text-indigo-600" size={20} /> Detailed Breakdown
            </h3>
            
            {posts.map((post) => (
                <ResultCard 
                    key={post.id}
                    post={post}
                    candidates={candidates}
                    votesMap={results.votesByCandidate}
                />
            ))}
         </div>

         {/* Right Col: Turnout Stats */}
         <div className="space-y-6">
            <h3 className="font-bold text-slate-900 text-lg border-b border-slate-200 pb-2">
                Turnout Analytics
            </h3>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2">
                 <ChartCard
                    title="Participation by Dept"
                    labels={Object.keys(results.turnoutByDepartment)}
                    values={Object.values(results.turnoutByDepartment)}
                />
            </div>

            <div className="bg-indigo-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <BarChart3 size={100} />
                </div>
                <p className="text-indigo-200 text-sm font-medium mb-1">Total Votes Cast</p>
                <h3 className="text-4xl font-bold mb-4">
                    {Object.values(results.votesByCandidate).reduce((a, b) => a + b, 0).toLocaleString()}
                </h3>
                <div className="h-1 bg-indigo-700 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400 w-3/4"></div>
                </div>
                <p className="text-xs text-indigo-300 mt-2">75% Participation Rate (Mock)</p>
            </div>
         </div>

      </div>
    </div>
  );
}

// --- Sub-Component: Detailed Result Card ---
function ResultCard({ post, candidates, votesMap }) {
    // Filter and sort candidates for this post
    const postCandidates = useMemo(() => {
        return candidates
            .filter(c => c.postId === post.id) // Ensure ID matching logic
            .map(c => ({ ...c, votes: votesMap[c.id] || 0 }))
            .sort((a, b) => b.votes - a.votes);
    }, [candidates, post.id, votesMap]);

    const totalVotes = postCandidates.reduce((sum, c) => sum + c.votes, 0);

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-semibold text-slate-800">{post.name}</h4>
                <span className="text-xs text-slate-500">{totalVotes} votes total</span>
            </div>
            
            <div className="p-5 space-y-4">
                {postCandidates.map((candidate, idx) => {
                    const percentage = totalVotes > 0 ? ((candidate.votes / totalVotes) * 100).toFixed(1) : 0;
                    const isWinner = idx === 0;

                    return (
                        <div key={candidate.id}>
                            <div className="flex justify-between items-end mb-1">
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm font-medium ${isWinner ? 'text-slate-900' : 'text-slate-600'}`}>
                                        {candidate.name}
                                    </span>
                                    {isWinner && <Trophy size={12} className="text-amber-500" fill="currentColor" />}
                                </div>
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
                
                {postCandidates.length === 0 && (
                    <p className="text-sm text-slate-400 italic">No candidates contested.</p>
                )}
            </div>
        </div>
    );
}