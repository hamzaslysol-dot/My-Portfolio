import express from "express";
import cors from "cors";
import blogRoutes from "./server/blogRoutes.ts";
import { raw as db } from "./db.ts";

const app = express();

(async () => {
  try {
    const [rows] = await db.execute("SELECT NOW() AS connected");
    console.log("✅ MySQL Connected:", rows);
  } catch (err) {
    console.error("❌ MySQL connection failed:", err);
  }
})();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/blogs", blogRoutes);

app.listen(8000, () => console.log("🚀 Server running on port 8000"));
