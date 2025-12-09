import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { 
  User, 
  Search, 
  BookOpen, 
  Award, 
  Users,
  Quote
} from "lucide-react";
import PageHeader from "../../components/PageHeader.jsx";
import { useElection } from "../../context/ElectionContext.jsx";

export default function CandidateListPublic() {
  const { electionId } = useParams();
  const { candidates, posts, electionSetup } = useElection();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter Logic: Approved + Search Match
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => 
      c.status === "approved" && 
      (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       c.department.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [candidates, searchTerm]);

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* 1. Header with Search Integration */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <PageHeader
          title="Official Candidate List"
          subtitle={`Final approved nominations for ${electionSetup?.name || 'Election 2025'}`}
        />
        
        <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
                type="text"
                placeholder="Find candidate or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none shadow-sm"
            />
        </div>
      </div>

      {/* 2. Content Sections */}
      <div className="space-y-10">
        {posts.map((post) => {
            // Get candidates for this specific post from the filtered list
            const postCandidates = filteredCandidates.filter(c => c.postId === post.id);

            // Skip rendering empty sections if searching, but show "No Candidates" if list is empty naturally
            if (searchTerm && postCandidates.length === 0) return null;

            return (
                <section key={post.id} className="animate-in fade-in slide-in-from-bottom-4">
                    {/* Section Title */}
                    <div className="flex items-center gap-3 mb-4 border-b border-slate-200 pb-2">
                        <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                            <Award size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">{post.name}</h3>
                        <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            {postCandidates.length} Contenders
                        </span>
                    </div>

                    {/* Grid of Candidates */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {postCandidates.length > 0 ? (
                            postCandidates.map((c) => (
                                <CandidateCard key={c.id} candidate={c} />
                            ))
                        ) : (
                            <div className="col-span-full py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                <Users className="mx-auto text-slate-300 mb-2" size={32} />
                                <p className="text-slate-500 text-sm">No nominations approved for this post yet.</p>
                            </div>
                        )}
                    </div>
                </section>
            );
        })}

        {/* Empty State for Search */}
        {searchTerm && filteredCandidates.length === 0 && (
            <div className="text-center py-12">
                <p className="text-slate-500">No candidates found matching "{searchTerm}"</p>
                <button 
                    onClick={() => setSearchTerm("")}
                    className="text-indigo-600 text-sm font-medium hover:underline mt-2"
                >
                    Clear Search
                </button>
            </div>
        )}
      </div>
    </div>
  );
}

// --- Sub-Component: Candidate Card ---
function CandidateCard({ candidate }) {
    return (
        <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col h-full">
            
            {/* Header: Photo & Name */}
            <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 shrink-0 group-hover:scale-105 transition-transform">
                    {candidate.photoUrl ? (
                        <img src={candidate.photoUrl} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                        <User size={28} />
                    )}
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-indigo-700 transition-colors">
                        {candidate.name}
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">
                        {candidate.department}
                    </p>
                    <div className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] uppercase font-bold rounded tracking-wider">
                        {candidate.year} Year
                    </div>
                </div>
            </div>

            {/* Body: Manifesto Quote */}
            <div className="relative bg-slate-50 rounded-lg p-3 mb-4 flex-grow border border-slate-100">
                <Quote size={16} className="text-indigo-200 absolute top-2 left-2" />
                <p className="text-sm text-slate-600 italic relative z-10 pl-2 pt-1 line-clamp-3">
                    "{candidate.manifesto || "No manifesto provided."}"
                </p>
            </div>

            {/* Footer: Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <BookOpen size={12} /> Read Full Profile
                </span>
                <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <User size={14} />
                </span>
            </div>
        </div>
    );
}