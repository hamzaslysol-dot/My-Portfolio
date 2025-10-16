import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Landing from "./components/Landing";
import Services from "./components/Services";
import MyWork from "./components/myWork";
import Contact from "./components/Contact";
import Navbar from "./components/NavBar";
import BlogDetail from "./components/pages/blogDetail";
import DashboardLayout from "./components/pages/dashboardLayout";
import ManageBlogs from "./components/pages/manageBlog";
import LoginPage from "./components/pages/login";
import React from "react";
import Blog from "./components/Blog";
import AddBlogForm from "./components/pages/addBlog";

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
