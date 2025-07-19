import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";

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
import Invoices from "./pages/Invoices";
import MyBalance from "./pages/MyBalance";

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
        <HashRouter>
          <Routes>
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute  allowedRoles={["admin", "dealer"]}>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/balance" 
              element={
                <PrivateRoute  allowedRoles={["admin"]}>
                  <Balance />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/users" 
              element={
                <PrivateRoute  allowedRoles={["admin", 'dealer']}>
                  <Users />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/CustomerDetails/:id" 
              element={
                <PrivateRoute  allowedRoles={["admin", 'dealer']}>
                  <CustomerDetails />
                </PrivateRoute>
              } 
            />

            <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="/analytics" element={
                <PrivateRoute  allowedRoles={["admin"]}>
                  <Analytics />
                </PrivateRoute>
              }
            />
            <Route path="/invoices" element={
                <Invoices />
              }
            />
            <Route path="/myBalance" 
              element={
                <MyBalance />
              }
            />
            <Route
              path="/posts"
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
              path="/tasks"
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
              path="/settings"
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
        </HashRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
