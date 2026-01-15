import { Navbar } from "@/components/ui/navbar";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useLocation } from "wouter";
import VariableProximity from "@/components/ui/VariableProximity";
import Stack from "@/components/ui/Stack";
import { DesignPreviewModal } from "@/components/ui/DesignPreviewModal";
import { getDesignsByCategory, DesignPrototype } from "@/data/designs";
import { useDesignSelection } from "@/contexts/DesignSelectionContext";

export default function Startups() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();
  const { selectDesign } = useDesignSelection();
  const [previewDesign, setPreviewDesign] = useState<DesignPrototype | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const designs = getDesignsByCategory('startups');

  const handleCardClick = (index: number) => {
    setPreviewDesign(designs[index]);
    setIsModalOpen(true);
  };

  const handleSelectDesign = () => {
    if (previewDesign) {
      selectDesign(previewDesign);
      setIsModalOpen(false);
      setTimeout(() => {
        setLocation('/start-project');
      }, 300);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPreviewDesign(null);
  };

  const stackCards = designs.map((design, index) => (
    <div key={index} className="relative w-full h-full">
      <img
        src={design.imageUrl}
        alt={design.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
        <h3 className="text-xl font-bold text-white mb-2">{design.title}</h3>
        <p className="text-white/80 text-sm mb-3">{design.description}</p>
        <div className="flex flex-wrap gap-2">
          {design.techStack.map((tag, i) => (
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
                label="Startups"
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
              MVP platforms, SaaS products, and innovative startup solutions
            </p>
            <p className="text-sm text-muted-foreground">
              Click on a design to view details and select
            </p>
          </motion.div>

          {/* Stack Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="w-full h-full md:max-w-[500px] md:h-[500px] max-w-[350px] h-[350px] mx-auto">
              <Stack
                randomRotation={true}
                sensitivity={120} // More sensitive - reduced from 180 to 120
                sendToBackOnClick={false}
                cards={stackCards}
                onCardClick={handleCardClick}
                enablePreview={true}
              />
            </div>
          </motion.div>

          {/* Design Preview Modal */}
          <DesignPreviewModal
            design={previewDesign}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSelect={handleSelectDesign}
          />
        </div>
      </main>
    </div>
  );
}
