import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AnimatePresence, motion } from "framer-motion";
import ClickSpark from "@/components/ui/ClickSpark";
import { DesignSelectionProvider } from "@/contexts/DesignSelectionContext";
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation";
import Home from "@/pages/home";
import Process from "@/pages/process";
import Work from "@/pages/work";
import About from "@/pages/about";
import Login from "@/pages/login";
import StartProject from "@/pages/start-project";
import ProjectSubmitted from "@/pages/project-submitted";
import Admin from "@/pages/admin";
import Professional from "@/pages/professional";
import Gaming from "@/pages/gaming";
import Startups from "@/pages/startups";
import ApiBackends from "@/pages/api-backends";
import StackWebProjects from "@/pages/stackweb-projects";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();
  
  // Enable swipe navigation
  useSwipeNavigation({ threshold: 75 });

  const pageVariants = {
    initial: {
      opacity: 0,
      x: 100,
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: -100,
    },
  };

  const pageTransition = {
    type: 'tween' as const,
    ease: [0.25, 0.1, 0.25, 1] as const, // Smooth cubic-bezier easing
    duration: 0.6,
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        style={{
          position: 'absolute',
          width: '100%',
          willChange: 'transform, opacity',
        }}
      >
        <Switch location={location}>
          <Route path="/" component={Home} />
          <Route path="/services" component={Home} />
          <Route path="/process" component={Process} />
          <Route path="/work" component={Work} />
          <Route path="/work/professional" component={Professional} />
          <Route path="/work/gaming" component={Gaming} />
          <Route path="/work/startups" component={Startups} />
          <Route path="/work/api-backends" component={ApiBackends} />
          <Route path="/work/stackweb-projects" component={StackWebProjects} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/start-project" component={StartProject} />
          <Route path="/project-submitted" component={ProjectSubmitted} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DesignSelectionProvider>
          <SmoothScroll>
            <ClickSpark
              sparkColor="#000000"
              sparkSize={12}
              sparkRadius={20}
              sparkCount={8}
              duration={500}
              easing="ease-out"
            >
              <div style={{ position: 'relative', minHeight: '100vh' }}>
                <Toaster />
                <Router />
              </div>
            </ClickSpark>
          </SmoothScroll>
        </DesignSelectionProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
