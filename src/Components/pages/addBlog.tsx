// src/Components/pages/addBlog.tsx
import { useState } from "react";

export default function AddBlogForm() {
  const [title, setTitle] = useState("");
  const [author_name, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author_name", author_name);
    formData.append("description", description);
    if (image) formData.append("image", image);

    const res = await fetch("http://localhost:8000/api/blogs", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 text-black bg-gray-300 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Author Name"
          className="w-full p-2 border rounded"
          value={author_name}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <button
          type="submit"
          className="bg-blue-200 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
}
