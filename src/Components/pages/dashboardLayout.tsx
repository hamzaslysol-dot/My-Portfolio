import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  LayoutDashboard,
  PlusSquare,
  LogOut,
  BookOpen,
} from "lucide-react";
import Blog from "../Blog";
export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/dashboard/login", { replace: true });
  };

  // Define sidebar links
  const navLinks = [
    {
      name: "Manage Blogs",
      path: "/dashboard/view",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Add Blog",
      path: "/dashboard/add",
      icon: <PlusSquare size={18} />,
    },
    {
      name: "View Blogs",
      path: "/blog",
      icon: <BookOpen size={18} />,
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Mobile Toggle */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-gray-900">
        <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded hover:bg-gray-800"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-gray-900 p-6 transform transition-transform duration-300 
            ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0`}
        >
          <h2 className="text-xl font-bold mb-6 text-center">Admin Panel</h2>

          {user && (
            <div className="flex flex-col items-center mb-8">
              <img
                src={user.picture}
                alt="Profile"
                className="w-16 h-16 rounded-full mb-2 border border-gray-700"
              />
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-400 text-sm">Admin</p>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 
                  ${
                    location.pathname === link.path
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-800 text-gray-300"
                  }`}
                onClick={() => setSidebarOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-8 flex items-center gap-2 bg-red-600 w-full justify-center py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </aside>

        {/* Overlay for Mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
        )}

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6 md:p-8 bg-black overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
