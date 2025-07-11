import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { brandProtection } from "./lib/brand-protection";
import React from "react";
import Home from "@/pages/home";
import About from "@/pages/about";
import Journey from "@/pages/journey";
import BuyMeABeer from "@/pages/buy-me-a-beer";
import Contact from "@/pages/contact";
import Dashboard from "@/pages/dashboard";
import EnhancedIdentifier from "@/pages/enhanced-identifier";

import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/journey" component={Journey} />
      <Route path="/buy-me-a-beer" component={BuyMeABeer} />
      <Route path="/contact" component={Contact} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/enhanced-identifier" component={EnhancedIdentifier} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize brand protection
  React.useEffect(() => {
    document.title = 'LaxCheck - Maximum Value Finder';
    // Initialize brand protection system
    const protection = brandProtection;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
