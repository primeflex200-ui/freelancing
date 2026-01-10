import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AnimatePresence, motion } from "framer-motion";
import Home from "@/pages/home";
import Process from "@/pages/process";
import Work from "@/pages/work";
import Login from "@/pages/login";
import StartProject from "@/pages/start-project";
import ProjectSubmitted from "@/pages/project-submitted";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/process" component={Process} />
        <Route path="/work" component={Work} />
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
        <SmoothScroll>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Toaster />
            <Router />
          </motion.div>
        </SmoothScroll>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
