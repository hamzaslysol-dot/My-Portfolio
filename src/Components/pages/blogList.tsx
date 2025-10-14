import Sidebar from "../sideBar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Blog {
  id: number;
  author_name: string;
  image: string;
  title: string;
  description: string;
  date: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/blogs")
      .then((res) => res.json())
      .then(setBlogs)
      .catch(console.error);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-3xl font-bold mb-6">📚 All Blogs</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="border rounded-lg shadow bg-white overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {blog.description}
                </p>
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
