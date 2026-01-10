import { Navbar } from "@/components/ui/navbar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Calendar, Mail, Phone, Building, DollarSign, Globe, FileText, Trash2, AlertTriangle } from "lucide-react";

interface Project {
  id: string;
  websiteType: string;
  projectName: string;
  projectDescription: string;
  communicationMethods: string;
  budget: string;
  domain: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  createdAt: string;
}

export default function Admin() {
  const [code, setCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setProjects(data.projects);
      } else {
        setError("Invalid admin code");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setProjects(projects.filter(p => p.id !== id));
      } else {
        alert("Failed to delete project: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      console.error("Delete error:", err);
      alert("An error occurred while deleting: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    setShowClearConfirm(false);
    setLoading(true);
    
    try {
      const response = await fetch("/api/admin/projects", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setProjects([]);
      } else {
        alert("Failed to clear projects: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      console.error("Clear error:", err);
      alert("An error occurred while clearing: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-md">
            <div className="glass p-8 rounded-2xl">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-black text-center mb-2">Admin Panel</h1>
              <p className="text-muted-foreground text-center mb-8">
                Enter admin code to access project submissions
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Admin Code
                  </label>
                  <Input
                    type="password"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter admin code"
                    onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
                    className="w-full"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <Button
                  onClick={handleVerify}
                  disabled={!code || loading}
                  className="w-full bg-black text-white hover:bg-zinc-800 rounded-full"
                >
                  {loading ? "Verifying..." : "Access Admin Panel"}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">Project Submissions</h1>
              <p className="text-muted-foreground">
                Total submissions: {projects.length}
              </p>
            </div>
            {projects.length > 0 && (
              <Button
                onClick={() => setShowClearConfirm(true)}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {/* Clear All Confirmation Dialog */}
          {showClearConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="glass p-6 rounded-2xl max-w-md w-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">Clear All Projects?</h3>
                    <p className="text-muted-foreground">
                      This will permanently delete all {projects.length} project submissions. This action cannot be undone.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <Button
                    onClick={() => setShowClearConfirm(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleClearAll}
                    className="bg-red-500 text-white hover:bg-red-600"
                    disabled={loading}
                  >
                    {loading ? "Clearing..." : "Clear All"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {projects.length === 0 ? (
            <div className="glass p-12 rounded-2xl text-center">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">No submissions yet</h3>
              <p className="text-muted-foreground">
                Project submissions will appear here once clients submit their requests.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="glass p-6 rounded-2xl relative">
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    disabled={deletingId === project.id}
                    className="absolute top-4 right-4 p-2 hover:bg-red-50 rounded-lg transition-colors group"
                    title="Delete project"
                  >
                    <Trash2 className={`w-5 h-5 ${deletingId === project.id ? 'text-gray-400' : 'text-red-500 group-hover:text-red-600'}`} />
                  </button>

                  <div className="flex items-start justify-between mb-4 pr-12">
                    <div>
                      <h3 className="text-2xl font-bold text-black mb-1">
                        {project.projectName}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full capitalize">
                        {project.websiteType.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar className="w-4 h-4" />
                        {formatDate(project.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-muted-foreground">{project.projectDescription}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-black mb-2">Communication Methods:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.communicationMethods.split(", ").map((method, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full capitalize">
                          {method === "admin" ? "Admin Panel" : 
                           method === "gmail" ? "Gmail" : 
                           method === "whatsapp" ? "WhatsApp" : 
                           "SMS Message"}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-3 p-3 bg-black/5 rounded-lg">
                      <DollarSign className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Budget</p>
                        <p className="font-semibold text-black">₹{project.budget}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-black/5 rounded-lg">
                      <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Domain</p>
                        <p className="font-semibold text-black capitalize">
                          {project.domain === "own" ? "Own Domain" : "StackWeb Domain"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-black/10 pt-4">
                    <h4 className="font-semibold text-black mb-3">Contact Information</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Name</p>
                          <p className="text-sm font-medium text-black">{project.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="text-sm font-medium text-black">{project.email}</p>
                        </div>
                      </div>

                      {project.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Phone</p>
                            <p className="text-sm font-medium text-black">{project.phone}</p>
                          </div>
                        </div>
                      )}

                      {project.company && (
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Company</p>
                            <p className="text-sm font-medium text-black">{project.company}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
