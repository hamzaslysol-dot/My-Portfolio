import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

interface BlogData {
  title: string;
  author: string;
  content: string;
  image?: string;
}

export default function BlogForm({ isEdit = false }: { isEdit?: boolean }) {
  const navigate = useNavigate();
  const { id } = useParams(); // only used in edit mode
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 📝 Fetch existing blog if editing
  useEffect(() => {
    if (isEdit && id) {
      const fetchBlog = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/blogs/${id}`);
          const data: BlogData = res.data;
          setTitle(data.title);
          setAuthor(data.author);
          setContent(data.content);
          if (data.image) setPreviewImage(data.image); // show existing image
        } catch (err) {
          console.error("❌ Error fetching blog:", err);
          alert("Failed to load blog for editing");
        }
      };
      fetchBlog();
    }
  }, [isEdit, id]);

  // 🖼 Handle new image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreviewImage(URL.createObjectURL(file)); // live preview
  };

  // 🚀 Submit form (add or edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("content", content);
      if (image) formData.append("image", image);

      if (isEdit && id) {
        await axios.put(`http://localhost:8000/api/blogs/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Blog updated successfully!");
      } else {
        await axios.post("http://localhost:8000/api/blogs", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Blog added successfully!");
      }

      navigate("/blog");
    } catch (err) {
      console.error("❌ Error submitting blog:", err);
      alert("Failed to submit blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl w-full max-w-2xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">
          {isEdit ? "✏️ Edit Blog" : "📝 Add New Blog"}
        </h2>

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

        <div data-color-mode="dark" className="space-y-2">
          <label className="block text-sm text-gray-400">Content</label>
          <MDEditor
            value={content}
            onChange={(val) => setContent(val || "")}
            height={300}
            preview="live"
          />
        </div>

        {/* Featured Image */}
        <div className="mt-4">
          <label className="block text-sm text-gray-400 mb-1">
            Featured Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-gray-300 border p-2 rounded bg-gray-800 hover:underline hover:text-blue-400"
          />
          {previewImage && (
            <img
              src={
                previewImage.startsWith("http")
                  ? previewImage
                  : `http://localhost:8000/${previewImage.replace(/^\/+/, "")}`
              }
              alt="Preview"
              className="w-40 h-32 object-cover rounded-md border border-gray-700 mt-2"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 w-full py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading
            ? isEdit
              ? "Updating..."
              : "Adding..."
            : isEdit
            ? "Update Blog"
            : "Add Blog"}
        </button>
      </form>
    </div>
  );
}
