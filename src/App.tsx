import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import Home from "./components/home/home";
import About from "./components/home/about";
import Experience from "./components/home/experience";
import Landing from "./components/home/landing";
import Services from "./components/home/services";
import MyWork from "./components/home/myWork";
import Contact from "./components/home/contact";
import Navbar from "./components/common/navBar";
import BlogDetail from "./components/pages/blogs/detail";
import DashboardLayout from "./components/pages/dashboard/layout";
import ManageBlogs from "./components/pages/blogs/manage";
import LoginPage from "./components/pages/dashboard/login";
import Blog from "./components/pages/blogs/blog";
import AddBlogForm from "./components/pages/blogs/add";
import EditBlog from "./components/pages/blogs/edit";
import RegisterPage from "./components/pages/blogs/register";

function App() {
  const location = useLocation();

  // Hide navbar only for dashboard and landing routes
  const hideNavbar =
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/" ||
    location.pathname === "/landing";

  // ✅ Admin route guard
  const AdminRoute = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const role = localStorage.getItem("role") || user?.role;

    if (!token || !user || role !== "admin") {
      return <Navigate to="/dashboard/login" replace />;
    }

    return <Outlet />;
  };

  return (
    <>
      {!hideNavbar && <Navbar classes={{ root: "bg-black" }} />}

      <Routes>
        {/* 🌐 Public Portfolio Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<MyWork />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        {/* 🧱 Dashboard Routes */}
        <Route path="/dashboard/register" element={<RegisterPage />} />
        <Route path="/dashboard/login" element={<LoginPage />} />

        {/* 🔐 Protected Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="view" replace />} />
            <Route path="view" element={<ManageBlogs />} />
            <Route path="add" element={<AddBlogForm />} />
            <Route path="manage" element={<ManageBlogs />} />
            <Route path="edit/:id" element={<EditBlog />} />
          </Route>
        </Route>

        {/* 🚫 404 Fallback */}
        <Route
          path="*"
          element={
            <div className="text-center mt-10 text-2xl text-gray-400">
              Page Not Found
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
