import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ClientDashboard from "./pages/ClientDashboard";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Appointments from "./pages/Appointments";
import Contacts from "./pages/Contacts";
import AgentList from "./pages/AgentList";
import ClientProfile from "./pages/ClientProfile";
import Menu from "./pages/Menu";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupClient from "./pages/SignupClient";
import SignupAgent from "./pages/SignupAgent";
import MainLayout from "./layouts/MainLayout";
import PropertyContextProvider from "./context/PropertyContext";

const queryClient = new QueryClient();

// Protected Route Component with role check
const ProtectedRoute = ({ children, allowedRoles }) => {
  const userString = localStorage.getItem("user");
  if (!userString) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userString);
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Home route component to handle role-based rendering
const HomeRoute = () => {
  const userString = localStorage.getItem("user");
  if (!userString) {
    return <ClientDashboard />;
  }

  const user = JSON.parse(userString);
  return user.role === "client" ? <ClientDashboard /> : <Index />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PropertyContextProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<HomeRoute />} />
              <Route
                path="/appointments"
                element={
                  <ProtectedRoute allowedRoles={["agent", "admin", "client"]}>
                    <Appointments />
                  </ProtectedRoute>
                }
              />
              <Route path="/properties" element={<Properties />} />
              <Route
                path="/contacts"
                element={
                  <ProtectedRoute allowedRoles={["agent", "admin"]}>
                    <Contacts />
                  </ProtectedRoute>
                }
              />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route
                path="/agents"
                element={
                  <ProtectedRoute>
                    <AgentList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute allowedRoles={["client", "agent"]}>
                    <ClientProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/menu"
                element={
                  <ProtectedRoute>
                    <Menu />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signup/client" element={<SignupClient />} />
              <Route path="/signup/agent" element={<SignupAgent />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </PropertyContextProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
