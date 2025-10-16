import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "./container";
import Bg from "../assets/bg.mp4";
import Pagination from "./pagenation";

interface BlogItem {
  id: number;
  author_name: string;
  date: string;
  image: string;
  title: string;
  description: string;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (err: any) {
        console.error("❌ Error fetching blogs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const visibleBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

  if (loading) {
    return (
      <div className="grid grid-cols-2 justify-center items-center h-screen text-white">
        <h2>Loading blogs...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-2 items-center h-screen text-red-500">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
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

        {visibleBlogs.length === 0 ? (
          <p className="text-center text-gray-400">No blogs found.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {visibleBlogs.map((blog) => (
              <div
                key={blog.id}
                className="backdrop-blur-sm p-5 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover rounded-3xl mb-5 hover:scale-105 transition-transform duration-300"
                />
                <p className="text-2xl font-bold mb-2">{blog.title}</p>
                <p className="text-sm text-gray-400 mb-2">
                  By {blog.author_name} Date:
                  {new Date(blog.date).toLocaleDateString()}
                </p>
                <p className="text-gray-300 mb-2">
                  {blog.description.length > 150
                    ? blog.description.slice(0, 150) + "..."
                    : blog.description}
                </p>

                <Link
                  to={`/blog/${blog.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Pagination totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </Container>
    </div>
  );
};

export default Blog;
