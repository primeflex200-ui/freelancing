import { Navbar } from "@/components/ui/navbar";
import { motion } from "framer-motion";
import { Zap, Target, Shield, Code2 } from "lucide-react";
import { useRef } from "react";
import VariableProximity from "@/components/ui/VariableProximity";

const values = [
  {
    icon: Zap,
    title: "Speed",
    description: "15-day maximum delivery without compromising quality"
  },
  {
    icon: Target,
    title: "Quality",
    description: "High design and development standards in every project"
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "Secure, scalable solutions built for real-world growth"
  },
  {
    icon: Code2,
    title: "Expertise",
    description: "Modern technologies and proven development practices"
  }
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background text-foreground"
      ref={containerRef}
    >
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-black">
              About{" "}
              <VariableProximity
                label="StackWeb"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={containerRef}
                radius={150}
                falloff="linear"
                className="text-primary"
              />
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Building modern, high-performance websites for businesses, startups, and digital creators
            </p>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass p-8 md:p-12 rounded-2xl mb-12"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                StackWeb is a full-service web development studio dedicated to building modern, high-performance websites for businesses, startups, and digital creators. We help brands establish a strong online presence through clean design, thoughtful user experience, and reliable, scalable code.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">Fast & Efficient Delivery</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our core strength lies in fast and efficient delivery. We specialize in completing professionally built websites within 15 days, without cutting corners. Through a structured workflow, clear communication, and proven development practices, we ensure every project moves quickly from concept to launch.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">Quality Within Reach</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At StackWeb, we believe that quality should never be out of reach. That's why we offer competitive, affordable pricing while maintaining high design and development standards. Every website we deliver is carefully crafted to be visually appealing, responsive across all devices, optimized for performance, and ready for real-world growth.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">What We Build</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We work across multiple domains, including business websites, portfolios, landing pages, startup MVPs, SaaS platforms, and backend/API solutions. Whether you are launching a new idea or upgrading an existing platform, our goal is to build websites that are not only attractive but also functional, secure, and scalable.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">Our Process</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our process is simple and transparent. We start by understanding your goals, design an interface that matches your brand, and develop a robust solution using modern technologies. Throughout the project, we keep you involved with regular updates, ensuring the final result aligns perfectly with your vision.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">Our Promise</h2>
              <p className="text-muted-foreground leading-relaxed">
                StackWeb stands for speed, quality, and reliability. We don't just build websites—we build digital experiences that help you grow, convert, and succeed online.
              </p>
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-black text-center mb-8">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-6 rounded-xl text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a
              href="/start-project"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-zinc-800 transition-colors"
            >
              Start Your Project
            </a>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}
