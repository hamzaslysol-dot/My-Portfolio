import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// Portfolio components
import Home from "./Components/Home";
import About from "./Components/About";
import Experience from "./Components/Experience";
import Landing from "./Components/Landing";
import Services from "./Components/Services";
import MyWork from "./Components/myWork";
import Contact from "./Components/Contact";
import Navbar from "./Components/NavBar";

// Blog system components
import BlogDetail from "./Components/pages/blogDetail";
import DashboardLayout from "./Components/pages/dashboardLayout";
import AddBlogForm from "./Components/pages/addBlog";
import ManageBlogs from "./Components/pages/manageBlog";
import LoginPage from "./Components/pages/login";

function App() {
  const location = useLocation();

  // ✅ Hide Navbar ONLY on dashboard routes
  const hideNavbar =
    location.pathname.startsWith("/dashboard") || location.pathname === "/";

  return (
    <>
      {/* Show navbar only on non-dashboard pages */}
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

        {/* 📖 Blog Public Routes */}
        <Route path="/blog/:id" element={<BlogDetail />} />

        {/* 🧱 Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="view" />} />
          <Route path="view" element={<ManageBlogs />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="add" element={<AddBlogForm />} />
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
