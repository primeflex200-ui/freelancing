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
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-muted-foreground">
              © 2024 StackWeb. All rights reserved.
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex gap-6 text-sm text-muted-foreground">
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
        </motion.footer>
      </main>
    </motion.div>
  );
}
