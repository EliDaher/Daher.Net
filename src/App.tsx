import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import pages
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import UnauthorizedPage from "./pages/Unauthorized";
import CustomerDetails from "./pages/CustomerDetails";
import Balance from "./pages/Balance";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});


const App = () => (

  

  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="dashboard-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/Daher.Net/dashboard" 
              element={
                <PrivateRoute  allowedRoles={["admin"]}>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/Daher.Net/balance" 
              element={
                <PrivateRoute  allowedRoles={["admin"]}>
                  <Balance />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/Daher.Net/users" 
              element={
                <PrivateRoute  allowedRoles={["admin"]}>
                  <Users />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/Daher.Net/CustomerDetails/:id" 
              element={
                <PrivateRoute  allowedRoles={["admin"]}>
                  <CustomerDetails />
                </PrivateRoute>
              } 
            />

            <Route path="/Daher.Net/unauthorized" element={<UnauthorizedPage/>}/>
            <Route path="/Daher.Net/login" element={<Login/>}/>
            <Route path="/Daher.Net/signUp" element={<SignUp/>}/>
            <Route path="/Daher.Net/analytics" element={<Analytics />} />
            <Route
              path="/Daher.Net/posts"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold">Posts Page</h1>
                    <p className="text-muted-foreground">Coming soon...</p>
                  </div>
                </div>
              }
            />
            <Route
              path="/Daher.Net/tasks"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold">Tasks Page</h1>
                    <p className="text-muted-foreground">Coming soon...</p>
                  </div>
                </div>
              }
            />
            <Route
              path="/Daher.Net/settings"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold">Settings Page</h1>
                    <p className="text-muted-foreground">Coming soon...</p>
                  </div>
                </div>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
