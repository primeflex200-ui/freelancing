import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import ShinyText from "@/components/ui/ShinyText";
import heroImage1 from "@assets/generated_images/3d_macbook_floating_with_code_snippets_and_neon_glow.png";
import heroImage2 from "@assets/generated_images/professional_dark_macbook_with_slate_gray_accents.png";
import heroImage3 from "@assets/generated_images/web_upload_1.jpeg";
import heroImage4 from "@assets/generated_images/web_upload_2.png";
import bgTexture from "@assets/generated_images/subtle_dark_tech_grid_background.png";

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // 4 unique images rotating
  const images = [
    heroImage1, 
    heroImage2, 
    heroImage3, 
    heroImage4
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgTexture} 
          alt="Background Texture" 
          className="w-full h-full object-cover opacity-10 mix-blend-multiply pointer-events-none select-none"
          draggable="false"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Accepting New Projects
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight text-black">
              <ShinyText
                text="Build Your Website"
                speed={3}
                color="#000000"
                shineColor="#6366f1"
                spread={100}
                direction="left"
              />
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-zinc-800 to-zinc-500">
                Before You Build It
              </span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Preview, customize, and launch premium websites with confidence. 
              Enterprise-grade development for startups and creators.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-black text-white hover:bg-zinc-800 rounded-full h-12 px-8 text-base font-semibold transition-all"
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Choose Website Type
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto h-12 px-8 rounded-full border-black/10 bg-black/5 hover:bg-black/10 hover:border-black/20 text-black backdrop-blur-sm"
                asChild
              >
                <a href="/work">View Live Prototypes</a>
              </Button>
            </div>
          </motion.div>

          {/* Right Visual - 3D Laptop with Rotating Images */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
            style={{ perspective: "2000px", perspectiveOrigin: "center center" }}
          >
            {/* Ambient Highlights (Muted) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-black/5 blur-[120px] rounded-full z-[-1]" />
            
            {/* Rotating Images with Enhanced 3D Flip Effect */}
            <div className="relative w-full h-auto" style={{ transformStyle: "preserve-3d" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt="3D Laptop Developer Setup"
                  className="w-full h-auto object-contain drop-shadow-2xl relative z-10 mix-blend-multiply pointer-events-none select-none"
                  draggable="false"
                  initial={{ 
                    opacity: 0,
                    rotateY: 180,
                    rotateX: 15,
                    scale: 0.6,
                    z: -400,
                    x: 100
                  }}
                  animate={{ 
                    opacity: 1,
                    rotateY: 0,
                    rotateX: 0,
                    scale: 1,
                    z: 0,
                    x: 0,
                    y: [0, -20, 0]
                  }}
                  exit={{ 
                    opacity: 0,
                    rotateY: -180,
                    rotateX: -15,
                    scale: 0.6,
                    z: -400,
                    x: -100
                  }}
                  transition={{ 
                    opacity: { duration: 0.7 },
                    rotateY: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] },
                    rotateX: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] },
                    scale: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] },
                    z: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] },
                    x: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] },
                    y: { 
                      duration: 6, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }
                  }}
                  style={{ 
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden"
                  }}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-delayed {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
