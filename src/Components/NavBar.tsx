// import Hlogo from "../assets/h.png";/
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "../index.css";
import Container from "./container";

const links = [
  { ref: "/", text: "Home" },
  { ref: "/experience", text: "Experience" },
  { ref: "/about", text: "About" },
  { ref: "/services", text: "Services" },
  { ref: "/work", text: "Work" },
  { ref: "/contact", text: "Contact" },
  { ref: "/blog", text: "Blog" },
  { ref: "/dashboard", text: "Dashboard" },
];

interface NavbarProps {
  classes?: { root?: string };
}

const Navbar = ({ classes = {} }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`w-full transition-transform duration-500 z-50 ${
        classes.root || ""
      }`}
    >
      <Container>
        <div className="flex justify-between items-center py-4 px-6 text-white">
          <h1 className="text-5xl font-extrabold text-outline">H</h1>
          {/* Mobile toggle */}
          <button
            className="lg:hidden block"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-8 font-medium">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.ref}
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden flex flex-col gap-6 px-6 pb-6 bg-gray-800 text-white">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.ref}
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
