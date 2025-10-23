// src/components/DashboardSidebar.tsx
import { Link, useLocation } from "react-router-dom";

export default function DashboardSidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard Home", path: "/dashboard" },
    { name: "Add Blog", path: "/dashboard/add" },
    { name: "View Blogs", path: "/dashboard/view" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <h1 className="text-2xl font-bold p-4 border-b border-gray-700">
        Admin Panel
      </h1>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-4 py-2 rounded-md ${
              location.pathname === link.path
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <button className="m-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}
