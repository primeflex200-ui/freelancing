import { Navbar } from "@/components/ui/navbar";
import { motion } from "framer-motion";
import { useRef } from "react";
import VariableProximity from "@/components/ui/VariableProximity";
import Stack from "@/components/ui/Stack";

const stackwebProjects = [
  {
    title: "StackWeb Portfolio",
    description: "Our own portfolio website showcasing modern design and animations",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    tags: ["React", "Framer Motion", "Tailwind"]
  },
  {
    title: "Client Dashboard",
    description: "Project management dashboard for client collaboration",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["Next.js", "Supabase", "TypeScript"]
  },
  {
    title: "Design System",
    description: "Comprehensive component library and design system",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    tags: ["React", "Storybook", "Tailwind"]
  },
  {
    title: "Internal Tools",
    description: "Custom tools for project estimation and workflow automation",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    tags: ["Node.js", "Express", "MongoDB"]
  }
];

export default function StackWebProjects() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stackCards = stackwebProjects.map((project, index) => (
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
                label="StackWeb"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={containerRef}
                radius={150}
                falloff="linear"
                className="text-primary"
              />
              {" "}Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Our internal projects, tools, and experimental work
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
