import { useState } from "react";
import axios from "axios";

const AddBlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:8000/api/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Blog added successfully!");
      setTitle("");
      setAuthor("");
      setDescription("");
      setContent("");
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding blog.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog title"
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author name"
          className="w-full border rounded p-2"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description"
          rows={2}
          className="w-full border rounded p-2"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Full blog content"
          rows={5}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Blog
        </button>
      </form>
      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
};

export default AddBlogForm;
