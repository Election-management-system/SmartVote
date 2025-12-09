import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader.jsx";
import { useElection } from "../../context/ElectionContext.jsx";

export default function ReviewVote() {
  const {
    posts,
    candidates,
    pendingBallot,
    voters,
    currentVoter,
    setVoters,
  } = useElection();
  const navigate = useNavigate();

  const candidateMap = Object.fromEntries(
    candidates.map((c) => [c.id, c])
  );

  function handleConfirm() {
    if (currentVoter) {
      setVoters((prev) =>
        prev.map((v) =>
          v.id === currentVoter.id ? { ...v, hasVoted: true } : v
        )
      );
    }
    navigate("/voter/thank-you");
  }

  return (
    <div>
      <PageHeader
        title="Review Your Selections"
        subtitle="Verify your choices before submitting your vote."
      />
      <div className="space-y-3">
        {posts.map((post) => {
          const selectedCandidateId = pendingBallot[post.id];
          const candidate = selectedCandidateId
            ? candidateMap[selectedCandidateId]
            : null;
          return (
            <div
              key={post.id}
              className="bg-white rounded-xl border border-slate-100 p-3 text-sm"
            >
              <p className="font-semibold">{post.name}</p>
              <p className="mt-1 text-gray-700">
                {candidate ? candidate.name : "No candidate selected."}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => navigate("/voter/ballot")}
          className="px-3 py-2 rounded-md border border-slate-200 text-sm"
        >
          Back to Edit Choices
        </button>
        <button
          onClick={handleConfirm}
          className="px-3 py-2 rounded-md bg-slate-900 text-white text-sm"
        >
          Confirm & Submit Vote
        </button>
      </div>
    </div>
  );
}
