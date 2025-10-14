// routes/setupBlogsTable.ts
import express from "express";
import { db } from "../db.ts";
import { sql } from "drizzle-orm";

const router = express.Router();

// Create the blogs table if not exists
router.post("/create-blogs-table", async (_req, res) => {
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        author_name VARCHAR(255) NOT NULL,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        image VARCHAR(500),
        title VARCHAR(255) NOT NULL,
        description TEXT
      );
    `);
    res.json({ message: "✅ 'blogs' table created successfully!" });
  } catch (error: any) {
    console.error("❌ Error creating table:", error);
    res.status(500).json({ error: error.message });
  }
});
// routes/setupBlogsTable.ts (continued)
router.post("/insert-demo-blogs", async (_req, res) => {
  try {
    await db.execute(sql`
      INSERT INTO blogs (author_name, image, title, description)
      VALUES
        (
          'John Doe',
          'https://picsum.photos/800/400?random=1',
          'Mastering React in 2025',
          'React continues to dominate frontend development. In this post, we explore the newest hooks and features in React 19.'
        ),
        (
          'Jane Smith',
          'https://picsum.photos/800/400?random=2',
          'Building Scalable Backends with Express & MySQL',
          'Learn how to use Express.js with MySQL effectively — including connection pooling, query optimization, and best practices.'
        ),
        (
          'Alex Johnson',
          'https://picsum.photos/800/400?random=3',
          'Tailwind CSS: Modern UI Design Simplified',
          'Tailwind CSS provides utility-first design tools that help developers build modern, responsive UIs quickly.'
        ),
        (
          'Sophia Lee',
          'https://picsum.photos/800/400?random=4',
          'The Future of Full Stack Development',
          'A look into the tools, frameworks, and skills every full stack developer needs to stay competitive in 2025.'
        );
    `);

    res.json({ message: "✅ Demo blogs inserted successfully!" });
  } catch (error: any) {
    console.error("❌ Error inserting demo blogs:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
