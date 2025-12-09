const phasesMap = {
  "pre-election": {
    label: "Pre-Election",
    color: "bg-blue-100 text-blue-700",
  },
  "election-day": {
    label: "Election Day",
    color: "bg-green-100 text-green-700",
  },
  "post-election": {
    label: "Post-Election",
    color: "bg-purple-100 text-purple-700",
  },
};

export default function PhaseIndicator({ phase = "pre-election" }) {
  const data = phasesMap[phase];
  if (!data) return null;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${data.color}`}
    >
      {data.label}
    </span>
  );
}
