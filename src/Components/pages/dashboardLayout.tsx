import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DashboardLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/dashboard/login");
  };

  const isViewPage = location.pathname.includes("/dashboard/view");

  useEffect(() => {
    // Redirect to login if not logged in and trying to access protected pages
    if (!isLoggedIn && location.pathname === "/dashboard/add") {
      navigate("/dashboard/login");
    }
  }, [isLoggedIn, location, navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top Navbar (for View Blogs page) */}
      {isViewPage && (
        <header className="flex justify-between items-center px-6 py-4 bg-gray-900 shadow-lg">
          <h1 className="text-2xl font-bold">📰 Blog Dashboard</h1>
          {!isLoggedIn ? (
            <Link
              to="/dashboard/login"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Logout
            </button>
          )}
        </header>
      )}

      <div className="flex flex-1">
        {/* Sidebar (only visible when logged in and NOT on /view) */}
        {isLoggedIn && !isViewPage && (
          <aside className="w-64 bg-gray-900 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-6 text-center">Dashboard</h2>
              <nav className="space-y-4">
                <Link
                  to="/dashboard/view"
                  className="block hover:text-blue-400"
                >
                  View Blogs
                </Link>
                <Link to="/dashboard/add" className="block hover:text-blue-400">
                  Add Blog
                </Link>
              </nav>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 rounded"
            >
              Logout
            </button>
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet context={{ isLoggedIn, setIsLoggedIn }} />
        </main>
      </div>
    </div>
  );
}
