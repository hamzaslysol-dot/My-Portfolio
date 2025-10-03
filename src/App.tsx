import { Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Experience from "./Components/Experience";
import Landing from "./Components/Landing";
import Services from "./Components/Services";
import MyWork from "./Components/myWork";
import NavBar from "./Components/NavBar";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Landing />
              <Experience />
              <About />
              <Services />
              <MyWork />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<MyWork />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
    </>
  );
}

export default App;
