import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2">Thank you for voting!</h2>
      <p className="text-sm text-gray-600 mb-4">
        Your vote has been securely recorded and will be included in the final
        tally.
      </p>
      <Link
        to="/"
        className="inline-block bg-slate-900 text-white px-4 py-2 rounded-md text-sm"
      >
        Back to Home
      </Link>
    </div>
  );
}
