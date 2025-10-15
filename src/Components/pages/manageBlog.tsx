import { useState, useEffect } from "react";
import axios from "axios";

interface Blog {
  id: number;
  title: string;
  author: string;
  description: string;
  content: string;
  image: string;
  created_at: string;
}

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // ✅ check admin login status
  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fd = new FormData();
      if (editingBlog) {
        fd.append("title", editingBlog.title);
        fd.append("author", editingBlog.author);
        fd.append("description", editingBlog.description);
        fd.append("content", editingBlog.content);
      }
      fd.append("image", e.target.files[0]);
      setFormData(fd);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    const fd = formData || new FormData();
    fd.set("title", editingBlog.title);
    fd.set("author", editingBlog.author);
    fd.set("description", editingBlog.description);
    fd.set("content", editingBlog.content);

    try {
      await axios.put(`http://localhost:8000/api/blogs/${editingBlog.id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Blog updated successfully!");
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>
      {/* ✅ Show Add Blog button for Admins */}
      {isAdmin && (
        <div className="flex justify-end mb-6">
          <a
            href="/dashboard/add"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ➕ Add New Blog
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="p-4 border rounded-lg shadow bg-white space-y-2"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="font-bold text-lg">{blog.title}</h2>
            <p className="text-gray-600 text-sm">
              By {blog.author} —{" "}
              {new Date(blog.created_at).toLocaleDateString()}
            </p>

            {/* ✅ Only show to admin */}
            {isAdmin && (
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleEdit(blog)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ✅ Edit modal */}
      {editingBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                value={editingBlog.title}
                onChange={(e) =>
                  setEditingBlog({ ...editingBlog, title: e.target.value })
                }
                placeholder="Title"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                value={editingBlog.author}
                onChange={(e) =>
                  setEditingBlog({ ...editingBlog, author: e.target.value })
                }
                placeholder="Author"
                className="w-full border p-2 rounded"
                required
              />
              <textarea
                value={editingBlog.description}
                onChange={(e) =>
                  setEditingBlog({
                    ...editingBlog,
                    description: e.target.value,
                  })
                }
                placeholder="Description"
                rows={3}
                className="w-full border p-2 rounded"
              />
              <textarea
                value={editingBlog.content}
                onChange={(e) =>
                  setEditingBlog({ ...editingBlog, content: e.target.value })
                }
                placeholder="Content"
                rows={5}
                className="w-full border p-2 rounded"
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
