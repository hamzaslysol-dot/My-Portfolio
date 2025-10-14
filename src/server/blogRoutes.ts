import express from "express";
import { db } from "../db.ts";
import { sql } from "drizzle-orm";

const router = express.Router();

/**
 * ✅ GET blogs with pagination
 * Example: GET http://localhost:8000/api/blogs?page=1&limit=6
 */
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 6;
  const offset = (page - 1) * limit;

  try {
    // ✅ Fetch total number of blogs
    const [countResult]: any = await db.execute(
      sql`SELECT COUNT(*) AS count FROM blogs;`
    );
    const total = Array.isArray(countResult) ? countResult[0]?.count : 0;

    // ✅ Fetch blogs for current page
    const [rows]: any = await db.execute(
      sql.raw(
        `SELECT * FROM blogs ORDER BY date DESC LIMIT ${limit} OFFSET ${offset}`
      )
    );

    res.json({
      data: rows,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("❌ Error fetching blogs:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
