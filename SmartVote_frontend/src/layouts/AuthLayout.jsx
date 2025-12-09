import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <Link to="/" className="block text-center mb-4 text-sm text-gray-500">
          ← Back to home
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
