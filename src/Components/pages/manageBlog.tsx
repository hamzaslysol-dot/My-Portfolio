// src/components/ManageBlogs.tsx
import { useEffect, useState } from "react";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:8000/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/api/blogs/${id}`, { method: "DELETE" });
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Blogs</h2>
      <div className="space-y-4">
        {blogs.map((b: any) => (
          <div
            key={b.id}
            className="flex items-center justify-between bg-white shadow p-4 rounded-lg"
          >
            <div>
              <h3 className="text-lg font-semibold">{b.title}</h3>
              <p className="text-sm text-gray-500">By {b.author_name}</p>
            </div>
            <button
              onClick={() => handleDelete(b.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
