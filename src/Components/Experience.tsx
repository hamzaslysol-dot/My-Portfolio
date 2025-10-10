import Container from "./container";
import Navbar from "./NavBar";

const exp = [
  { id: 1, heading: "15+", detail: "Years of Experience" },
  { id: 2, heading: "75+", detail: "Satisfied Customers" },
  { id: 3, heading: "250+", detail: "Projects Completed" },
  { id: 4, heading: "4+", detail: "Years of Teaching experience" },
];

const Experience = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <section className="bg-black text-white py-20">
        {/* Intro text */}
        <Container>
          <p className="text-gray-400 text-center tracking-[0.2em] uppercase text-sm mb-16">
            my work isn’t just about creating — it’s about making a difference
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-10">
            {exp.map((item) => (
              <div key={item.id} className="text-center">
                <h1 className="font-extrabold text-6xl">{item.heading}</h1>
                <p className="text-gray-400 tracking-[0.2em] uppercase text-sm mt-3">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Experience;
