import { Link } from "react-router-dom";
import Container from "./container";
import { BlogView } from "./blogData";

const Blog = () => {
  return (
    <div className="bg-black min-h-screen">
      <Container className="text-white">
        <h1 className="font-bold text-5xl mb-10">Blogs</h1>
        <div className="grid md:grid-cols-2 gap-5">
          {BlogView.map((blog) => (
            <div
              key={blog.id}
              className="bg-gray-900 p-5 rounded-3xl shadow-md"
            >
              <img
                src={blog.imgSrc}
                alt={blog.alt}
                className="w-full h-96 rounded-3xl mb-5 hover:scale-105 transition-transform duration-300"
              />
              <p className="text-4xl font-bold mb-2">{blog.title}</p>
              <p className="text-gray-300 mb-2">
                {blog.des.length > 150
                  ? blog.des.slice(0, 150) + "..."
                  : blog.des}
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-blue-400 hover:text-blue-300 underline ml-1"
                >
                  Read more
                </Link>
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Blog;
