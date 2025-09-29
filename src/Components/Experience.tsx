const exp = [
  { id: 1, heading: "15+", detail: "Years of Experience" },
  { id: 2, heading: "75+", detail: "Satisfied Costumers" },
  { id: 3, heading: "250+", detail: "Projects" },
];
const Experience = () => {
  return (
    <div className="bg-black">
      <p className=" text-gray-400 text-center tracking-[0.2em] uppercase text-sm animate-bounce pt-20">
        my work isn't about creating its about making difference
      </p>
      <div className="grid grid-cols-1 bg-black sm:grid-cols-3 pb-20">
        {exp.map((exp) => (
          <div key={exp.id}>
            <h1 className="font-bold text-6xl text-white text-center mt-20">
              {exp.heading}
            </h1>
            <p className=" text-white text-center tracking-[0.2em] uppercase text-sm">
              {exp.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
