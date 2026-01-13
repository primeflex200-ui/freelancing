import { Navbar } from "@/components/ui/navbar";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const pricingPlans = [
  {
    name: "Starter",
    price: "₹24,999",
    description: "Perfect for small businesses and personal projects",
    features: [
      "5-page responsive website",
      "Mobile-friendly design",
      "Basic SEO optimization",
      "Contact form integration",
      "1 month support",
      "Hosting setup assistance"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Professional",
    price: "₹64,999",
    description: "Ideal for growing businesses and startups",
    features: [
      "15-page responsive website",
      "Custom design & animations",
      "Advanced SEO & analytics",
      "CMS integration",
      "E-commerce ready",
      "3 months support",
      "Performance optimization",
      "Security features"
    ],
    cta: "Start Project",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale projects and complex requirements",
    features: [
      "Unlimited pages",
      "Custom functionality",
      "API development",
      "Database architecture",
      "Microservices setup",
      "12 months support",
      "Dedicated team",
      "Priority support",
      "Scalability planning"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export default function Pricing() {
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
              Simple, Transparent <span className="text-primary">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the perfect plan for your project. All plans include our quality guarantee.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative glass rounded-2xl p-8 ${
                  plan.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-black mb-2">{plan.price}</div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full rounded-full ${
                    plan.popular
                      ? 'bg-black text-white hover:bg-zinc-800'
                      : 'bg-black/5 text-black hover:bg-black/10'
                  }`}
                >
                  <Link href="/start-project" className="flex items-center justify-center gap-2">
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* FAQ Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground">
              Need a custom solution?{" "}
              <Link href="/start-project" className="text-primary hover:underline font-semibold">
                Let's talk
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
