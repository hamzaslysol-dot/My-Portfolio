// import { useParams, Link } from "react-router-dom";
// import Container from "./container";
// import Navbar from "./NavBar";

// const SingleBlog = () => {
//   const { id } = useParams();
//   const blog = BlogView.find((b) => b.id === Number(id));

//   if (!blog) {
//     return (
//       <div className="text-center text-white mt-10">
//         <h1>Blog not found</h1>
//         <Link to="/" className="text-blue-400 underline">
//           Go back
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-black min-h-screen text-white">
//       <Navbar />
//       <Container>
//         <div className="max-w-3xl mx-auto">
//           <img
//             src={blog.imgSrc}
//             alt={blog.alt}
//             className="w-full h-96 rounded-3xl mb-5 object-cover"
//           />
//           <h1 className="text-5xl font-bold mb-3">{blog.title}</h1>
//           <p className="text-gray-400 flex gap-5 mb-6">
//             By: {blog.name} - Date:{blog.date}
//           </p>
//           <p className="text-lg leading-relaxed">{blog.fullDes || blog.des}</p>

//           <Link to="/blog" className="block mt-8 text-2xl hover:text-blue-300">
//             ← Back
//           </Link>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default SingleBlog;
