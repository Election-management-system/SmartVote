import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

export default function PublicLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white relative">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          
          {/* Logo */}
{/* Logo */}
{/* Logo */}
<Link to="/" className="text-lg font-bold">
  <span className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
    Smart
  </span>
  <span className="text-purple-600 hover:text-purple-800 transition-colors duration-300">
    Vote
  </span>
</Link>
          {/* Navbar */}
          <nav className="flex gap-6 text-sm items-center relative">
            <Link to="/results" className="hover:underline">
              <b>Results</b> 
            </Link>

            {/* Dropdown Menu */}
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              // onMouseLeave={() => setOpen(false)}
            >
           <button
  onClick={() => setOpen(!open)}
  className="hover:underline"
>
  <b>Login ▾</b>
</button>

{/* Dropdown box */}
{open && (
  <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg border rounded-md z-50">
    <Link
      to="/admin/login"
      onClick={() => setOpen(false)}
      className="block px-3 py-2 hover:bg-gray-100 text-sm"
    >
      Admin
    </Link>

    <Link
      to="/voter/login"
      onClick={() => setOpen(false)}
      className="block px-3 py-2 hover:bg-gray-100 text-sm"
    >
      Voter
    </Link>

    <Link
      to="/candidate/login"
      onClick={() => setOpen(false)}
      className="block px-3 py-2 hover:bg-gray-100 text-sm"
    >
      Candidate
    </Link>
  </div>
)}

              
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t bg-white text-xs text-center py-3 text-gray-500">
        © {new Date().getFullYear()} University Election System
      </footer>
    </div>
  );
}
