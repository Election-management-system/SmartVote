import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader.jsx";
import { useElection } from "../../context/ElectionContext.jsx";

export default function Ballot() {
  const {
    electionSetup,
    posts,
    candidates,
    currentVoter,
    pendingBallot,
    setPendingBallot,
  } = useElection();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentVoter) {
      // mock: force login
      navigate("/voter/login");
    }
  }, [currentVoter, navigate]);

  if (!currentVoter) return null;

  const electionActive = electionSetup.isElectionActive; // currently false in mock

  if (!electionActive) {
    return (
      <div>
        <PageHeader
          title="Ballot not available"
          subtitle="Election is not currently active."
        />
        <p className="text-sm text-gray-600">
          Please check again during the scheduled voting period.
        </p>
      </div>
    );
  }

  function selectCandidate(postId, candidateId) {
    setPendingBallot((prev) => ({ ...prev, [postId]: candidateId }));
  }

  function handleReview() {
    navigate("/voter/review");
  }

  const approvedCandidates = candidates.filter((c) => c.status === "approved");

  return (
    <div>
      <PageHeader
        title="Electronic Ballot"
        subtitle={`Welcome, ${currentVoter.name}. Please select one candidate per post.`}
      />
      <div className="space-y-4">
        {posts.map((post) => {
          const options = approvedCandidates.filter(
            (c) => c.postId === post.id
          );
          return (
            <div
              key={post.id}
              className="bg-white p-4 rounded-xl border border-slate-100"
            >
              <h3 className="font-semibold mb-2">{post.name}</h3>
              {options.length === 0 && (
                <p className="text-xs text-gray-500">
                  No approved candidates for this post.
                </p>
              )}
              <div className="space-y-2">
                {options.map((c) => (
                  <label
                    key={c.id}
                    className="flex items-center gap-2 text-sm bg-slate-50 border border-slate-200 rounded-md px-3 py-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={post.id}
                      checked={pendingBallot[post.id] === c.id}
                      onChange={() => selectCandidate(post.id, c.id)}
                    />
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-gray-500">
                        {c.department} · {c.year} year
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={handleReview}
        className="mt-4 bg-slate-900 text-white px-4 py-2 rounded-md text-sm"
      >
        Review Vote
      </button>
    </div>
  );
}
