import Container from "./container";

const Services = () => {
  return (
    <section id="services">
      <div>
        <div className="relative bg-black pt-20 p-0 xs:p-20">
          <Container className=" flex justify-between">
            <div className="relative mb-8">
              <span className="absolute -top-4 text-5xl font-extrabold text-outline">
                My Services
              </span>

              <h2 className="text-5xl font-extrabold text-white relative">
                My Services
              </h2>
            </div>
            <p className="text-white text-2xl hidden xs:block md:hidden lg:block border-b">
              See Projects
            </p>
          </Container>
        </div>
        <div className="bg-black h-auto xs:min-h-screen md:min-h-screen lg:min-h-screen flex items-center justify-center p-6">
          <h1 className="text-white text-4xl xs:8xl md:text-8xl font-bold xs:font-extrabold leading-tight text-center w-full xs:w-min md:w-fit lg:w-min">
            BRANDING WEB DESIGN MARKETING DRAWING
          </h1>
        </div>
        <div className="bg-black text-2xl text-white pt-20">
          <Container className=" lg:flex xs:block md:block  justify-between">
            <p>Have a Project in mind? Let's bring it to life</p>
            <button className="bg-green-400 p-1 rounded-xl xs:pt-0 text-xl hover:opacity-50">
              Get a Proposal
            </button>
          </Container>
        </div>
      </div>
    </section>
  );
};

export default Services;
