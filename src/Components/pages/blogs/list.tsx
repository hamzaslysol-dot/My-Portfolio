import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../container";

interface Blog {
  id: number;
  title: string;
  author_name: string;
  description: string;
  image: string;
}

interface PaginatedResponse {
  data: Blog[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8000/api/blogs?page=${pageNum}&limit=6`
      );

      if (!res.ok) throw new Error("Failed to fetch blogs");

      const data: PaginatedResponse = await res.json();
      setBlogs(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      console.error("❌ Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  if (loading) {
    return <p className="text-center mt-10 text-white">Loading...</p>;
  }

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Blogs</h2>
      <Container>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="p-4 border rounded-lg shadow-md bg-gray-800 hover:shadow-lg transition-all"
            >
              <img
                src={
                  blog.image?.startsWith("http")
                    ? blog.image
                    : `http://localhost:8000${blog.image}`
                }
                alt={blog.title}
                className="h-48 w-full object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold text-white">{blog.title}</h3>
              <p className="text-gray-400 text-sm mb-2">{blog.author_name}</p>
              <p className="text-gray-300 text-sm mb-4">
                {blog.description.slice(0, 100)}...
              </p>
              <Link
                to={`/blog/${blog.id}`}
                className="text-blue-400 hover:underline"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={`px-4 py-2 rounded ${
              page === 1
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            Prev
          </button>
          <span className="text-lg">
            {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className={`px-4 py-2 rounded ${
              page === totalPages
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            Next
          </button>
        </div>
      </Container>
    </div>
  );
}
