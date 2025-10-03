// import Hlogo from "../assets/h.png";/
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import "../index.css";

const links = [
  { ref: "/home", text: "Home" },
  { ref: "/about", text: "About" },
  { ref: "/services", text: "Services" },
  { ref: "/experience", text: "Experience" },
  { ref: "/work", text: "Work" },
  { ref: "/contact", text: "Contact" },
];

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
        ${
          show
            ? "translate-y-0 bg-black/50 backdrop-blur-md "
            : "-translate-y-full"
        }
        `}
    >
      <div className="flex justify-between items-center py-4 px-6 text-white">
        <h1 className="text-5xl font-extrabold text-outline">H</h1>
        {/* Mobile toggle */}
        <button className="lg:hidden block" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 font-medium">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.ref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden flex flex-col gap-6 px-6 pb-6 bg-gray-800 text-white">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.ref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.text}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
