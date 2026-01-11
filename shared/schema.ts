import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  websiteType: text("website_type").notNull(),
  projectName: text("project_name").notNull(),
  projectDescription: text("project_description").notNull(),
  communicationMethods: text("communication_methods").notNull(),
  budget: text("budget").notNull(),
  domain: text("domain").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  selectedDesignId: text("selected_design_id"),
  selectedDesignTitle: text("selected_design_title"),
  selectedDesignCategory: text("selected_design_category"),
  selectedDesignImageUrl: text("selected_design_image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Custom schema for API that accepts camelCase
export const insertProjectSchema = z.object({
  websiteType: z.string(),
  projectName: z.string(),
  projectDescription: z.string(),
  communicationMethods: z.string(),
  budget: z.string(),
  domain: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  selectedDesignId: z.string().nullable().optional(),
  selectedDesignTitle: z.string().nullable().optional(),
  selectedDesignCategory: z.string().nullable().optional(),
  selectedDesignImageUrl: z.string().nullable().optional(),
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
