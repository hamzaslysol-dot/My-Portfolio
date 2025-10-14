import { useEffect, useState } from "react";
import axios from "axios";

interface Blog {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
}

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/blogs");
      if (Array.isArray(data)) {
        setBlogs(data);
      } else {
        console.error("Unexpected response:", data);
        setBlogs([]);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };
  const deleteBlog = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    await axios.delete(`http://localhost:8000/api/blogs/${id}`);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Blogs</h2>
      {blogs.length === 0 ? (
        <p className="text-gray-600">No blogs found.</p>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="border rounded p-4 shadow bg-white">
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              {blog.image && (
                <img
                  src={`http://localhost:8000${blog.image}`}
                  alt=""
                  className="w-full h-40 object-cover my-2 rounded"
                />
              )}
              <p className="text-gray-700">{blog.content}</p>
              <button
                onClick={() => deleteBlog(blog.id)}
                className="mt-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
