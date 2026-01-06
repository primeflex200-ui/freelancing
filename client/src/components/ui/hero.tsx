import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Layout, Database, Smartphone } from "lucide-react";
import heroImage from "@assets/generated_images/3d_macbook_floating_with_code_snippets_and_neon_glow.png";
import bgTexture from "@assets/generated_images/subtle_dark_tech_grid_background.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgTexture} 
          alt="Background Texture" 
          className="w-full h-full object-cover opacity-10 mix-blend-multiply"
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
              Build Your Website <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-zinc-800 to-zinc-500">
                Before You Build It
              </span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Preview, customize, and launch premium websites with confidence. 
              Enterprise-grade development for startups and creators.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-black text-white hover:bg-zinc-800 rounded-full h-12 px-8 text-base font-semibold transition-all">
                Choose Website Type
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-full border-black/10 bg-black/5 hover:bg-black/10 hover:border-black/20 text-black backdrop-blur-sm">
                View Live Prototypes
              </Button>
            </div>

            {/* Tech Stack Icons */}
            <div className="mt-12 flex items-center gap-6 text-muted-foreground/50">
              <span className="text-xs font-mono uppercase tracking-widest">Powered By</span>
              <div className="h-px w-12 bg-black/10" />
              <div className="flex gap-4">
                <Terminal className="w-5 h-5 hover:text-black transition-colors" />
                <Layout className="w-5 h-5 hover:text-black transition-colors" />
                <Database className="w-5 h-5 hover:text-black transition-colors" />
                <Smartphone className="w-5 h-5 hover:text-black transition-colors" />
              </div>
            </div>
          </motion.div>

          {/* Right Visual - 3D Laptop */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            {/* Ambient Highlights (Muted) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-black/5 blur-[120px] rounded-full z-[-1]" />
            
            <img 
              src={heroImage} 
              alt="3D Laptop Developer Setup" 
              className="w-full h-auto object-contain drop-shadow-2xl relative z-10 animate-float mix-blend-multiply"
              style={{ animation: 'float 6s ease-in-out infinite' }}
            />

            {/* Floating Elements (Decorative CSS overlays) */}
            <div className="absolute -top-10 -right-10 glass p-4 rounded-xl hidden lg:block animate-float-delayed">
              <div className="flex gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-2 font-mono text-xs text-black/70">
                <div className="flex"><span className="text-purple-600">const</span> <span className="text-blue-600 ml-2">app</span> = <span className="text-amber-600 ml-2">init()</span>;</div>
                <div className="flex"><span className="text-blue-600">app</span>.<span className="text-amber-600">deploy</span>(<span className="text-emerald-600">"prod"</span>);</div>
              </div>
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
