import { useEffect, useState } from "react";
import Landing from "./landing";
import Experience from "./experience";
import About from "./about";
import Services from "./services";
import MyWork from "./projects";
import Contact from "./contact";
import Footer from "../common/footer";
import Navbar from "../common/navBar";

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
