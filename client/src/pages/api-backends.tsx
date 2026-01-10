import { Navbar } from "@/components/ui/navbar";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useRef } from "react";
import VariableProximity from "@/components/ui/VariableProximity";

const apiProjects = [
  {
    title: "RESTful API Gateway",
    description: "Scalable API infrastructure with microservices architecture",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    tags: ["Node.js", "Docker", "Kubernetes"],
    link: "#"
  },
  {
    title: "GraphQL Backend",
    description: "Modern GraphQL API with real-time subscriptions",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    tags: ["GraphQL", "Apollo", "PostgreSQL"],
    link: "#"
  },
  {
    title: "Authentication Service",
    description: "Secure authentication and authorization system",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    tags: ["JWT", "OAuth", "Redis"],
    link: "#"
  },
  {
    title: "Data Processing Pipeline",
    description: "High-performance data processing and analytics backend",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["Python", "Apache Kafka", "MongoDB"],
    link: "#"
  }
];

export default function ApiBackends() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background text-foreground" ref={containerRef}>
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
              <VariableProximity
                label="API & Backends"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={containerRef}
                radius={150}
                falloff="linear"
                className="text-primary"
              />
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Scalable APIs, backend systems, and microservices architecture
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {apiProjects.map((project, index) => (
              <motion.a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
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
              </motion.a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
