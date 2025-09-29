import { Link } from "react-router-dom";
import Hlogo from "../assets/h.png";
import Container from "./container";
import { useState, useEffect } from "react";

const links = [
  { ref: "/home", text: "Home" },
  { ref: "/about", text: "About" },
  { ref: "/services", text: "Services" },
  { ref: "/experience", text: "Experience" },
  { ref: "/work", text: "Work" },
  { ref: "/workTogether", text: "Contact" },
];

const Navbar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full transition-transform duration-500 z-50
        ${show ? "translate-y-0 bg-gray-900/90 shadow-md" : "-translate-y-full"}
      `}
    >
      <Container className="flex justify-between items-center py-4 text-white">
        <Link to="/">
          <img
            src={Hlogo}
            alt="Logo"
            className="w-12 hover:scale-110 transition-transform duration-300"
          />
        </Link>

        <div className="flex gap-8 font-medium">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.ref}
              className="hover: text-blue-300 transition-colors"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
