import express from "express";
import cors from "cors";
import blogRoutes from "./server/blogRoutes.ts";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/blogs", blogRoutes);

app.listen(8000, () => console.log("🚀 Server running on port 8000"));
