import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Menu, LayoutDashboard, LogOut } from "lucide-react";
import { useState } from "react";

interface UserType {
  id?: string;
  name: string;
  picture?: string;
  role?: string;
}

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  // ✅ Get user from localStorage (as fallback)
  const storedUser = JSON.parse(
    localStorage.getItem("user") || "null"
  ) as UserType | null;

  // ✅ Hydrate React Query cache on first load if missing
  const cachedUser = queryClient.getQueryData<UserType>(["user"]) || storedUser;
  if (!queryClient.getQueryData(["user"]) && storedUser) {
    queryClient.setQueryData(["user"], storedUser);
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ React Query logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Could call an API endpoint here if you have one for logout
      return new Promise((resolve) => {
        localStorage.clear();
        queryClient.clear();
        resolve(true);
      });
    },
    onSuccess: () => {
      navigate("/dashboard/login", { replace: true });
    },
  });

  const handleLogout = () => logoutMutation.mutate();

  const navLinks = [
    {
      name: "Blogs",
      path: "/dashboard/view",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Projects",
      path: "/dashboard/projects/view",
      icon: <LayoutDashboard size={18} />,
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
          <h2 className="text-xl font-bold mb-6 text-center">
            Admin Dashboard
          </h2>
          {/* Profile Image */}
          {/* {cachedUser && (
            <div className="text-center mb-6">
              <img
                src={cachedUser.picture || "/default-avatar.png"}
                alt="Profile"
                className="w-16 h-16 rounded-full mx-auto mb-2 border border-gray-700 object-cover"
              />
              <p className="font-medium">{cachedUser.name}</p>
              <p className="text-gray-400 text-sm">
                {cachedUser.role || "Admin"}
              </p>
            </div>
          )} */}

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
            disabled={logoutMutation.isPending}
            className={`mt-8 flex items-center gap-2 w-full justify-center py-2 rounded-lg transition-colors 
              ${
                logoutMutation.isPending
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
          >
            <LogOut size={18} />
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </button>
        </aside>

        {/* Overlay for Mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 bg-black overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
