import { createContext, useContext, useState } from "react";

const ElectionContext = createContext(null);

export const useElection = () => useContext(ElectionContext);

export function ElectionProvider({ children }) {
  const [electionSetup, setElectionSetup] = useState({
    id: "1",
    name: "University Student Council Election",
    academicYear: "2025-26",
    isNominationPeriodActive: true,
    isElectionActive: true,
    isResultsPublished: false,
  });

  const [posts, setPosts] = useState([
    { id: "p1", name: "President" },
    { id: "p2", name: "General Secretary" },
    { id: "p3", name: "Treasurer" },
  ]);

  const [voters, setVoters] = useState([
    {
      id: "v1",
      name: "Aditi Sharma",
      department: "Engineering",
      year: "Third",
      hasVoted: false,
    },
    {
      id: "v2",
      name: "Rahul Verma",
      department: "Business",
      year: "Second",
      hasVoted: true,
    },
  ]);

  const [candidates, setCandidates] = useState([
    {
      id: "c1",
      name: "Rohan Singh",
      postId: "p1",
      department: "Engineering",
      year: "Third",
      status: "approved",
      manifesto: "Better campus facilities",
    },
    {
      id: "c2",
      name: "Priya Mehta",
      postId: "p1",
      department: "Science",
      year: "Second",
      status: "approved",
      manifesto: "Green campus",
    },
  ]);

  // aggregated vote counts (simple)
  const [results, setResults] = useState({
    turnoutByDepartment: {
      Engineering: 68,
      Science: 54,
      Business: 72,
      Arts: 49,
      Law: 60,
      Medicine: 40,
    },
    winnersByPost: {
      p1: "c1", // President winner id
    },
    votesByCandidate: {
      c1: 520,
      c2: 480,
    },
  });

  const [currentVoter, setCurrentVoter] = useState(null);
  const [pendingBallot, setPendingBallot] = useState({}); // { postId: candidateId }

  const value = {
    electionSetup,
    setElectionSetup,
    posts,
    setPosts,
    voters,
    setVoters,
    candidates,
    setCandidates,
    results,
    setResults,
    currentVoter,
    setCurrentVoter,
    pendingBallot,
    setPendingBallot,
  };

  return (
    <ElectionContext.Provider value={value}>
      {children}
    </ElectionContext.Provider>
  );
}
