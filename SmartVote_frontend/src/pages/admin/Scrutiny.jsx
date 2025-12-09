import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Search, 
  Filter, 
  FileText, 
  AlertCircle,
  MoreVertical,
  Eye
} from 'lucide-react';
import { useElection } from '../../context/ElectionContext';
import PageHeader from '../../components/PageHeader'; // Assuming consistent header usage

const Scrutiny = () => {
  const { candidates, updateCandidateStatus } = useElection();
  const [filter, setFilter] = useState('Pending');
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for the Rejection Logic
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Derived state
  const filteredCandidates = candidates.filter(c => {
    const matchesStatus = filter === 'All' ? true : c.status === filter;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.post.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleApprove = (id) => {
    // In production: Add confirmation toast
    updateCandidateStatus(id, 'Approved');
  };

  const confirmRejection = () => {
    if (!rejectionReason.trim()) return;
    updateCandidateStatus(rejectingId, 'Rejected', rejectionReason); // Assuming your context supports reasons
    setRejectingId(null);
    setRejectionReason('');
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <PageHeader 
        title="Nomination Scrutiny" 
        subtitle="Verify candidate eligibility and approve nominations."
      />

      {/* 1. Control Bar: Tabs & Search */}
      <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm p-4 sticky top-4 z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Status Tabs */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg self-start">
                {['Pending', 'Approved', 'Rejected', 'All'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                            filter === tab 
                            ? 'bg-white text-slate-900 shadow-sm' 
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        {tab}
                        {/* Optional: Add counters here if data is available */}
                    </button>
                ))}
            </div>

            {/* Search Field */}
            <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by name or post..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
            </div>
        </div>
      </div>

      {/* 2. The Scrutiny List */}
      <div className="mt-6 space-y-4">
        {filteredCandidates.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-slate-500">
                <p>No candidates found matching <strong>{filter}</strong>.</p>
            </div>
        ) : (
            filteredCandidates.map((candidate) => (
                <div 
                    key={candidate.id} 
                    className={`bg-white p-5 rounded-xl border transition-all flex flex-col md:flex-row gap-6 md:items-center justify-between
                        ${candidate.status === 'Rejected' ? 'border-red-100 bg-red-50/30' : 'border-slate-200 hover:border-indigo-300'}
                    `}
                >
                    {/* Candidate Info */}
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg shrink-0">
                            {candidate.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">{candidate.name}</h3>
                            <div className="text-sm text-slate-500 flex flex-wrap gap-x-3 gap-y-1 mt-1">
                                <span className="text-indigo-600 font-medium">{candidate.post}</span>
                                <span className="hidden sm:inline">•</span>
                                <span>{candidate.dept}</span>
                            </div>
                            
                            {/* Document / Proof Link */}
                            <button className="flex items-center gap-1 text-xs text-slate-500 mt-2 hover:text-indigo-600 transition-colors">
                                <FileText size={12} /> View Manifesto & Docs
                            </button>
                        </div>
                    </div>

                    {/* Action Area */}
                    <div className="flex items-center gap-3 self-end md:self-auto">
                        {candidate.status === 'Pending' ? (
                            <>
                                <button 
                                    onClick={() => setRejectingId(candidate.id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 hover:border-red-200 transition-colors"
                                >
                                    <X size={16} /> Reject
                                </button>
                                <button 
                                    onClick={() => handleApprove(candidate.id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm"
                                >
                                    <Check size={16} /> Approve
                                </button>
                            </>
                        ) : (
                            <StatusBadge status={candidate.status} />
                        )}
                    </div>
                </div>
            ))
        )}
      </div>

      {/* 3. Rejection Modal (Reasoning) */}
      {rejectingId && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center gap-3 text-red-600 bg-red-50">
                    <AlertCircle size={20} />
                    <h3 className="font-semibold">Reject Nomination</h3>
                </div>
                <div className="p-6">
                    <p className="text-sm text-slate-600 mb-4">
                        Please provide a reason for rejecting this candidate. This will be visible to the student.
                    </p>
                    <textarea 
                        className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                        rows={3}
                        placeholder="e.g. CGPA below criteria, Disciplinary record found..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        autoFocus
                    />
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <button 
                        onClick={() => setRejectingId(null)}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={confirmRejection}
                        disabled={!rejectionReason.trim()}
                        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Confirm Rejection
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

// Sub-component for consistent badge styling
const StatusBadge = ({ status }) => {
    const styles = {
        Approved: "bg-green-100 text-green-700 border-green-200",
        Rejected: "bg-red-100 text-red-700 border-red-200",
        Pending: "bg-yellow-50 text-yellow-700 border-yellow-200"
    };
    
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles.Pending} flex items-center gap-1.5`}>
            {status === 'Approved' && <Check size={12} />}
            {status === 'Rejected' && <X size={12} />}
            {status}
        </span>
    );
};

export default Scrutiny;