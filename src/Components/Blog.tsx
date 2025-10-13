import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "./container";
import { BlogView } from "./blogData";
import Bg from "../assets/bg.mp4";
import Pagination from "./pagenation";

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const totalPages = Math.ceil(BlogView.length / blogsPerPage);

  // Calculate which blogs to show
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const visibleBlogs = BlogView.slice(startIndex, endIndex);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src={Bg} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <Container className="relative z-10 py-10">
        <h1 className="font-bold text-5xl mb-10">Blogs</h1>

        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
          {visibleBlogs.map((blog) => (
            <div
              key={blog.id}
              className="backdrop-blur-sm p-5 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300"
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
                  className="hover:text-blue-300 underline ml-1"
                >
                  Read more
                </Link>
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10">
          <Pagination
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </Container>
    </div>
  );
};

export default Blog;
