export default function StatCard({ label, value, hint }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
