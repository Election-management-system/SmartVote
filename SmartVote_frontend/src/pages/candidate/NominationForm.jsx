import { useState } from "react";
import PageHeader from "../../components/PageHeader.jsx";
import { useElection } from "../../context/ElectionContext.jsx";

export default function NominationForm() {
  const { electionSetup, posts, candidates, setCandidates } = useElection();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    postId: posts[0]?.id ?? "",
    name: "",
    department: "",
    year: "",
    manifesto: "",
  });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCandidates([
      ...candidates,
      {
        id: `c-${Date.now()}`,
        ...form,
        status: "pending",
      },
    ]);
    setSubmitted(true);
  }

  return (
    <div>
      <PageHeader
        title="Candidate Nomination"
        subtitle={`Election: ${electionSetup.name}`}
      />
      {submitted && (
        <div className="mb-3 text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded p-2">
          Nomination submitted – pending admin verification (mock).
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 text-sm space-y-3"
      >
        <div>
          <label className="block mb-1 font-medium">Post</label>
          <select
            name="postId"
            value={form.postId}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          >
            {posts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field name="name" label="Full name" value={form.name} onChange={handleChange} />
          <Field name="department" label="Department" value={form.department} onChange={handleChange} />
          <Field name="year" label="Year" value={form.year} onChange={handleChange} />
        </div>
        <div>
          <label className="block mb-1 font-medium">Manifesto</label>
          <textarea
            name="manifesto"
            value={form.manifesto}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Upload manifesto (mock)</label>
          <div className="border border-dashed border-slate-300 rounded-md p-4 text-xs text-gray-500">
            File upload UI goes here (non-functional).
          </div>
        </div>
        <button
          type="submit"
          className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm"
        >
          Submit Nomination
        </button>
      </form>
    </div>
  );
}

function Field({ name, label, value, onChange }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-md px-3 py-2"
      />
    </div>
  );
}
