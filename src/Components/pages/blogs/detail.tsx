import { useParams, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { useBlog } from "../hooks/useBlogs";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch blog using React Query hook
  const { data: blog, isLoading, isError } = useBlog(id);

  if (isLoading)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;

  if (isError || !blog)
    return <p className="text-center mt-10 text-red-500">Blog not found.</p>;

  const markdownContent = blog.content || "";

  // Construct correct image URL
  const getImageUrl = (image?: string) => {
    if (!image) return null;
    return image.startsWith("http")
      ? image
      : `http://localhost:8000/${image.replace(/^\/+/, "")}`;
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Blog image */}
        {getImageUrl(blog.image) && (
          <img
            src={getImageUrl(blog.image)!}
            alt={blog.title}
            className="w-full h-auto object-cover rounded-3xl mb-5 hover:scale-105 transition-transform duration-300"
          />
        )}

        {/* Blog title & author */}
        <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-400 mb-6">
          By {blog.author} •{" "}
          {new Date(blog.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Markdown content */}
        <div data-color-mode="dark" className="p-6 rounded-2xl shadow-lg mb-10">
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

        {/* Back button */}
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
