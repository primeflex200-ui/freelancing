import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema } from "../shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Submit project request
  app.post("/api/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.insertProject(projectData);
      res.json({ success: true, project });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // Verify admin code and get all projects
  app.post("/api/admin/verify", async (req, res) => {
    const { code } = req.body;
    const ADMIN_CODE = "freelancing.2025pjct";
    
    if (code === ADMIN_CODE) {
      try {
        const projects = await storage.getAllProjects();
        res.json({ success: true, projects });
      } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
      }
    } else {
      res.status(401).json({ success: false, error: "Invalid admin code" });
    }
  });

  // Delete a project (must come before the clear all route)
  app.delete("/api/admin/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteProject(id);
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, message: "Project deleted successfully" });
    } catch (error: any) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Clear all projects
  app.delete("/api/admin/projects", async (req, res) => {
    try {
      await storage.clearAllProjects();
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, message: "All projects cleared successfully" });
    } catch (error: any) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ success: false, error: error.message });
    }
  });

  return httpServer;
}
