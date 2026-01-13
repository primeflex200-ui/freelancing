import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AnimatePresence, motion } from "framer-motion";
import ClickSpark from "@/components/ui/ClickSpark";
import { DesignSelectionProvider } from "@/contexts/DesignSelectionContext";
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
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  willChange: 'opacity',
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                <Toaster />
                <Router />
              </motion.div>
            </ClickSpark>
          </SmoothScroll>
        </DesignSelectionProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
