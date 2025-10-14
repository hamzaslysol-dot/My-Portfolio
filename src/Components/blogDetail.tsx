// src/pages/BlogDetail.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Blog {
  id: number;
  author_name: string;
  image: string;
  title: string;
  description: string;
  date: string;
}

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!blog) return null;

  return (
    <div className="bg-black">
      <div className="max-w-4xl mx-auto p-6 text-white">
        <img
          src={blog.image}
          alt={blog.title}
          className="rounded-lg mb-6 w-full"
        />
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-500 mb-4">
          By {blog.author_name} • {new Date(blog.date).toLocaleDateString()}
        </p>
        <p className="text-lg leading-relaxed whitespace-pre-line">
          {blog.description}
        </p>
      </div>
    </div>
  );
}
