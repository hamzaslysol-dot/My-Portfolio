// projectTable.tsx
import { Project } from "../hooks/useProjects";

interface ProjectTableProps {
  projects?: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

export default function ProjectTable({
  projects = [],
  onEdit,
  onDelete,
}: ProjectTableProps) {
  if (projects.length === 0) return <p>No projects found.</p>;

  return (
    <table className="w-full text-left border-collapse border border-gray-700">
      <thead className="bg-gray-900 text-gray-300">
        <tr>
          <th className="p-3">Image</th>
          <th className="p-3">Title</th>
          <th className="p-3">Link</th>
          <th className="p-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr
            key={project.id}
            className="border-t border-gray-800 hover:bg-gray-900 transition"
          >
            <td className="p-3">
              {project.image ? (
                <img
                  src={
                    project.image.startsWith("http")
                      ? project.image
                      : `http://localhost:8000/${project.image}`
                  }
                  alt={project.title}
                  className="w-20 h-14 object-cover rounded-md border border-gray-700"
                />
              ) : (
                <div className="w-20 h-14 bg-gray-800 rounded-md flex items-center justify-center text-gray-500 text-sm">
                  No Img
                </div>
              )}
            </td>
            <td className="p-3">{project.title}</td>
            <td className="p-3">{project.link}</td>
            <td className="p-3 text-center space-x-3">
              <button
                onClick={() => onEdit(project)}
                className="text-blue-400 hover:text-blue-500 font-medium"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(project.id)}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                🗑️ Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
