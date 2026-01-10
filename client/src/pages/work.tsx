import { Navbar } from "@/components/ui/navbar";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "TechCorp Enterprise",
    category: "Professional",
    description: "Corporate website with custom CMS and analytics dashboard",
    image: "/assets/generated_images/professional_dark_macbook_with_slate_gray_accents.png",
    tags: ["React", "Node.js", "PostgreSQL"]
  },
  {
    title: "GameZone Esports",
    category: "Gaming",
    description: "Immersive gaming platform with live streaming integration",
    image: "/assets/generated_images/3d_macbook_floating_with_code_snippets_and_neon_glow.png",
    tags: ["Next.js", "WebRTC", "Redis"]
  },
  {
    title: "StartupLaunch SaaS",
    category: "Startups",
    description: "MVP platform with subscription management and analytics",
    image: "/assets/generated_images/web_upload_1.jpeg",
    tags: ["React", "Stripe", "AWS"]
  },
  {
    title: "API Gateway Pro",
    category: "API & Backend",
    description: "Scalable API infrastructure with microservices architecture",
    image: "/assets/generated_images/web_upload_2.png",
    tags: ["Node.js", "Docker", "Kubernetes"]
  }
];

export default function Work() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-black">
              Our <span className="text-primary">Work</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our portfolio of successful projects across various industries.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="glass rounded-xl overflow-hidden">
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-br from-black/5 to-black/10 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      draggable="false"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-xs font-mono uppercase tracking-wider text-primary">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-black mt-2 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full bg-black/5 text-black"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
