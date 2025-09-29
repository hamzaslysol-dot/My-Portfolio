import Avatar from "../assets/avatar.png";
import Container from "./container";
const About = () => {
  return (
    <section id="about">
      <div className=" bg-gray-900 text-white pt-20 p-10">
        <Container className="grid xs:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 w-fit">
          <div className="relative">
            <div className="relative mb-8">
              <span className="absolute -top-5 -left-5 text-6xl font-extrabold text-outline">
                ABOUT ME
              </span>

              <h2 className="text-6xl font-extrabold relative">ABOUT ME</h2>
            </div>
            <p className="text-gray-300 lg:text-xl">
              Hello! I am a passionate web developer with a strong interest in
              creating modern, responsive, and user-friendly websites. My focus
              is on building clean, efficient, and scalable applications using
              technologies like React, TypeScript, and Tailwind CSS. I enjoy
              turning complex problems into simple solutions and ensuring that
              every project I work on is both functional and visually appealing.
              I believe in writing clean code, following best practices, and
              continuously learning new tools and frameworks to stay up to date
              with the fast-evolving world of web development. Beyond coding, I
              love exploring creative ideas, experimenting with design trends,
              and constantly improving my skills to deliver better digital
              experiences.
            </p>
          </div>
          <img src={Avatar} alt="avatar" className="mx-auto " />
        </Container>
      </div>
    </section>
  );
};

export default About;
