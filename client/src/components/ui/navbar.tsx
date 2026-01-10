import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Code2, Menu, X, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const showBackButton = location !== "/";

  const handleBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location === "/" && href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setMobileMenuOpen(false);
      }
    }
  };

  const navItems = [
    { name: "Services", href: "/#services" },
    { name: "Process", href: "/process" },
    { name: "Work", href: "/work" },
    { name: "Pricing", href: "/pricing" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 transition-all ${
      scrolled ? "pt-4" : ""
    }`}>
      <div className={`w-full max-w-6xl glass rounded-full px-6 py-3 flex items-center justify-between shadow-2xl shadow-primary/5 transition-all ${
        scrolled ? "shadow-lg" : ""
      }`}>
        
        {/* Back Button or Logo */}
        {showBackButton ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 group cursor-pointer hover:bg-black/5 px-3 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
            <span className="font-medium text-sm text-black hidden sm:inline">Back</span>
          </button>
        ) : (
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-black">
              StackWeb
            </span>
          </Link>
        )}

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href.startsWith("/#") && location === "/");
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-medium transition-colors relative ${
                  isActive ? "text-black" : "text-muted-foreground hover:text-black"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="hidden sm:flex text-muted-foreground hover:text-black hover:bg-black/5">
              Login
            </Button>
          </Link>
          <Link href="/start-project">
            <Button className="bg-black text-white hover:bg-zinc-800 font-medium rounded-full px-6 hidden md:flex">
              Start Project
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-4 right-4 glass rounded-2xl p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setMobileMenuOpen(false);
                  }}
                  className="text-lg font-medium text-black hover:text-primary transition-colors py-2"
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-black/10 pt-4 mt-2 space-y-3">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/start-project" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-black text-white hover:bg-zinc-800">
                    Start Project
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

