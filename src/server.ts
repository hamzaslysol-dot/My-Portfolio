// src/server.ts
import express from "express";
import cors from "cors";
import blogRoutes from "./server/blogRoutes.ts";
import setupBlogsTableRoutes from "./server/setupBlogsTableRoutes.ts";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Mount routes
app.use("/api/blogs", blogRoutes);
app.use("/api/setup", setupBlogsTableRoutes);

app.listen(8000, () => console.log("🚀 Server running on port 8000"));
