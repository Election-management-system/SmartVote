import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  FileText, 
  Save, 
  AlertCircle,
  CheckCircle2,
  Info 
} from "lucide-react";
import PageHeader from "../../components/PageHeader.jsx";
import { useElection } from "../../context/ElectionContext.jsx";

export default function ElectionNew() {
  const { electionSetup, setElectionSetup } = useElection();
  
  // Grouping state for easier management, though flat state is fine too
  const [form, setForm] = useState({
    name: electionSetup.name || "",
    academicYear: electionSetup.academicYear || "",
    start: "",
    end: "",
    nominationStart: "",
    nominationEnd: "",
    campaignStart: "",
    campaignEnd: "",
    rules: "",
  });
  
  const [status, setStatus] = useState("idle"); // idle, saving, success

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (status === "success") setStatus("idle");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    
    // Simulate network request
    setTimeout(() => {
        setElectionSetup((prev) => ({
        ...prev,
        name: form.name,
        academicYear: form.academicYear,
        }));
        setStatus("success");
    }, 600);
  }

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <PageHeader
        title="Configure Election"
        subtitle="Define the core identity, critical timelines, and rules."
      />

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        
        {/* SECTION 1: IDENTITY */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                <Info size={18} className="text-slate-500" />
                <h3 className="font-semibold text-slate-800">Basic Information</h3>
            </div>
            <div className="p-6 grid gap-6 sm:grid-cols-2">
                <InputField 
                    label="Election Name" 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    placeholder="e.g. Student Council 2025"
                    helper="This will be visible to all voters."
                />
                <InputField 
                    label="Academic Year" 
                    name="academicYear" 
                    value={form.academicYear} 
                    onChange={handleChange}
                    placeholder="e.g. 2024-2025" 
                />
            </div>
        </section>

        {/* SECTION 2: TIMELINE (The Critical UX Upgrade) */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                <Calendar size={18} className="text-slate-500" />
                <h3 className="font-semibold text-slate-800">Election Schedule</h3>
            </div>
            
            <div className="p-6 space-y-8">
                {/* Visual Connector Line could go here in a more complex CSS setup */}
                
                <DateRangeGroup 
                    title="1. Nomination Period"
                    description="When candidates can submit their applications."
                    startName="nominationStart"
                    endName="nominationEnd"
                    form={form}
                    onChange={handleChange}
                    color="blue"
                />

                <div className="border-t border-slate-100" />

                <DateRangeGroup 
                    title="2. Campaigning Period"
                    description="Approved candidates can campaign."
                    startName="campaignStart"
                    endName="campaignEnd"
                    form={form}
                    onChange={handleChange}
                    color="purple"
                />

                <div className="border-t border-slate-100" />

                <DateRangeGroup 
                    title="3. Voting Day(s)"
                    description="The actual election window."
                    startName="start"
                    endName="end"
                    form={form}
                    onChange={handleChange}
                    color="green" // Green signals the 'Go' or 'Live' phase
                />
            </div>
        </section>

        {/* SECTION 3: RULES */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                <FileText size={18} className="text-slate-500" />
                <h3 className="font-semibold text-slate-800">Guidelines & Rules</h3>
            </div>
            <div className="p-6">
                <label className="block mb-2 font-medium text-slate-700">Election Rules</label>
                <textarea
                    name="rules"
                    value={form.rules}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Enter eligibility criteria, voting instructions, etc..."
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all text-sm"
                />
                <p className="mt-2 text-xs text-slate-500">
                    These rules will be displayed on the voting page for students to read.
                </p>
            </div>
        </section>

        {/* ACTIONS */}
        <div className="flex items-center justify-end gap-4 pt-4">
            {status === "success" && (
                <span className="flex items-center gap-2 text-sm text-emerald-600 animate-in fade-in slide-in-from-right-4">
                    <CheckCircle2 size={16} /> Changes saved successfully
                </span>
            )}
            
            <button
                type="submit"
                disabled={status === "saving"}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
                {status === "saving" ? (
                    "Saving..."
                ) : (
                    <>
                        <Save size={16} /> Save Configuration
                    </>
                )}
            </button>
        </div>

      </form>
    </div>
  );
}

// --- Sub-components for cleaner code ---

function InputField({ label, name, value, onChange, placeholder, helper }) {
    return (
        <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">{label}</label>
            <input
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            {helper && <p className="mt-1.5 text-xs text-slate-500">{helper}</p>}
        </div>
    );
}

function DateRangeGroup({ title, description, startName, endName, form, onChange, color }) {
    // Map colors to ring classes
    const colorClasses = {
        blue: "focus-within:ring-blue-500",
        purple: "focus-within:ring-purple-500",
        green: "focus-within:ring-green-500"
    };

    return (
        <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-1">
                <h4 className="font-medium text-slate-900">{title}</h4>
                <p className="text-xs text-slate-500 mt-1">{description}</p>
            </div>
            
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <div className="relative group">
                    <label className="absolute -top-2.5 left-2 bg-white px-1 text-xs font-medium text-slate-500 group-focus-within:text-slate-900 transition-colors">
                        Start Date
                    </label>
                    <input
                        type="datetime-local"
                        name={startName}
                        value={form[startName]}
                        onChange={onChange}
                        className={`w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:border-transparent transition-all ${colorClasses[color]}`}
                    />
                </div>

                <div className="relative group">
                    <label className="absolute -top-2.5 left-2 bg-white px-1 text-xs font-medium text-slate-500 group-focus-within:text-slate-900 transition-colors">
                        End Date
                    </label>
                    <input
                        type="datetime-local"
                        name={endName}
                        value={form[endName]}
                        onChange={onChange}
                        className={`w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:border-transparent transition-all ${colorClasses[color]}`}
                    />
                </div>
            </div>
        </div>
    );
}