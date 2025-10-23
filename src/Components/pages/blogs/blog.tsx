import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useQuery } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { Link } from "react-router-dom";
import Pagination from "../../common/pagenation";
import Container from "../../common/container";
import Bg from "../assets/bg.mp4";
import React from "react";

interface BlogItem {
  id: number;
  title: string;
  content: string;
  image: string;
  author: string;
  createdAt: string;
}

// Fetch function for React Query
const fetchBlogs = async (): Promise<BlogItem[]> => {
  const res = await fetch("http://localhost:8000/api/blogs");
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

const Blog = () => {
  const {
    data: blogs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    staleTime: 1000 * 60 * 2, // 2 minutes caching
  });

  const [currentPage, setCurrentPage] = React.useState(1);
  const blogsPerPage = 6;

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const visibleBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 justify-center items-center h-screen text-white">
        <h2>Loading blogs...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid grid-cols-2 items-center h-screen text-red-500">
        <h2>Error: {(error as Error).message}</h2>
      </div>
    );
  }

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
                  src={
                    blog.image.startsWith("http")
                      ? blog.image
                      : `http://localhost:8000/${blog.image.replace(
                          /^\/+/,
                          ""
                        )}`
                  }
                  alt={blog.title}
                  className="w-full h-64 object-cover rounded-3xl mb-5 hover:scale-105 transition-transform duration-300"
                />

                <p className="text-2xl font-bold mb-2">{blog.title}</p>
                <p className="text-sm text-gray-400 mb-2 font-bold">
                  By {blog.author} | Date:
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <div className="text-gray-300 mb-2 prose max-w-none prose-p:text-gray-300 prose-headings:text-white backdrop-blur-sm prose-strong:text-white">
                  <MDEditor.Markdown
                    source={
                      blog.content.length > 150
                        ? blog.content.slice(0, 150) + "..."
                        : blog.content
                    }
                  />
                </div>

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
