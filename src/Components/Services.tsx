import Container from "./container";

const Services = () => {
  return (
    <section id="services">
      <div>
        <div className="relative bg-black p-20">
          <Container className=" flex justify-between">
            <div className="relative mb-8">
              <span className="absolute -top-4 text-5xl font-extrabold text-outline">
                My Services
              </span>

              <h2 className="text-5xl font-extrabold text-white relative">
                My Services
              </h2>
            </div>
            <p className="text-white text-2xl border-b-1">See Projects</p>
          </Container>
        </div>
        <div className="bg-black min-h-screen flex items-center justify-center p-6">
          <h1 className="text-white text-6xl md:text-8xl font-extrabold leading-tight text-center max-w-4xl">
            BRANDING WEB DESIGN MARKETING DRAWING
          </h1>
        </div>
        <div className="bg-black text-2xl text-white pt-20">
          <Container className="flex justify-between">
            <p>Have a Project in mind? Let's bring it to life</p>
            <button className="bg-green-400 p-1 rounded-xl text-xl hover:opacity-50">
              Get a Proposal
            </button>
          </Container>
        </div>
      </div>
    </section>
  );
};

export default Services;
