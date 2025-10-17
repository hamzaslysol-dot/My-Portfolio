import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

interface Blog {
  id: number;
  title: string;
  author: string;
  content: string;
  image: string;
}

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // ✅ Fetch existing blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get<Blog>(
          `http://localhost:8000/api/blogs/${id}`
        );
        const blog = res.data;
        setTitle(blog.title);
        setAuthor(blog.author);
        setContent(blog.content);
        setPreview(blog.image);
      } catch (error) {
        console.error("❌ Error fetching blog:", error);
        alert("Blog not found!");
        navigate(`/blog/${id}`);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  const handleFeaturedImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : preview);
  };

  // ✅ Upload image and insert Markdown syntax
  const handleInsertImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      // 👇 Adjust endpoint to your backend image upload route
      const res = await axios.post(
        "http://localhost:8000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const imageUrl = res.data?.url;
      if (!imageUrl) throw new Error("No image URL returned");

      // Insert markdown image syntax
      setContent((prev) => `${prev}\n\n![alt text](${imageUrl})\n`);
      alert("✅ Image inserted into Markdown!");
    } catch (error) {
      console.error("❌ Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = ""; // reset input
    }
  };

  // ✅ Submit updated data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await axios.put(`http://localhost:8000/api/blogs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Blog updated successfully!");
      navigate("/dashboard/view");
    } catch (error) {
      console.error("❌ Error updating blog:", error);
      alert("Failed to update blog");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;

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

        {/* ✨ Markdown Editor */}
        <div data-color-mode="dark" className="space-y-2">
          <label className="block text-sm text-gray-400">
            Content (Markdown)
          </label>

          {/* 🖼️ Markdown Image Insert */}
          <div className="flex justify-end mb-1">
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition">
              {uploading ? "Uploading..." : "Insert Image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleInsertImage}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

          <MDEditor
            value={content}
            onChange={(val) => setContent(val || "")}
            height={300}
            preview="live"
            textareaProps={{
              placeholder:
                "Edit your blog using Markdown... e.g., **bold**, _italic_, ![alt](image_url)",
            }}
          />
        </div>

        {/* 🖼️ Featured Image Upload */}
        <div className="mt-4">
          <label className="block text-sm text-gray-400 mb-1">
            Featured Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFeaturedImageChange}
            className="w-full text-gray-300"
          />
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg mt-3"
          />
        )}

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 w-full py-2 rounded-lg transition"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
