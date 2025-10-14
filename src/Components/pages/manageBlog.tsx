import { useEffect, useState } from "react";
import Container from "../container";

interface Blog {
  id: number;
  title: string;
  author_name: string;
  description: string;
  image: string;
}

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/blogs");
      const data = await res.json();
      setBlogs(data.data || data); // handle both array and paginated form
    } catch (err) {
      console.error("❌ Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/blogs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message);
      fetchBlogs();
    } catch (err) {
      console.error("❌ Error deleting blog:", err);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Blogs</h2>
      <Container>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
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
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p className="text-gray-400">{blog.author_name}</p>
                <p className="mt-2 text-gray-300 text-sm">
                  {blog.description.slice(0, 100)}...
                </p>
                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="mt-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-2">
              No blogs found.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
