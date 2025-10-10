import { useEffect, useState } from "react";
import Landing from "./Landing";
import Experience from "./Experience";
import About from "./About";
import Services from "./Services";
import MyWork from "./myWork";
import Contact from "./Contact";
import Footer from "./Footer";
import Navbar from "./NavBar";

const Home = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar
        classes={{
          root: `fixed top-0 left-0 ${
            show
              ? "translate-y-0 bg-black/50 backdrop-blur-md "
              : "-translate-y-full"
          }`,
        }}
      />
      <Landing />
      <Experience />
      <About />
      <Services />
      <MyWork />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
