import { useProjects } from "../pages/hooks/useProjects";
import FlippingText from "../common/flippingText";
import Game from "../../assets/download.png";
import Container from "../common/container";

// const options = [
//   { id: 1, option: "All Projects" },
//   { id: 2, option: "Recent Projects" },
//   { id: 3, option: "Layout Projects" },
// ];

const MyWork = () => {
  const { data: projects, isLoading, isError } = useProjects();

  return (
    <div>
      <div className="bg-black">
        <section id="work" className="bg-black text-white pt-20">
          <Container>
            {/* Section Title */}
            <div className="relative mb-8 flex justify-between items-center">
              <h2 className="absolute -top-5 text-5xl uppercase font-bold text-outline">
                Projects
              </h2>
              <h2 className="text-5xl font-bold relative uppercase border-b pb-5">
                Projects
              </h2>
              <p className="border-b hidden sm:block border-white text-xl w-fit cursor-pointer hover:opacity-70">
                Get in Touch
              </p>
            </div>

            {/* Project Options */}
            {/* <div className="hidden md:flex gap-5 flex-wrap">
              {options.map((opt) => (
                <FlippingText option={opt.option} id={opt.id} key={opt.id} />
              ))}
            </div> */}
          </Container>

          {/* Projects Section */}
          <Container>
            {isLoading ? (
              <p className="text-center text-gray-400 mt-10">
                Loading projects...
              </p>
            ) : isError ? (
              <p className="text-center text-red-500 mt-10">
                Failed to load projects.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-20 gap-10">
                {projects?.map((project) => (
                  <div key={project.id}>
                    <a href={project.link} rel="noopener noreferrer">
                      <img
                        src={
                          project.image?.startsWith("http")
                            ? project.image
                            : `http://localhost:8000${project.image}`
                        }
                        alt={project.title}
                        className="mt-5 mx-auto rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 w-full h-64 object-cover"
                      />
                    </a>
                    <p className="font-bold text-xl text-center mt-2">
                      <a href={project.link} rel="noopener noreferrer">
                        {project.title}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            )}

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
                  "Working on this project was an excellent journey from start
                  to finish. The design came out clean, modern, and perfectly
                  aligned with our vision..."
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
      </div>
    </div>
  );
};

export default MyWork;
