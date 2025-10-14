// src/server/blogFront.ts
import express from "express";
import { db } from "../db.ts";
import { sql } from "drizzle-orm";

const router = express.Router();

/**
 * ✅ GET all blogs
 * Example: GET http://localhost:3000/api/blogs
 */
router.get("/", async (_req, res) => {
  try {
    // Fetch all blogs from your "blogs" table
    const [rows] = await db.execute(sql`
      SELECT id, author_name, date, image, title, description
      FROM blogs
      ORDER BY date DESC
    `);

    res.json(rows);
  } catch (error: any) {
    console.error("❌ Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

/**
 * ✅ GET a single blog by ID
 * Example: GET http://localhost:3000/api/blogs/1
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute(sql`SELECT * FROM blogs WHERE id = ${id}`);

    if (Array.isArray(rows) && rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error: any) {
    console.error("❌ Error fetching single blog:", error);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

export default router;
