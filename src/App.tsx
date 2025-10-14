import { Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Experience from "./Components/Experience";
import Landing from "./Components/Landing";
import Services from "./Components/Services";
import MyWork from "./Components/myWork";
import Contact from "./Components/Contact";
import Blog from "./Components/blog";
import Home from "./Components/Home";
import Navbar from "./Components/NavBar";
// import SingleBlog from "./Components/SingleBlog";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={
            <div>
              <Navbar classes={{ root: "bg-black" }} />
              <About />
            </div>
          }
        />
        <Route path="/" element={<Landing />} />
        <Route
          path="/services"
          element={
            <div>
              <Navbar classes={{ root: "bg-black" }} />
              <Services />
            </div>
          }
        />
        <Route
          path="/work"
          element={
            <div>
              <Navbar classes={{ root: "bg-black" }} />
              <MyWork />
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div>
              <Navbar classes={{ root: "bg-black" }} />
              <Contact />
            </div>
          }
        />
        <Route
          path="/experience"
          element={
            <div>
              <Navbar classes={{ root: "bg-black" }} />
              <Experience />
            </div>
          }
        />
        <Route
          path="/blog"
          element={
            <div>
              <Navbar classes={{ root: "bg-black" }} />
              <Blog />
            </div>
          }
        />
        {/* <Route path="/blog/:id" element={<SingleBlog />} /> */}
      </Routes>
    </>
  );
}

export default App;
