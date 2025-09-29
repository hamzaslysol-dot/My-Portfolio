import Container from "./container";
import Project1 from "../assets/download.png";
import Game from "../assets/download.png";
import Project2 from "../assets/download (2).jpeg";
import Project3 from "../assets/download (3).jpeg";
import Project4 from "../assets/download (4).jpeg";
import Project5 from "../assets/download (5).jpeg";
import Project6 from "../assets/download (6).jpeg";

import FlippingText from "./FlippingText";

const projects = [
  {
    id: 1,
    imgSrc: Project1,
    label: "Game Hub",
    alt: "project1",
    href: "https://game-hub-bay-eta.vercel.app",
  },
  { id: 2, imgSrc: Project2, label: "Project 2", alt: "project2", href: "#" },
  { id: 3, imgSrc: Project3, label: "Project 3", alt: "project3", href: "#" },
  { id: 4, imgSrc: Project4, label: "Project 4", alt: "project4", href: "#" },
  { id: 5, imgSrc: Project5, label: "Project 5", alt: "project5", href: "#" },
  { id: 6, imgSrc: Project6, label: "Project 6", alt: "project6", href: "#" },
];
const optn = [
  { id: 1, option: "All Projects" },
  { id: 2, option: "Recent Projects" },
  { id: 3, option: "Layout Projects" },
];

const MyWork = () => {
  return (
    <section id="work">
      <div className=" bg-black text-white pt-20">
        <Container>
          <div className="relative mb-8 flex justify-between">
            <h2 className="absolute -top-5 text-5xl xs:text-3xl uppercase font-bold text-outline">
              My work
            </h2>

            <h2 className="text-5xl xs:text-3xl font-bold relative uppercase">
              my work
            </h2>
            <p className="border-b hidden xs:block md:hidden lg:block border-white text-xl w-fit">
              Get in Touch
            </p>
          </div>
          {optn.map((optn) => (
            <FlippingText option={optn.option} key={optn.id} id={optn.id} />
          ))}
        </Container>

        <div>
          <Container>
            <div className="grid lg:grid-cols-3 xs:grid-cols-1 md:grid-cols-2 xs:p-0 pt-20 gap-10">
              {projects.map((project) => (
                <div key={project.id}>
                  <img
                    src={project.imgSrc}
                    alt={project.alt}
                    className="mt-5 mx-auto"
                  />
                  <p className="font-bold text-xl text-center">
                    <a href={project.href}> {project.label}</a>
                  </p>
                </div>
              ))}
            </div>
            <div className="relative flex justify-between ">
              <h2 className="absolute -top-5 text-5xl uppercase border-b-2 pb-10 border-white pt-20 font-bold text-outline">
                Client Stories
              </h2>
              <h2 className="text-5xl font-bold pt-20 relative uppercase">
                client stories
              </h2>
            </div>
          </Container>
        </div>
        <Container className="pt-10 xs:pt-20 md:pt-20 lg:pt-20">
          <div className="grid lg:grid-cols-2 xs:grid-col-1 md:grid-cols-1">
            <div>
              <h1 className="text-4xl pt-10 xs:pt-20 font-bold">Umer </h1>
              <p className="  pt-5 lg:text-2xl xs:text-sm md:text-sm w-fit">
                "Working on this project was an excellent journey from start to
                finish. The design came out clean, modern, and perfectly aligned
                with our vision. Every detail was carefully crafted to ensure
                responsiveness across devices, and the performance is
                impressively smooth. The communication throughout the process
                was clear, making it easy to share feedback and see improvements
                right away. Overall, the project has elevated our brand’s online
                presence and left us extremely satisfied with the results.""
              </p>
            </div>
            <img
              src={Game}
              alt="image"
              className="lg:w-xl xs:w-fit mx-auto md:pt-5"
            />
          </div>
        </Container>
      </div>
    </section>
  );
};

export default MyWork;
