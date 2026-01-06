import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <div className="w-full max-w-6xl glass rounded-full px-6 py-3 flex items-center justify-between shadow-2xl shadow-primary/5">
        
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              DevStudio
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Services", "Process", "Work", "Pricing"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link href="/contact">
            <Button variant="ghost" className="hidden sm:flex text-muted-foreground hover:text-white hover:bg-white/5">
              Login
            </Button>
          </Link>
          <Button className="bg-white text-black hover:bg-gray-200 font-medium rounded-full px-6">
            Start Project
          </Button>
        </div>
      </div>
    </nav>
  );
}
