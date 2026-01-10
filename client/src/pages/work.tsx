import { Navbar } from "@/components/ui/navbar";
import { motion } from "framer-motion";
import { useRef } from "react";
import VariableProximity from "@/components/ui/VariableProximity";
import CircularGallery from "@/components/ui/CircularGallery";

const projects = [
  {
    image: "/attached_assets/proff_icons.jpg",
    text: "Professional"
  },
  {
    image: "/attached_assets/generated_images/3d_macbook_floating_with_code_snippets_and_neon_glow.png",
    text: "Gaming"
  },
  {
    image: "/attached_assets/generated_images/web_upload_1.jpeg",
    text: "Startups"
  },
  {
    image: "/attached_assets/generated_images/web_upload_2.png",
    text: "API & Backends"
  }
];

export default function Work() {
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
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-black">
              Our{" "}
              <VariableProximity
                label="Work"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={containerRef}
                radius={150}
                falloff="linear"
                className="text-primary"
              />
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our portfolio of successful projects across various industries.
            </p>
          </motion.div>

          {/* Circular Gallery */}
          <div style={{ height: '600px', position: 'relative' }}>
            <CircularGallery 
              items={projects}
              bend={3} 
              textColor="#000000" 
              borderRadius={0.05} 
              scrollEase={0.02}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
