import { useState, useMemo } from "react";
import { 
  UploadCloud, 
  FileSpreadsheet, 
  Search, 
  Filter, 
  User, 
  Trash2, 
  Lock, 
  Download,
  CheckCircle2
} from "lucide-react";
import PageHeader from "../../components/PageHeader.jsx";
import { useElection } from "../../context/ElectionContext.jsx";

export default function VoterManagement() {
  const { voters, setVoters } = useElection();
  const [activeTab, setActiveTab] = useState("list"); // list | import
  const [search, setSearch] = useState("");
  const [isFinalized, setIsFinalized] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  // Derived State for Filtering
  const filteredVoters = useMemo(() => {
    return voters.filter(v => 
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.department.toLowerCase().includes(search.toLowerCase())
    );
  }, [voters, search]);

  function simulateImport() {
    setIsImporting(true);
    setTimeout(() => {
        const newVoters = Array.from({ length: 5 }).map((_, i) => ({
            id: `v-${Date.now()}-${i}`,
            name: `Imported Student ${i + 1}`,
            department: ["Engineering", "Science", "Arts"][Math.floor(Math.random() * 3)],
            year: "2024",
            hasVoted: false,
        }));
        setVoters(prev => [...prev, ...newVoters]);
        setIsImporting(false);
        setActiveTab("list"); // Auto-switch to list to show results
    }, 1500);
  }

  function handleFinalize() {
    if(window.confirm("Finalizing the list will lock it for the election. Continue?")) {
        setIsFinalized(true);
    }
  }

  function deleteVoter(id) {
    if (isFinalized) return;
    setVoters(prev => prev.filter(v => v.id !== id));
  }

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* 1. Enhanced Header with Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <PageHeader
            title="Voter Registry"
            subtitle={`Manage the ${voters.length} eligible voters for this election.`}
        />
        
        {/* The "Lock" Action */}
        <button
            onClick={handleFinalize}
            disabled={isFinalized || voters.length === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${isFinalized 
                    ? "bg-green-100 text-green-700 border border-green-200 cursor-default" 
                    : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                }
            `}
        >
            {isFinalized ? (
                <> <Lock size={16} /> Voter List Finalized </>
            ) : (
                <> <CheckCircle2 size={16} /> Finalize List </>
            )}
        </button>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="border-b border-slate-200 mb-6 flex gap-6">
        <TabButton 
            label="Voter List" 
            isActive={activeTab === 'list'} 
            onClick={() => setActiveTab('list')} 
        />
        {!isFinalized && (
            <TabButton 
                label="Import Data" 
                isActive={activeTab === 'import'} 
                onClick={() => setActiveTab('import')} 
            />
        )}
      </div>

      {/* 3. Content Area */}
      <div>
        {activeTab === "import" && (
            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
                    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UploadCloud size={32} />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-slate-900">Upload Voter Data</h3>
                    <p className="text-slate-500 text-sm mt-1 mb-6">
                        Upload a CSV file containing student names, IDs, and departments.
                    </p>

                    {/* Drag Drop Zone */}
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 mb-6 hover:bg-slate-50 transition-colors cursor-pointer group">
                        <p className="text-sm text-slate-500 group-hover:text-indigo-600 font-medium">
                            Click to browse or drag file here
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                            Supported: .csv, .xlsx (Max 5MB)
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <button className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1">
                            <Download size={14} /> Download Template
                        </button>
                        <button
                            onClick={simulateImport}
                            disabled={isImporting}
                            className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-70"
                        >
                            {isImporting ? "Processing..." : "Simulate Import"}
                        </button>
                    </div>
                </div>
            </div>
        )}

        {activeTab === "list" && (
            <div className="space-y-4 animate-in fade-in">
                {/* Search Toolbar */}
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            placeholder="Search by name or department..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                        <Filter size={18} />
                    </button>
                </div>

                {/* Voter Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">Student Name</th>
                                <th className="px-6 py-3">Department</th>
                                <th className="px-6 py-3">Status</th>
                                {!isFinalized && <th className="px-6 py-3 text-right">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredVoters.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                                        No voters found. Try importing data.
                                    </td>
                                </tr>
                            ) : (
                                filteredVoters.map((voter) => (
                                    <tr key={voter.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                                    <User size={14} />
                                                </div>
                                                <span className="font-medium text-slate-900">{voter.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 text-slate-600">{voter.department}</td>
                                        <td className="px-6 py-3">
                                            {voter.hasVoted ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                                                    Voted
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                                                    Not Voted
                                                </span>
                                            )}
                                        </td>
                                        {!isFinalized && (
                                            <td className="px-6 py-3 text-right">
                                                <button 
                                                    onClick={() => deleteVoter(voter.id)}
                                                    className="text-slate-400 hover:text-red-600 transition-colors"
                                                    title="Remove Voter"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                
                <p className="text-xs text-slate-400 text-center mt-4">
                    Showing {filteredVoters.length} records
                </p>
            </div>
        )}
      </div>
    </div>
  );
}

// Sub-component for Cleaner Tabs
function TabButton({ label, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                isActive 
                ? "border-indigo-600 text-indigo-600" 
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
        >
            {label}
        </button>
    );
}