// src/components/AddBlogForm.tsx
import { useState } from "react";

export default function AddBlogForm() {
  const [form, setForm] = useState({
    author_name: "",
    title: "",
    description: "",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("author_name", form.author_name);
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);

    await fetch("http://localhost:8000/api/blogs/add", {
      method: "POST",
      body: formData,
    });

    alert("✅ Blog added!");
    setForm({ author_name: "", title: "", description: "", image: null });
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add a New Blog</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="author_name"
          value={form.author_name}
          onChange={handleChange}
          placeholder="Author Name"
          className="border p-2 rounded"
          required
        />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Blog Title"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={6}
          className="border p-2 rounded"
          required
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
}
