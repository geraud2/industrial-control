import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Agencies from "./pages/Agencies";
import Equipment from "./pages/Equipment";
import Planning from "./pages/Planning";
import Interventions from "./pages/Interventions";
import Reports from "./pages/Reports";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import ClientLayout from "./components/ClientLayout";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientAgencies from "./pages/client/ClientAgencies";
import ClientEquipment from "./pages/client/ClientEquipment";
import ClientPlanning from "./pages/client/ClientPlanning";
import ClientReports from "./pages/client/ClientReports";
import ClientAccount from "./pages/client/ClientAccount";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/agencies" element={<Agencies />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/interventions" element={<Interventions />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route element={<ClientLayout />}>
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/client/agencies" element={<ClientAgencies />} />
            <Route path="/client/equipment" element={<ClientEquipment />} />
            <Route path="/client/planning" element={<ClientPlanning />} />
            <Route path="/client/reports" element={<ClientReports />} />
            <Route path="/client/account" element={<ClientAccount />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;