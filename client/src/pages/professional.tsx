import { Navbar } from "@/components/ui/navbar";
import { motion } from "framer-motion";
import { useRef } from "react";
import VariableProximity from "@/components/ui/VariableProximity";
import Stack from "@/components/ui/Stack";

const professionalProjects = [
  {
    title: "Corporate Website",
    description: "Modern corporate website with custom CMS and analytics dashboard",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "PostgreSQL"]
  },
  {
    title: "Business Portfolio",
    description: "Professional portfolio website with dynamic content management",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    tags: ["Next.js", "TypeScript", "Tailwind"]
  },
  {
    title: "E-commerce Platform",
    description: "Full-featured online store with payment integration",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    tags: ["React", "Stripe", "MongoDB"]
  },
  {
    title: "Real Estate Website",
    description: "Property listing platform with advanced search filters",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    tags: ["Vue.js", "Firebase", "Maps API"]
  }
];

export default function Professional() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stackCards = professionalProjects.map((project, index) => (
    <div key={index} className="relative w-full h-full">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-white/80 text-sm mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  ));

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
                label="Professional"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={containerRef}
                radius={150}
                falloff="linear"
                className="text-primary"
              />
              {" "}Websites
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Corporate websites, business portfolios, and professional web solutions
            </p>
            <p className="text-sm text-muted-foreground">
              Drag or click cards to explore projects
            </p>
          </motion.div>

          {/* Stack Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div style={{ width: '100%', maxWidth: '500px', height: '500px', margin: '0 auto' }}>
              <Stack
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={true}
                cards={stackCards}
              />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
