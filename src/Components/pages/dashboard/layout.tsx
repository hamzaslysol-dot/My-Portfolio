import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import { Menu, LayoutDashboard, LogOut, User } from "lucide-react";
import axios from "axios";

interface UserType {
  id?: string;
  name: string;
  picture?: string;
  role?: string;
}

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const storedUser = JSON.parse(
    localStorage.getItem("user") || "null"
  ) as UserType | null;
  const [user, setUser] = useState<UserType | null>(storedUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/dashboard/login", { replace: true });
  };

  // ✅ Upload profile image to backend
  const handleProfileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const formData = new FormData();
    formData.append("image", file); // must match multer.single("image")

    try {
      const res = await axios.post<{ url: string }>(
        "http://localhost:8000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const imageUrl = res.data.url;

      // Optionally: Save permanently in backend
      await axios.put(
        `http://localhost:8000/api/users/${user.id}/profile`,
        { picture: imageUrl },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // Update locally
      const updatedUser = { ...user, picture: imageUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error: any) {
      console.error(
        "❌ Failed to upload image:",
        error.response || error.message
      );
      alert("Failed to upload image. Check backend console for details.");
    }
  };

  const navLinks = [
    {
      name: "Blogs",
      path: "/dashboard/view",
      icon: <LayoutDashboard size={18} />,
    },
    { name: "Author", path: "", icon: <LayoutDashboard size={18} /> },
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
              {/* Upload Button */}
              <label className="flex items-center justify-center mb-2 cursor-pointer gap-2 text-blue-400 hover:text-blue-500">
                <User size={16} />
                Set Profile
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileChange}
                  className="hidden"
                />
              </label>

              <img
                src={user.picture || "/default-avatar.png"}
                alt="Profile"
                className="w-16 h-16 rounded-full mb-2 border border-gray-700 object-cover"
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

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 bg-black overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
