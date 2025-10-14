import { Link, Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <nav className="flex flex-col gap-3">
          <Link
            to="add"
            className={`${
              pathname.includes("add") ? "text-blue-400" : "text-white"
            } hover:text-blue-400 transition`}
          >
            ➕ Add Blog
          </Link>

          <Link
            to="view"
            className={`${
              pathname.includes("view") ? "text-blue-400" : "text-white"
            } hover:text-blue-400 transition`}
          >
            📜 Manage Blogs
          </Link>
        </nav>

        <div className="mt-auto text-sm text-gray-400 pt-6 border-t border-gray-700">
          © {new Date().getFullYear()} Blog Dashboard
        </div>
      </aside>

      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
