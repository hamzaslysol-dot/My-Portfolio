import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

interface Blog {
  id: number;
  author_name: string;
  image: string;
  title: string;
  content?: string;
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

  // ✅ Normalize Markdown if escaped
  const normalizeContent = (raw?: string) => {
    if (!raw) return "";
    let text = raw;
    if (text.includes("\\n")) text = text.replace(/\\n/g, "\n");
    const txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
  };

  const markdownContent = normalizeContent(blog.content);

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* 🖼️ Blog image */}
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="rounded-lg mb-6 w-full max-h-[500px] object-cover shadow-lg"
          />
        )}

        {/* 🧾 Blog Info */}
        <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-400 mb-6">
          By {blog.author_name} •{" "}
          {new Date(blog.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* 📝 Markdown Preview (same as Add/Edit) */}
        <div
          data-color-mode="dark"
          className="bg-gray-900 p-6 rounded-2xl shadow-lg mb-10"
        >
          <MDEditor.Markdown
            source={markdownContent}
            style={{
              backgroundColor: "transparent",
              color: "white",
              lineHeight: "1.8",
              fontSize: "1.05rem",
              fontFamily: "system-ui, sans-serif",
            }}
          />
        </div>

        {/* 🔙 Back button */}
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          ← Back to Blogs
        </button>
      </div>
    </div>
  );
}
