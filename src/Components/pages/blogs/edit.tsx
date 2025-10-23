import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { useBlog, useEditBlog } from "../../../hooks/useBlogs";

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: blog, isLoading, isError } = useBlog(id);
  const editBlog = useEditBlog();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setAuthor(blog.author);
      setContent(blog.content || "");
      if (blog.image)
        setPreviewImage(
          blog.image.startsWith("http")
            ? blog.image
            : `http://localhost:8000/${blog.image.replace(/^\/+/, "")}`
        );
    }
  }, [blog]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    if (image) formData.append("image", image);

    editBlog.mutate(
      { id, formData },
      {
        onSuccess: () => {
          alert("✅ Blog updated successfully!");
          navigate("/dashboard/view");
        },
        onError: () => alert("❌ Failed to update blog"),
      }
    );
  };

  if (isLoading)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load blog.</p>
    );

  return (
    <div className="bg-black min-h-screen text-white flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl w-full max-w-2xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">✏️ Edit Blog</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <div data-color-mode="dark">
          <label className="block text-sm text-gray-400 mb-1">Content</label>
          <MDEditor
            value={content}
            onChange={(val) => setContent(val || "")}
            height={300}
            preview="live"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Featured Image
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-40 h-32 object-cover rounded-md mt-2"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={editBlog.isPending}
          className="bg-green-600 hover:bg-green-700 w-full py-2 rounded-lg transition disabled:opacity-50"
        >
          {editBlog.isPending ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}
