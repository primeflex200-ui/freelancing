import { Navbar } from "@/components/ui/navbar";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useLocation } from "wouter";
import VariableProximity from "@/components/ui/VariableProximity";
import CircularGallery from "@/components/ui/CircularGallery";

const projects = [
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    text: "Professional",
    link: "/work/professional"
  },
  {
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    text: "Gaming",
    link: "/work/gaming"
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
    text: "Startups",
    link: "/work/startups"
  },
  {
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    text: "API & Backends",
    link: "/work/api-backends"
  }
];

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  const handleItemClick = (index: number, item: any) => {
    if (item.link) {
      setLocation(item.link);
    }
  };

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
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Explore our portfolio of successful projects across various industries.
            </p>
            <p className="text-sm text-muted-foreground">
              Click on any category to view projects
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
              onItemClick={handleItemClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
