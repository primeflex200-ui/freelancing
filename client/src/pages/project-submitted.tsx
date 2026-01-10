import { Navbar } from "@/components/ui/navbar";
import { motion } from "framer-motion";
import { CheckCircle2, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectSubmitted() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6"
              >
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </motion.div>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-black">
              Project Submitted Successfully!
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for choosing StackWeb. We've received your project details and will get back to you within 24 hours.
            </p>

            <div className="glass p-6 rounded-xl mb-8 text-left">
              <h3 className="font-semibold text-black mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                What happens next?
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                    1
                  </span>
                  <span>You'll receive a confirmation email with your project details</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                    2
                  </span>
                  <span>Our team will review your requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                    3
                  </span>
                  <span>We'll schedule a discovery call to discuss your project in detail</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-black text-white hover:bg-zinc-800 rounded-full">
                <a href="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Back to Home
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <a href="/work">View Our Work</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
