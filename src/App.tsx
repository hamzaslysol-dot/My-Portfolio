import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Experience from "./components/experience";
import Landing from "./components/landing";
import Services from "./components/services";
import MyWork from "./components/myWork";
import Contact from "./components/contact";
import Navbar from "./components/navBar";
import BlogDetail from "./components/pages/blogs/detail";
import DashboardLayout from "./components/pages/dashboard/layout";
import ManageBlogs from "./components/pages/blogs/manage";
import LoginPage from "./components/pages/dashboard/login";
import React from "react";
import Blog from "./components/blog";
import AddBlogForm from "./components/pages/blogs/add";
import EditBlog from "./components/pages/blogs/edit";

function App() {
  const location = useLocation();
  const hideNavbar =
    location.pathname.startsWith("/dashboard") || location.pathname === "/";

  // ✅ Admin route guard
  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const role = localStorage.getItem("role");

    if (!user || role !== "admin") {
      return <Navigate to="/dashboard/login" replace />;
    }

    return <>{children}</>;
  };

  return (
    <>
      {!hideNavbar && <Navbar classes={{ root: "bg-black" }} />}

      <Routes>
        {/* 🏠 Portfolio routes */}
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<MyWork />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/blog" element={<Blog />} />

        {/* 📖 Blog Public Route */}
        <Route path="/blog/:id" element={<BlogDetail />} />

        {/* 🧱 Dashboard Routes */}
        <Route path="/dashboard">
          {/* 🧑‍💻 Login Page (Public) */}
          <Route path="login" element={<LoginPage />} />

          {/* 🔐 Protected Admin Routes */}
          <Route
            path=""
            element={
              <AdminRoute>
                <DashboardLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Navigate to="view" />} />
            <Route path="view" element={<ManageBlogs />} />
            <Route path="/dashboard/add" element={<AddBlogForm />} />

            <Route path="/dashboard/manage" element={<ManageBlogs />} />
            <Route path="/dashboard/edit/:id" element={<EditBlog />} />
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
