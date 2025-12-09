import { useState, useMemo } from "react";
import { 
  Check, 
  X, 
  FileText, 
  Search, 
  Filter, 
  User, 
  MoreHorizontal, 
  Send
} from "lucide-react";
import PageHeader from "../../components/PageHeader.jsx";
import { useElection } from "../../context/ElectionContext.jsx";

export default function NominationsAdmin() {
  const { candidates, setCandidates, posts } = useElection();
  const [filter, setFilter] = useState("pending"); // pending | approved | rejected | all
  const [search, setSearch] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  // Helper: Map post IDs to names
  const postMap = useMemo(() => 
    Object.fromEntries(posts.map((p) => [p.id, p.name])), 
  [posts]);

  // Derived State: Filtering the list
  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    if (filter === "all") return matchesSearch;
    return matchesSearch && c.status === filter;
  });

  const pendingCount = candidates.filter(c => c.status === "pending").length;

  function updateStatus(id, status) {
    // In a real app, adding an undo toast here is great UX
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  }

  function handlePublish() {
    if (pendingCount > 0) {
        alert("Please review all pending nominations before publishing.");
        return;
    }
    setIsPublishing(true);
    // Simulate API call
    setTimeout(() => {
        setIsPublishing(false);
        alert("Final candidate list published to voters!");
    }, 1000);
  }

  return (
    <div className="max-w-5xl mx-auto pb-10">
      {/* 1. Header with Primary Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <PageHeader
            title="Nomination Scrutiny"
            subtitle="Review eligibility and finalize the ballot."
        />
        
        <button
            onClick={handlePublish}
            disabled={pendingCount > 0 || isPublishing}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm
                ${pendingCount > 0 
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                    : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md"
                }
            `}
        >
            <Send size={16} />
            {isPublishing ? "Publishing..." : "Publish Final List"}
        </button>
      </div>

      {/* 2. Control Bar: Stats, Search & Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6 sticky top-4 z-10">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-lg self-start">
                <FilterTab label="Pending" count={pendingCount} active={filter === "pending"} onClick={() => setFilter("pending")} />
                <FilterTab label="Approved" active={filter === "approved"} onClick={() => setFilter("approved")} />
                <FilterTab label="Rejected" active={filter === "rejected"} onClick={() => setFilter("rejected")} />
                <FilterTab label="All" active={filter === "all"} onClick={() => setFilter("all")} />
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search candidates..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
                />
            </div>
        </div>
        
        {/* Progress Bar (Visualizing Work Left) */}
        <div className="h-1 bg-slate-50 w-full">
            <div 
                className="h-full bg-indigo-500 transition-all duration-500"
                style={{ width: `${((candidates.length - pendingCount) / candidates.length) * 100}%` }}
            />
        </div>
      </div>

      {/* 3. The Review List */}
      <div className="space-y-3">
        {filteredCandidates.length === 0 ? (
            <EmptyState filter={filter} />
        ) : (
            filteredCandidates.map((candidate) => (
                <CandidateCard 
                    key={candidate.id} 
                    candidate={candidate} 
                    postName={postMap[candidate.postId]}
                    onApprove={() => updateStatus(candidate.id, "approved")}
                    onReject={() => updateStatus(candidate.id, "rejected")}
                />
            ))
        )}
      </div>

    </div>
  );
}

// --- Components ---

function FilterTab({ label, count, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2
                ${active ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}
            `}
        >
            {label}
            {count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? "bg-indigo-100 text-indigo-700" : "bg-slate-200 text-slate-600"}`}>
                    {count}
                </span>
            )}
        </button>
    );
}

function CandidateCard({ candidate, postName, onApprove, onReject }) {
    const isPending = candidate.status === "pending";
    
    // Status Styles
    const statusStyles = {
        approved: "bg-green-50 border-green-200",
        rejected: "bg-red-50 border-red-200 opacity-75",
        pending: "bg-white border-slate-200"
    };

    return (
        <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${statusStyles[candidate.status]}`}>
            
            {/* Candidate Info */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 overflow-hidden">
                    {/* Placeholder for Avatar */}
                    <User size={24} />
                </div>
                <div>
                    <h4 className="font-semibold text-slate-900">{candidate.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="font-medium text-indigo-600">{postName || candidate.postId}</span>
                        <span>•</span>
                        <span>{candidate.department} ({candidate.year})</span>
                    </div>
                </div>
            </div>

            {/* Actions & Meta */}
            <div className="flex items-center gap-3 self-end md:self-auto">
                {/* Manifesto Trigger */}
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
                    <FileText size={14} /> View Details
                </button>

                <div className="w-px h-8 bg-slate-200 mx-1 hidden md:block" />

                {/* Decision Buttons */}
                {isPending ? (
                    <div className="flex items-center gap-2">
                         <button 
                            onClick={onReject}
                            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors"
                        >
                            <X size={16} /> Reject
                        </button>
                        <button 
                            onClick={onApprove}
                            className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
                        >
                            <Check size={16} /> Approve
                        </button>
                    </div>
                ) : (
                    <div className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5
                        ${candidate.status === 'approved' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}
                    `}>
                        {candidate.status === 'approved' ? <Check size={14}/> : <X size={14}/>}
                        {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                    </div>
                )}
            </div>
        </div>
    );
}

function EmptyState({ filter }) {
    return (
        <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <p>No candidates found in <strong>{filter}</strong>.</p>
        </div>
    );
}