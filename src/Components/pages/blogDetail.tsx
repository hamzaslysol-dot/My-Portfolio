import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Blog {
  id: number;
  author_name: string;
  image: string;
  title: string;
  content?: string; // ✅ added for full content
  date: string;
}

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8000/api/blogs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blog");
        return res.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching blog:", err);
        setError("Blog not found");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!blog) return null;

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* 🖼️ Blog image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="rounded-lg mb-6 w-full max-h-[500px] object-cover"
        />

        {/* 🧾 Blog Info */}
        <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-400 mb-4">
          By {blog.author_name} • {new Date(blog.date).toLocaleDateString()}
        </p>

        {/* 📝 Full Content */}
        {blog.content && (
          <div className="prose prose-invert max-w-none text-gray-100 leading-relaxed">
            {blog.content.split("\n").map((line, idx) => (
              <p key={idx} className="mb-4">
                {line}
              </p>
            ))}
          </div>
        )}
        {/* 🔙 Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition"
        >
          ← Back to Blogs
        </button>
      </div>
    </div>
  );
}
