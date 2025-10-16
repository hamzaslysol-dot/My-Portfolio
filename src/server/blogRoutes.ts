import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { raw as db } from "../db.ts"; // ✅ MySQL connection

const router = Router();

/* -------------------- SETUP MULTER -------------------- */
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

/* -------------------- ADD NEW BLOG -------------------- */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, author, description, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const [result]: any = await db.execute(
      "INSERT INTO blogs (title, author, description, content, image, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
      [title, author, description, content, image]
    );

    const [rows]: any = await db.execute("SELECT * FROM blogs WHERE id = ?", [
      result.insertId,
    ]);

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("❌ Error adding blog:", error);
    res.status(500).json({ error: "Failed to add blog" });
  }
});

/* -------------------- GET ALL BLOGS -------------------- */
router.get("/", async (_, res) => {
  try {
    const [rows]: any = await db.execute(`
      SELECT 
        id,
        author AS author_name,
        title,
        description,
        CONCAT('http://localhost:8000', image) AS image,
        created_at AS date
      FROM blogs
      ORDER BY created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

/* -------------------- GET SINGLE BLOG -------------------- */
router.get("/:id", async (req, res) => {
  try {
    const blogId = Number(req.params.id);
    const [rows]: any = await db.execute(
      `
      SELECT 
        id,
        author AS author_name,
        title,
        description,
        content,
        CONCAT('http://localhost:8000', image) AS image,
        created_at AS date
      FROM blogs
      WHERE id = ?
      `,
      [blogId]
    );

    if (rows.length === 0)
      return res.status(404).json({ error: "Blog not found" });

    res.json(rows[0]);
  } catch (error) {
    console.error("❌ Error fetching single blog:", error);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

/* -------------------- UPDATE BLOG -------------------- */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const blogId = Number(req.params.id);
    const { title, author, description, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    let query =
      "UPDATE blogs SET title = ?, author = ?, description = ?, content = ?";
    const fields: any[] = [title, author, description, content];

    if (image) {
      query += ", image = ?";
      fields.push(image);
    }

    query += " WHERE id = ?";
    fields.push(blogId);

    await db.execute(query, fields);

    const [rows]: any = await db.execute("SELECT * FROM blogs WHERE id = ?", [
      blogId,
    ]);

    if (rows.length === 0)
      return res.status(404).json({ error: "Blog not found" });

    res.json(rows[0]);
  } catch (error) {
    console.error("❌ Error updating blog:", error);
    res.status(500).json({ error: "Failed to update blog" });
  }
});

/* -------------------- DELETE BLOG -------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const blogId = Number(req.params.id);
    await db.execute("DELETE FROM blogs WHERE id = ?", [blogId]);
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Error deleting blog:", error);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

export default router; // ✅ Now at the very end
