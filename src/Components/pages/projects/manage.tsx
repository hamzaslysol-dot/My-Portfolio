import Pagination from "../../common/pagenation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useProjects,
  useDeleteProject,
  Project,
} from "../../pages/hooks/useProjects";

export default function ManageProjects() {
  const navigate = useNavigate();
  const { data: projects, isLoading, isError } = useProjects();
  const deleteProject = useDeleteProject();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (isLoading)
    return (
      <p className="text-center text-gray-400 mt-10">Loading projects...</p>
    );
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">Failed to load projects.</p>
    );

  const filteredProjects =
    projects?.filter(
      (project: Project) =>
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.link.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const totalPages = Math.ceil(filteredProjects.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleProjects = filteredProjects.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-200">
            📰 Manage Projects
          </h1>
          <button
            onClick={() => navigate("/dashboard/projects/add")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            ➕ Add New Project
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by title or link..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-1/2 border border-gray-700 rounded-lg px-3 py-2 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none mb-6"
        />

        <div className="overflow-x-auto border border-gray-800 rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-900 text-gray-300">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Link</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleProjects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-400">
                    No projects found.
                  </td>
                </tr>
              ) : (
                visibleProjects.map((project: Project) => (
                  <tr
                    key={project.id}
                    className="border-t border-gray-800 hover:bg-gray-900 transition"
                  >
                    <td className="p-3">
                      {project.image ? (
                        <img
                          src={`http://localhost:8000${project.image}`}
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
                        onClick={() => deleteProject.mutate(project.id)}
                        className="text-red-500 hover:text-red-600 font-medium"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-10">
          <Pagination totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}
