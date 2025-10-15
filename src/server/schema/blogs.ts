import {
  mysqlTable,
  serial,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

export const blogs = mysqlTable("blogs", {
  id: serial("id").primaryKey(),
  author: varchar("author", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  image: varchar("image", { length: 500 }),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
