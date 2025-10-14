// src/server/blogFront.ts
import express from "express";
import { db } from "../db.ts";
import { sql } from "drizzle-orm";

const router = express.Router();

/**
 * ✅ GET all blogs
 * Example: GET http://localhost:8000/api/blogs
 */
router.get("/", async (_req, res) => {
  try {
    const [rows] = await db.execute(
      sql`SELECT * FROM blogs ORDER BY date DESC;`
    );
    res.json(rows);
  } catch (error: any) {
    console.error("❌ Error fetching blogs:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * ✅ GET a single blog by ID
 * Example: GET http://localhost:8000/api/blogs/1
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute(
      sql`SELECT * FROM blogs WHERE id = ${id} LIMIT 1;`
    );
    if (Array.isArray(rows) && rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error: any) {
    console.error("❌ Error fetching blog:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * ✅ POST - Add a new blog
 * Example: POST http://localhost:8000/api/blogs
 */
router.post("/", async (req, res) => {
  try {
    const { author_name, image, title, description } = req.body;
    await db.execute(
      sql`INSERT INTO blogs (author_name, image, title, description) VALUES (${author_name}, ${image}, ${title}, ${description})`
    );
    res.json({ message: "✅ Blog added successfully!" });
  } catch (error: any) {
    console.error("❌ Error adding blog:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * ✅ PUT - Update a blog
 * Example: PUT http://localhost:8000/api/blogs/1
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    await db.execute(
      sql`UPDATE blogs SET title=${title}, description=${description} WHERE id=${id}`
    );
    res.json({ message: "✅ Blog updated successfully!" });
  } catch (error: any) {
    console.error("❌ Error updating blog:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * ✅ DELETE - Delete a blog
 * Example: DELETE http://localhost:8000/api/blogs/1
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute(sql`DELETE FROM blogs WHERE id=${id}`);
    res.json({ message: "🗑️ Blog deleted successfully!" });
  } catch (error: any) {
    console.error("❌ Error deleting blog:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
