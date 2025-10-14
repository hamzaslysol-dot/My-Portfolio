import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { raw as db } from "../db.ts"; // ✅ use raw connection from mysql2/promise

const router = Router();

// Ensure upload folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ➕ CREATE Blog (with author, title, description, image)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, author, description, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const [result]: any = await db.execute(
      "INSERT INTO blogs (title, author, description, content, image, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
      [title, author, description, content, image]
    );

    const insertedId = result.insertId;
    const [rows]: any = await db.execute("SELECT * FROM blogs WHERE id = ?", [
      insertedId,
    ]);

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ error: "Failed to add blog" });
  }
});

// 📄 READ all blogs
router.get("/", async (_, res) => {
  try {
    const [rows]: any = await db.execute(
      "SELECT * FROM blogs ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// 🗑️ DELETE blog by ID
router.delete("/:id", async (req, res) => {
  try {
    const blogId = Number(req.params.id);
    await db.execute("DELETE FROM blogs WHERE id = ?", [blogId]);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

export default router;
