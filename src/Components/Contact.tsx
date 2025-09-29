import { ChevronUp } from "lucide-react";
import Container from "./container";
import { useEffect, useState } from "react";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 2 * window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-black text-white">
      <Container>
        <div className="relative flex justify-between">
          <h2 className="absolute -top-3 xs:-top-5 md:-top-5 lg:-top-5 text-3xl xs:text-5xl md:text-4xl lg:text-5xl uppercase pt-20  border-b-2 pb-5 border-white font-bold text-outline">
            Let's Work Together
          </h2>
          <h2 className="text-3xl xs:text-5xl md:text-4xl lg:text-5xl font-bold pt-20 relative uppercase">
            Let's Work Together
          </h2>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-10 md:gap-7 lg:pt-10 ">
          <div className="pt-5 xs:pt-20 md:pt-10 lg:pt-20">
            <h1 className="text-2xl font-semibold">
              Have a question, feedback, or just want to say hello? We'd love to
              hear from you
            </h1>
            <p className="text-2xl  font-semibold pt-5 xs:pt-20 md:pt-20 lg:pt-20">
              Call me: 0333-0683570
            </p>
            <p className="text-2xl font-semibold">
              Say Hi: hamza.slysol@gmail.com
            </p>
          </div>
          <form className="pt-10  xs:pt-20 md:pt-20 lg:pt-20 ">
            <div className="p-4 font-bold text-xl ">
              <input
                id="name"
                type="text"
                placeholder="Name"
                className="p-2 w-full border-2 border-white rounded-2xl"
              />
            </div>
            <div className="p-4 font-bold text-xl">
              <input
                type="email"
                className="border-2 border-white p-2 w-full rounded-2xl"
                placeholder="Email"
              />
            </div>
            <div className="p-4 text-xl">
              <textarea
                name="message"
                id="message"
                rows={5}
                cols={10}
                placeholder="Message"
                className="border-2 border-white p-2 font-bold rounded-2xl resize-none w-full"
              ></textarea>
            </div>
            <div className="grid lg:grid-cols-2 xs:grid-cols-1 md:grid-cols-1">
              <div className="pt-2 pl-3 text-sm">
                <p>
                  ! All the fields are required. By sending the form you agree
                  to the
                  <span className="underline"> Terms and Condition</span> and
                  <span className="underline"> Privacy Policy </span>.
                </p>
              </div>
              <div className="pt-2 pr-2 flex justify-center xs:justify-end ">
                <button type="submit" className="bg-green-500 p-2 rounded-xl">
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="bottom-4 right-4 p-2 xs:bottom-6 xs:right-6 xs:p-3 md:bottom-10 md:right-10 md:p-4 text-black rounded-full shadow-lg bg-transparent transition duration-300"
          >
            |
            <ChevronUp className="w-5 h-5 xs:w-6 xs:h-6 md:w-8 md:h-8 text-white hover:animate-bounce" />
          </button>
        )}
      </Container>
    </div>
  );
};

export default Contact;
