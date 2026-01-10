import { Navbar } from "@/components/ui/navbar";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Discovery & Planning",
    description: "We start by understanding your business goals, target audience, and project requirements through detailed consultations.",
    duration: "1-2 weeks"
  },
  {
    number: "02",
    title: "Design & Prototyping",
    description: "Our designers create stunning mockups and interactive prototypes that bring your vision to life.",
    duration: "2-3 weeks"
  },
  {
    number: "03",
    title: "Development",
    description: "Our developers build your website using cutting-edge technologies, ensuring performance and scalability.",
    duration: "4-8 weeks"
  },
  {
    number: "04",
    title: "Testing & QA",
    description: "Rigorous testing across devices and browsers to ensure flawless functionality and user experience.",
    duration: "1-2 weeks"
  },
  {
    number: "05",
    title: "Launch & Support",
    description: "We deploy your website and provide ongoing support to ensure everything runs smoothly.",
    duration: "Ongoing"
  }
];

export default function Process() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background text-foreground"
    >
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
              Our <span className="text-primary">Process</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that delivers exceptional results, every time.
            </p>
          </motion.div>

          {/* Fast Delivery Specialty */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="glass p-8 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-2">Our Specialty: Lightning-Fast Delivery</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We pride ourselves on delivering professional websites at exceptional speed without compromising quality. 
                    Our streamlined process ensures your website is live as soon as possible.
                  </p>
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Maximum delivery time: 15 days</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Most projects are completed even faster, depending on complexity and requirements.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Process Steps */}
          <div className="max-w-4xl mx-auto space-y-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex gap-8 items-start">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-2xl">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 glass p-8 rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-black">{step.title}</h3>
                      <span className="text-sm text-muted-foreground bg-black/5 px-3 py-1 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-10 top-20 w-0.5 h-12 bg-gradient-to-b from-primary/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <a
              href="/start-project"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-zinc-800 transition-colors"
            >
              <CheckCircle2 className="w-5 h-5" />
              Start Your Project
            </a>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}
