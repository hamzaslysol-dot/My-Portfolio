import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../pagenation";
import { useBlogs, useDeleteBlog } from "../../../hooks/useBlogs";

export default function ManageBlogs() {
  const navigate = useNavigate();
  const { data: blogs, isLoading, isError } = useBlogs();
  const deleteBlog = useDeleteBlog();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (isLoading)
    return <p className="text-center text-gray-400 mt-10">Loading blogs...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">Failed to load blogs.</p>
    );

  const filteredBlogs =
    blogs?.filter(
      (b) =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const totalPages = Math.ceil(filteredBlogs.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-200">📰 Manage Blogs</h1>
          <button
            onClick={() => navigate("/dashboard/add")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            ➕ Add New Blog
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-1/2 border border-gray-700 rounded-lg px-3 py-2 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none mb-6"
        />

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
                    <td className="p-3">{blog.title}</td>
                    <td className="p-3">{blog.author}</td>
                    <td className="p-3 text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-center space-x-3">
                      <button
                        onClick={() => navigate(`/dashboard/edit/${blog.id}`)}
                        className="text-blue-400 hover:text-blue-500 font-medium"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => deleteBlog.mutate(blog.id)}
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

        <div className="flex justify-center mt-10">
          <Pagination totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}
