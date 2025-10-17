import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

export default function AddBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Featured image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // Upload an image and insert Markdown image syntax
  const handleInsertImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      // 👇 Adjust this endpoint to your actual upload route
      const res = await axios.post(
        "http://localhost:8000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const imageUrl = res.data?.url;
      if (!imageUrl) throw new Error("No image URL returned");

      // Insert markdown image syntax into content
      setContent((prev) => `${prev}\n\n![alt text](${imageUrl})\n`);
      alert("✅ Image inserted into Markdown!");
    } catch (error) {
      console.error("❌ Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = ""; // reset file input
    }
  };

  // Submit the full blog
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:8000/api/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Blog added successfully!");
      navigate("/manageblogs");
    } catch (error) {
      console.error("❌ Error adding blog:", error);
      alert("Failed to add blog");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl w-full max-w-2xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">📝 Add New Blog</h2>

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

          {/* 🔽 Markdown Toolbar (image insert) */}
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
                "Write your blog in Markdown... e.g., **bold**, _italic_, or ![alt](image_url)",
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
            onChange={handleImageChange}
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
          Add Blog
        </button>
      </form>
    </div>
  );
}
