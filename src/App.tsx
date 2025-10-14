import { Routes, Route, useLocation } from "react-router-dom";

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
import BlogList from "./Components/pages/blogList";
import BlogDetail from "./Components/pages/blogDetail";
import Dashboard from "./Components/pages/dashboard";
import DashboardHome from "./Components/pages/dashboardHome";
import AddBlogForm from "./Components/pages/addBlog";
import ManageBlogs from "./Components/pages/manageBlog";

function App() {
  const location = useLocation();

  // ✅ Hide Navbar on dashboard routes
  const hideNavbar =
    location.pathname.startsWith("/dashboard") || location.pathname === "/";
  return (
    <>
      {/* Show navbar only on non-dashboard routes */}
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

        {/* 📰 Blog routes */}
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        {/* 🧭 Dashboard (no navbar) */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="add" element={<AddBlogForm />} />
          <Route path="view" element={<ManageBlogs />} />
        </Route>

        {/* 🚫 404 fallback */}
        <Route
          path="*"
          element={
            <div className="text-center mt-10 text-2xl text-gray-600">
              Page Not Found
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
