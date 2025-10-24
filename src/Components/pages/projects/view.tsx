// // src/pages/dashboard/DashboardView.tsx
// import React from "react";
// import { useBlogs } from "../../hooks/useBlogs";
// import { useNavigate } from "react-router-dom";

// export default function DashboardView() {
//   const navigate = useNavigate();
//   const { data: blogs = [], isLoading, isError, deleteMutation } = useBlogs();

//   const handleEdit = (id: string) => {
//     navigate(`/dashboard/blogs/edit/${id}`);
//   };

//   const handleDelete = (id: string) => {
//     deleteMutation.mutate(id);
//   };

//   if (isLoading) return <p>Loading blogs...</p>;
//   if (isError) return <p>Failed to load blogs.</p>;
//   if (blogs.length === 0) return <p>No blogs found.</p>;

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Blogs</h1>
//       <button
//         onClick={() => navigate("/dashboard/blogs/add")}
//         className="mb-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
//       >
//         Add Blog
//       </button>

//       <table className="w-full text-left border-collapse border border-gray-700">
//         <thead className="bg-gray-900 text-gray-300">
//           <tr>
//             <th className="p-3">Title</th>
//             <th className="p-3">Category</th>
//             <th className="p-3 text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {blogs.map((blog) => (
//             <tr
//               key={blog.id}
//               className="border-t border-gray-800 hover:bg-gray-900 transition"
//             >
//               <td className="p-3">{blog.title}</td>
//               <td className="p-3">{blog.category}</td>
//               <td className="p-3 text-center space-x-3">
//                 <button
//                   onClick={() => handleEdit(blog.id)}
//                   className="text-blue-400 hover:text-blue-500 font-medium"
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(blog.id)}
//                   className="text-red-500 hover:text-red-600 font-medium"
//                 >
//                   🗑️ Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
