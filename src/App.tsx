import { Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Experience from "./Components/Experience";
import Landing from "./Components/Landing";
import Services from "./Components/Services";
import MyWork from "./Components/myWork";
import Contact from "./Components/Contact";
import Blog from "./Components/Blog";
import Home from "./Components/Home";
import Navbar from "./Components/NavBar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={
            <>
              <Navbar classes={{ root: "bg-black" }} />
              <About />
            </>
          }
        />
        <Route path="/" element={<Landing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<MyWork />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </>
  );
}

export default App;
