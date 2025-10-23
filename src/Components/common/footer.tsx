import Fb from "../assets/facebook.png";
import Ins from "../assets/instagram.png";
import Link from "../assets/linkedin.png";
import X from "../assets/twitter.png";
import Container from "./container";

const social = [
  {
    id: 1,
    imgSrc1: Fb,
    alt: "facebook",
    href: "https://www.facebook.com/share/1CTevC5Tcw/?mibextid=wwXIfr",
  },
  {
    id: 2,
    imgSrc1: Ins,
    alt: "instagram",
    href: "https://www.instagram.com/hamza_latif01",
  },
  {
    id: 3,
    imgSrc1: Link,
    alt: "linkedin",
    href: "https://www.linkedin.com/in/hamza-latif-692107223",
  },
  {
    id: 4,
    imgSrc1: X,
    alt: "twitter",
    href: "https://x.com/humza2211?s=21",
  },
];

const Footer = () => {
  return (
    <div className="bg-black pt-10">
      <footer className="bg-gray-400 rounded-t-3xl pt-5">
        <Container className="flex flex-wrap justify-center gap-12 py-10">
          {social.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group transition-transform hover:scale-90"
            >
              {/* Social Icon */}
              <img
                src={item.imgSrc1}
                alt={item.alt}
                className="w-8 h-8 mb-2 transition-transform group-hover:scale-90"
              />
            </a>
          ))}
        </Container>

        {/* Bottom copyright */}
        <p className="text-center text-xs py-4 bg-gray-500 rounded-b-2xl text-white">
          © {new Date().getFullYear()} My Website. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
