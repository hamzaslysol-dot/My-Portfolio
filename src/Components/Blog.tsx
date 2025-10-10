import Container from "./container";
import Navbar from "./NavBar";

const Blog = () => {
  return (
    <div className="bg-black h-screen">
      <Navbar />

      <Container className="text-white">Hello</Container>
    </div>
  );
};

export default Blog;
