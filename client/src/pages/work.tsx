import { Navbar } from "@/components/ui/navbar";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";

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

          {/* Locked State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass p-12 rounded-2xl text-center border-2 border-primary/20">
              {/* Lock Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <Lock className="w-10 h-10 text-primary" />
              </div>

              {/* Message */}
              <h2 className="text-3xl font-bold text-black mb-4">
                Portfolio Coming Soon
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We're currently curating our best projects to showcase here. 
                Our portfolio will feature stunning websites across professional, gaming, startup, and backend domains.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/start-project"
                  className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-zinc-800 transition-colors"
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 border-2 border-black/10 bg-black/5 hover:bg-black/10 text-black px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  Learn About Us
                </a>
              </div>

              {/* Info */}
              <div className="mt-8 pt-8 border-t border-black/10">
                <p className="text-sm text-muted-foreground">
                  Want to see what we can build for you? Contact us on{" "}
                  <a 
                    href="https://instagram.com/stackweb.dev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    Instagram @stackweb.dev
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
