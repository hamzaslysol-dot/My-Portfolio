import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

// ✅ Create a MySQL connection pool
export const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
});

// ✅ Create Drizzle ORM instance (optional, for typed queries)
export const db = drizzle(pool);

// ✅ Export the pool for raw SQL access
export const raw = pool;
