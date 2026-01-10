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

  return httpServer;
}
