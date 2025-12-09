import { Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";

import LandingRoleSelect from "./pages/LandingRoleSelect.jsx";

import AdminLogin from "./pages/auth/AdminLogin.jsx";
import VoterLogin from "./pages/auth/VoterLogin.jsx";
import CandidateLogin from "./pages/auth/CandidateLogin.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ElectionNew from "./pages/admin/ElectionNew.jsx";
import ElectionSettings from "./pages/admin/ElectionSettings.jsx";
import VoterManagement from "./pages/admin/VoterManagement.jsx";
import NominationsAdmin from "./pages/admin/NominationsAdmin.jsx";
import LiveDashboard from "./pages/admin/LiveDashboard.jsx";
import ResultsProcessing from "./pages/admin/ResultsProcessing.jsx";
import Reports from "./pages/admin/Reports.jsx";

import NominationForm from "./pages/candidate/NominationForm.jsx";

import Ballot from "./pages/voter/Ballot.jsx";
import ReviewVote from "./pages/voter/ReviewVote.jsx";
import ThankYou from "./pages/voter/ThankYou.jsx";

import CandidateListPublic from "./pages/public/CandidateListPublic.jsx";
import ResultsPublic from "./pages/public/ResultsPublic.jsx";

export default function App() {
  return (
    <Routes>
      {/* 🔹 PublicLayout wraps EVERYTHING so navbar + footer show on all pages */}
      <Route element={<PublicLayout />}>

        {/* Public pages */}
        <Route path="/" element={<LandingRoleSelect />} />
        <Route path="/results" element={<ResultsPublic />} />
        <Route
          path="/election/:electionId/candidates"
          element={<CandidateListPublic />}
        />

        {/* Auth routes (login pages) */}
        <Route element={<AuthLayout />}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/voter/login" element={<VoterLogin />} />
          <Route path="/candidate/login" element={<CandidateLogin />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="elections/new" element={<ElectionNew />} />
          <Route
            path="elections/:electionId/settings"
            element={<ElectionSettings />}
          />
          <Route path="voters" element={<VoterManagement />} />
          <Route path="nominations" element={<NominationsAdmin />} />
          <Route path="live-dashboard" element={<LiveDashboard />} />
          <Route path="results-processing" element={<ResultsProcessing />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Voter routes */}
        <Route element={<AuthLayout />}>
          <Route path="/voter/ballot" element={<Ballot />} />
          <Route path="/voter/review" element={<ReviewVote />} />
          <Route path="/voter/thank-you" element={<ThankYou />} />
        </Route>

        {/* Candidate routes */}
        <Route element={<AuthLayout />}>
          <Route path="/candidate/nomination" element={<NominationForm />} />
        </Route>

      </Route>
    </Routes>
  );
}
