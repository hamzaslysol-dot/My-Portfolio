import Img from "../assets/image.png";
import { ChevronDown } from "lucide-react"; // scroll icon
import "../index.css";

const Landing = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section
      id="landing"
      className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      <img
        dataneedcolor-bg="false"
        src={Img}
        alt="Profile"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 text-center flex flex-col items-center">
        <div className="relative leading-none">
          <h1 className="text-4xl xs:text-9xl md:text-6xl lg:text-9xl font-extrabold tracking-tight bg-clip-text text-outline">
            Hamza
          </h1>

          <h1 className="text-4xl sm:text-9xl md:text-6xl lg:text-9xl font-extrabold tracking-tight bg-clip-text text-outline">
            Latif
          </h1>
        </div>

        <p className=" text-gray-400 tracking-[0.2em] uppercase text-sm mt-20 animate-bounce">
          Web / Graphic developer
        </p>
      </div>
      <div className="absolute bottom-6 items-center">
        <button onClick={scrollToNext}>
          |
          <ChevronDown className="text-white items-center animate-ping" />
        </button>
      </div>
    </section>
  );
};

export default Landing;
