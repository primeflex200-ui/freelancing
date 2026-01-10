import { Navbar } from "@/components/ui/navbar";
import { motion } from "framer-motion";
import { useRef } from "react";
import VariableProximity from "@/components/ui/VariableProximity";
import Stack from "@/components/ui/Stack";

const gamingProjects = [
  {
    title: "Esports Tournament Platform",
    description: "Live streaming platform with tournament management system",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    tags: ["React", "WebRTC", "Socket.io"]
  },
  {
    title: "Gaming Community Hub",
    description: "Social platform for gamers with chat and matchmaking",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
    tags: ["Next.js", "Discord API", "Redis"]
  },
  {
    title: "Game Stats Tracker",
    description: "Real-time statistics and analytics for competitive gaming",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop",
    tags: ["Vue.js", "GraphQL", "MongoDB"]
  },
  {
    title: "Gaming Clan Website",
    description: "Professional clan website with member management",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop",
    tags: ["React", "Firebase", "Tailwind"]
  }
];

export default function Gaming() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stackCards = gamingProjects.map((project, index) => (
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
                label="Gaming"
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
              Esports platforms, gaming communities, and interactive gaming experiences
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
