import express from "express";
import cors from "cors";
import path from "path";
import { raw as db } from "./db.ts";
import blogRoutes from "./server/blogRoutes.ts";
import authRoutes from "./server/authRoutes.ts";
import { verifyAdmin } from "./server/middleware.ts";

const app = express();

// ✅ MySQL connection test
(async () => {
  try {
    const [rows]: any = await db.execute("SELECT NOW() AS connected");
    console.log("✅ MySQL Connected:", rows[0]);
  } catch (err) {
    console.error("❌ MySQL connection failed:", err);
  }
})();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ Public blog routes
app.use("/api/blogs", blogRoutes);

// ✅ Auth routes
app.use("/api/auth", authRoutes);

// ✅ Protected admin routes (optional)
app.use("/api/admin/blogs", verifyAdmin, blogRoutes);

// ✅ Fallback
app.get("/", (_, res) => {
  res.send("🚀 Blog API running...");
});

// ✅ Start server
app.listen(8000, () =>
  console.log("🚀 Server running at http://localhost:8000")
);
