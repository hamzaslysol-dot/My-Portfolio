import Container from "./container";
import FlippingText from "./FlippingText";

import Project1 from "../assets/download.png";
import Game from "../assets/download.png";
import Project2 from "../assets/download (2).jpeg";
import Project3 from "../assets/download (3).jpeg";
import Project4 from "../assets/download (4).jpeg";
import Project5 from "../assets/download (5).jpeg";
import Project6 from "../assets/download (6).jpeg";

const projects = [
  {
    id: 1,
    imgSrc: Project1,
    label: "Game Hub",
    alt: "Screenshot of Game Hub project",
    href: "https://game-hub-bay-eta.vercel.app",
  },
  {
    id: 2,
    imgSrc: Project2,
    label: "Project 2",
    alt: "Screenshot of Project 2",
    href: "#",
  },
  {
    id: 3,
    imgSrc: Project3,
    label: "Project 3",
    alt: "Screenshot of Project 3",
    href: "#",
  },
  {
    id: 4,
    imgSrc: Project4,
    label: "Project 4",
    alt: "Screenshot of Project 4",
    href: "#",
  },
  {
    id: 5,
    imgSrc: Project5,
    label: "Project 5",
    alt: "Screenshot of Project 5",
    href: "#",
  },
  {
    id: 6,
    imgSrc: Project6,
    label: "Project 6",
    alt: "Screenshot of Project 6",
    href: "#",
  },
];

const options = [
  { id: 1, option: "All Projects" },
  { id: 2, option: "Recent Projects" },
  { id: 3, option: "Layout Projects" },
];

const MyWork = () => {
  return (
    <section id="work" className="bg-black text-white pt-20">
      <Container>
        {/* Section Title */}
        <div className="relative mb-8 flex justify-between items-center">
          <h2 className="absolute -top-5 text-5xl uppercase font-bold text-outline">
            My Work
          </h2>
          <h2 className="text-5xl font-bold relative uppercase">My Work</h2>
          <p className="border-b hidden sm:block border-white text-xl w-fit cursor-pointer hover:opacity-70">
            Get in Touch
          </p>
        </div>

        {/* Project Options */}
        <div className="hidden md:flex gap-5 flex-wrap">
          {options.map((opt) => (
            <FlippingText option={opt.option} id={opt.id} key={opt.id} />
          ))}
        </div>
      </Container>

      {/* Projects Section */}
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-20 gap-10">
          {projects.map((project) => (
            <div key={project.id}>
              <img
                src={project.imgSrc}
                alt={project.alt}
                className="mt-5 mx-auto rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
              />
              <p className="font-bold text-xl text-center mt-2">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.label}
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* Client Stories Section */}
        <div className="relative flex justify-between mt-20">
          <h2 className="absolute -top-5 text-5xl uppercase border-b-2 pb-10 border-white font-bold text-outline">
            Client Stories
          </h2>
          <h2 className="text-5xl font-bold relative uppercase">
            Client Stories
          </h2>
        </div>
      </Container>

      {/* Testimonial */}
      <Container className="pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 items-center">
          <div>
            <h1 className="text-4xl font-bold">Umer</h1>
            <p className="pt-5 text-base lg:text-2xl leading-relaxed">
              "Working on this project was an excellent journey from start to
              finish. The design came out clean, modern, and perfectly aligned
              with our vision. Every detail was carefully crafted to ensure
              responsiveness across devices, and the performance is impressively
              smooth. The communication throughout the process was clear, making
              it easy to share feedback and see improvements right away.
              Overall, the project has elevated our brand’s online presence and
              left us extremely satisfied with the results."
            </p>
          </div>
          <img
            src={Game}
            alt="Screenshot of client project"
            className="mx-auto w-full max-w-md rounded-2xl shadow-lg"
          />
        </div>
      </Container>
    </section>
  );
};

export default MyWork;
