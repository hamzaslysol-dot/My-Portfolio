import {
  mysqlTable,
  serial,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

export const blogs = mysqlTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  image: varchar("image", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
});
