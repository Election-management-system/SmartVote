import { Outlet, NavLink, useNavigate } from "react-router-dom";



const navItems = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/elections/new", label: "New Election" },
  { to: "/admin/voters", label: "Voters" },
  { to: "/admin/nominations", label: "Nominations" },
  { to: "/admin/live-dashboard", label: "Live Dashboard" },
  { to: "/admin/results-processing", label: "Results" },
  { to: "/admin/reports", label: "Reports" },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col">
        <div className="px-4 py-4 text-lg font-semibold border-b border-slate-700">
          Admin Panel
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm ${
                  isActive
                    ? "bg-slate-700 text-white"
                    : "text-slate-200 hover:bg-slate-800"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => navigate("/admin/login")}
          className="m-3 mt-auto text-sm border border-slate-600 rounded-md py-1"
        >
          Logout
        </button>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
          <h1 className="font-semibold">Election Management</h1>
          <span className="text-xs text-gray-500">
            Logged in as <strong>Admin</strong>
          </span>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
