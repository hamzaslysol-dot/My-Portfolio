import { useNavigate, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/dashboard/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        {user && (
          <div className="flex flex-col items-center mb-6">
            <img
              src={user.picture}
              alt="Profile"
              className="w-16 h-16 rounded-full mb-2"
            />
            <p>{user.name}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
