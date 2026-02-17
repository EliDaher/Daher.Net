import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { routesConfig } from "./RoutesConfig";
import { CompaniesProvider } from "./contexts/CompaniesProvider";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CompaniesProvider>
      <ThemeProvider defaultTheme="system" storageKey="dashboard-theme">
        <TooltipProvider>
          <Toaster richColors position="bottom-right" duration={2500} />
          <HashRouter>
            <Suspense
              fallback={<div className="p-10 text-center">Loading...</div>}
            >
              <Routes>
                {routesConfig.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </Suspense>
          </HashRouter>
        </TooltipProvider>
      </ThemeProvider>
    </CompaniesProvider>
  </QueryClientProvider>
);

export default App;
