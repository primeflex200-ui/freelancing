import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/ui/hero";
import { Code, Monitor, Rocket, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Services Section */}
        <section id="services" className="py-32 container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Select Your <span className="text-primary">Experience</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tailored development solutions for every industry. We build pixel-perfect interfaces backed by robust code.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-primary/50 transition-all duration-300"
              >
                <div 
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl rounded-2xl pointer-events-none",
                    service.color
                  )}
                />
                
                <div className="relative h-full glass p-8 rounded-xl flex flex-col items-start gap-4 hover:translate-y-[-2px] transition-transform duration-300">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${service.color} text-white`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-12 bg-black/20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-muted-foreground">
              © 2024 DevStudio. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Dribbble</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
