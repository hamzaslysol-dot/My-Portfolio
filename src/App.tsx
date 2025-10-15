import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Experience from "./Components/Experience";
import Landing from "./Components/Landing";
import Services from "./Components/Services";
import MyWork from "./Components/myWork";
import Contact from "./Components/Contact";
import Navbar from "./Components/NavBar";
import BlogDetail from "./Components/pages/blogDetail";
import DashboardLayout from "./Components/pages/dashboardLayout";
import AddBlogForm from "./Components/pages/addBlog";
import ManageBlogs from "./Components/pages/manageBlog";
import LoginPage from "./Components/pages/login";
import Blog from "./Components/blog";
import React from "react";

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
            <Route path="add" element={<AddBlogForm />} />
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
