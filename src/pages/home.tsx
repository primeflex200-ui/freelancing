import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/ui/hero";
import { Code, Monitor, Rocket, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";
import SplitText from "@/components/ui/split-text";
import { motion } from "framer-motion";

const services = [
  {
    icon: Monitor,
    title: "Professional",
    description: "Corporate sites, portfolios, and landing pages that convert.",
    color: "from-slate-500 to-slate-400"
  },
  {
    icon: Gamepad2,
    title: "Gaming",
    description: "Immersive experiences for studios, streamers, and esports.",
    color: "from-gray-500 to-gray-400"
  },
  {
    icon: Rocket,
    title: "Startups",
    description: "MVP development and scalable SaaS platforms.",
    color: "from-zinc-500 to-zinc-400"
  },
  {
    icon: Code,
    title: "API & Backend",
    description: "Robust server-side architecture and database design.",
    color: "from-slate-600 to-slate-500"
  }
];

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
    >
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Services Section */}
        <section id="services" className="py-32 container mx-auto px-4 relative z-10 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-black">
              <SplitText
                text="Select Your "
                tag="span"
                delay={25}
                duration={0.5}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 15 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.5}
                rootMargin="-50px"
                textAlign="center"
              />
              <span className="text-primary">
                <SplitText
                  text="Experience"
                  tag="span"
                  delay={25}
                  duration={0.5}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 15 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.5}
                  rootMargin="-50px"
                  textAlign="center"
                />
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <SplitText
                text="Tailored development solutions for every industry. We build pixel-perfect interfaces backed by robust code."
                tag="span"
                delay={10}
                duration={0.4}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 10 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.5}
                rootMargin="-50px"
                textAlign="center"
              />
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, index) => (
              <motion.a
                key={index}
                href={`/start-project?type=${service.title.toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative p-1 rounded-2xl bg-gradient-to-b from-black/5 to-transparent hover:from-primary/20 transition-all duration-300 cursor-pointer"
              >
                <div 
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl rounded-2xl pointer-events-none",
                    service.color
                  )}
                />
                
                <div className="relative h-full glass p-8 rounded-xl flex flex-col items-start gap-4 hover:translate-y-[-2px] transition-transform duration-300">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${service.color} text-white`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">
                      <SplitText
                        text={service.title}
                        tag="span"
                        delay={20}
                        duration={0.4}
                        ease="power2.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 10 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.3}
                        rootMargin="-80px"
                        textAlign="left"
                      />
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <SplitText
                        text={service.description}
                        tag="span"
                        delay={8}
                        duration={0.3}
                        ease="power2.out"
                        splitType="words"
                        from={{ opacity: 0, y: 5 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.3}
                        rootMargin="-80px"
                        textAlign="left"
                      />
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </section>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-black/5 py-12 bg-zinc-50"
        >
          <div className="container mx-auto px-4">
            {/* Instagram Contact Section */}
            <div className="max-w-2xl mx-auto mb-8 text-center">
              <div className="glass p-6 rounded-2xl border border-primary/10">
                <p className="text-muted-foreground mb-3">
                  For more details, contact us on Instagram
                </p>
                <a 
                  href="https://instagram.com/stackweb.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @stackweb.dev
                </a>
              </div>
            </div>

            {/* Footer Links */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-sm text-muted-foreground">
                © 2024 StackWeb. All rights reserved.
              </div>
              <div className="flex gap-6 items-center">
                <div className="flex gap-6 text-sm text-muted-foreground">
                  <a 
                    href="https://instagram.com/stackweb.dev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                  <a href="#" className="hover:text-black transition-colors">Twitter</a>
                  <a href="#" className="hover:text-black transition-colors">GitHub</a>
                  <a href="#" className="hover:text-black transition-colors">Dribbble</a>
                </div>
                <a 
                  href="/admin" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  Admin
                </a>
              </div>
            </div>
          </div>
        </motion.footer>
      </main>
    </motion.div>
  );
}
