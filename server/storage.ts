import { type User, type InsertUser, type Project, type InsertProject } from "@shared/schema";
import { randomUUID } from "crypto";
import { supabase } from "./supabase";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  insertProject(project: InsertProject): Promise<Project>;
  getAllProjects(): Promise<Project[]>;
  deleteProject(id: string): Promise<void>;
  clearAllProjects(): Promise<void>;
}

export class SupabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return undefined;
    return data as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error) return undefined;
    return data as User;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert([insertUser])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data as User;
  }

  async insertProject(insertProject: InsertProject): Promise<Project> {
    // Convert camelCase to snake_case for database
    const dbProject: any = {
      website_type: insertProject.websiteType,
      project_name: insertProject.projectName,
      project_description: insertProject.projectDescription,
      communication_methods: insertProject.communicationMethods,
      budget: insertProject.budget,
      domain: insertProject.domain,
      name: insertProject.name,
      email: insertProject.email,
      phone: insertProject.phone,
      company: insertProject.company,
    };

    // Only add design fields if they are provided
    if (insertProject.selectedDesignId) {
      dbProject.selected_design_id = insertProject.selectedDesignId;
    }
    if (insertProject.selectedDesignTitle) {
      dbProject.selected_design_title = insertProject.selectedDesignTitle;
    }
    if (insertProject.selectedDesignCategory) {
      dbProject.selected_design_category = insertProject.selectedDesignCategory;
    }
    if (insertProject.selectedDesignImageUrl) {
      dbProject.selected_design_image_url = insertProject.selectedDesignImageUrl;
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([dbProject])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    
    // Convert snake_case back to camelCase
    return {
      id: data.id,
      websiteType: data.website_type,
      projectName: data.project_name,
      projectDescription: data.project_description,
      communicationMethods: data.communication_methods,
      budget: data.budget,
      domain: data.domain,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      selectedDesignId: data.selected_design_id || null,
      selectedDesignTitle: data.selected_design_title || null,
      selectedDesignCategory: data.selected_design_category || null,
      selectedDesignImageUrl: data.selected_design_image_url || null,
      createdAt: new Date(data.created_at),
    } as Project;
  }

  async getAllProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    
    // Convert snake_case to camelCase
    return data.map(project => ({
      id: project.id,
      websiteType: project.website_type,
      projectName: project.project_name,
      projectDescription: project.project_description,
      communicationMethods: project.communication_methods,
      budget: project.budget,
      domain: project.domain,
      name: project.name,
      email: project.email,
      phone: project.phone,
      company: project.company,
      selectedDesignId: project.selected_design_id || null,
      selectedDesignTitle: project.selected_design_title || null,
      selectedDesignCategory: project.selected_design_category || null,
      selectedDesignImageUrl: project.selected_design_image_url || null,
      createdAt: new Date(project.created_at),
    })) as Project[];
  }

  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  }

  async clearAllProjects(): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows
    
    if (error) throw new Error(error.message);
  }
}

// Fallback to in-memory storage if Supabase is not configured
export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async insertProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { 
      ...insertProject,
      phone: insertProject.phone ?? null,
      company: insertProject.company ?? null,
      id,
      createdAt: new Date(),
      selectedDesignId: insertProject.selectedDesignId || null,
      selectedDesignTitle: insertProject.selectedDesignTitle || null,
      selectedDesignCategory: insertProject.selectedDesignCategory || null,
      selectedDesignImageUrl: insertProject.selectedDesignImageUrl || null,
    };
    this.projects.set(id, project);
    return project;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async deleteProject(id: string): Promise<void> {
    this.projects.delete(id);
  }

  async clearAllProjects(): Promise<void> {
    this.projects.clear();
  }
}

// Use Supabase if configured, otherwise use in-memory storage
const useSupabase = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY;
export const storage: IStorage = useSupabase ? new SupabaseStorage() : new MemStorage();

if (useSupabase) {
  console.log('✅ Using Supabase for data storage');
} else {
  console.log('⚠️  Using in-memory storage (data will be lost on restart). Configure Supabase for persistent storage.');
}
