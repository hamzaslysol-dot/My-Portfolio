import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddProject } from "../hooks/useProjects";

export default function AddProject() {
  const navigate = useNavigate();
  const addProject = useAddProject();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    if (image) formData.append("image", image);

    addProject.mutate(formData, {
      onSuccess: () => {
        alert("✅ Project added successfully!");
        navigate("/dashboard/projects/view");
      },
      onError: () => alert("❌ Failed to add project"),
    });
  };

  return (
    <div className="bg-black min-h-screen text-white flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl w-full max-w-2xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">📝 Add New Project</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <input
          type="text"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Insert Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border-2 border-gray-500 w-full p-2 hover:bg-blue-300"
          />

          {previewImage && (
            <div className="relative w-40 h-32 mt-2">
              {/* Remove button */}
              <button
                type="button"
                onClick={() => {
                  setPreviewImage(null);
                  setImage(null); // also reset your file state
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold hover:bg-red-700 transition"
              >
                -
              </button>
              {/* Preview image */}
              <img
                src={previewImage}
                alt="Preview"
                className="w-40 h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={addProject.isPending}
          className="bg-green-600 hover:bg-green-700 w-full py-2 rounded-lg transition disabled:opacity-50"
        >
          {addProject.isPending ? "Adding..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}
