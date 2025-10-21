import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../../pagenation";

// ✅ Blog interface type
interface Blog {
  id: number;
  title: string;
  author: string;
  image?: string;
  createdAt: string;
}

export default function ManageBlogs() {
  // ✅ State variables
  const [blogs, setBlogs] = useState<Blog[]>([]); // All blogs from API
  const [search, setSearch] = useState<string>(""); // Search keyword
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [currentPage, setCurrentPage] = useState(1); // Current pagination page
  const rowPerPage = 10; // ✅ Show 10 rows per page

  const navigate = useNavigate();

  // ✅ Fetch blogs when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/blogs");
        setBlogs(res.data); // Store all blogs in state
      } catch (err) {
        console.error("❌ Error fetching blogs:", err);
        setError("Failed to load blogs.");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };
    fetchBlogs();
  }, []);

  // ✅ Delete a blog
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id)); // Remove deleted blog from UI
    } catch (err) {
      console.error("❌ Error deleting blog:", err);
      alert("Failed to delete blog.");
    }
  };

  // ✅ Filter blogs by search keyword (title or author)
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.author.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Calculate pagination AFTER filtering
  const totalPages = Math.ceil(filteredBlogs.length / rowPerPage);
  const startIndex = (currentPage - 1) * rowPerPage;
  const visibleBlogs = filteredBlogs.slice(startIndex, startIndex + rowPerPage);

  // ✅ Handle loading and error states
  if (loading)
    return <p className="text-center text-gray-400 mt-10">Loading blogs...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* 🧭 Header with Add button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-200">📰 Manage Blogs</h1>
          <button
            onClick={() => navigate("/dashboard/add")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            ➕ Add New Blog
          </button>
        </div>

        {/* 🔍 Search bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // ✅ Reset to first page when searching
            }}
            className="w-full sm:w-1/2 border border-gray-700 rounded-lg px-3 py-2 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* 📋 Blog Table */}
        <div className="overflow-x-auto border border-gray-800 rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-900 text-gray-300">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Author</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {/* 🧾 If no blogs found after search */}
              {visibleBlogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">
                    No blogs found.
                  </td>
                </tr>
              ) : (
                visibleBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="border-t border-gray-800 hover:bg-gray-900 transition"
                  >
                    {/* Blog image */}
                    <td className="p-3">
                      {blog.image ? (
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
                          className="w-20 h-14 object-cover rounded-md border border-gray-700"
                        />
                      ) : (
                        <div className="w-20 h-14 bg-gray-800 rounded-md flex items-center justify-center text-gray-500 text-sm">
                          No Img
                        </div>
                      )}
                    </td>

                    {/* Blog info */}
                    <td className="p-3">{blog.title}</td>
                    <td className="p-3">{blog.author}</td>
                    <td className="p-3 text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>

                    {/* ✏️ Actions */}
                    <td className="p-3 text-center space-x-3">
                      <button
                        onClick={() => navigate(`/dashboard/edit/${blog.id}`)}
                        className="text-blue-400 hover:text-blue-500 font-medium"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-500 hover:text-red-600 font-medium"
                      >
                        🗑️ Delete
                      </button>
                      <button
                        onClick={() => navigate(`/blog/${blog.id}`)}
                        className="text-green-400 hover:text-green-500 font-medium"
                      >
                        🔍 View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 📄 Pagination controls */}
        <div className="flex justify-center mt-10">
          <Pagination totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}
