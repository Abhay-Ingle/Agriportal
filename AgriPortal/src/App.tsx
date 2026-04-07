import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AIcropAdvisor from "./pages/AIcropAdvisor";
import PriceIntelligence from "./pages/PriceIntelligence";
import GrivienceSystem from "./pages/GrivienceSystem";
import AgriMarketPlace from "./pages/AgriMarketPlace";
import WeatherIntel from "./pages/WeatherIntel";
import SmartDashboard from "./pages/SmartDashboard";
import CommunityForum from "./pages/CommunityForum";
import AlertSystem from "./pages/AlertSystem";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminGrievances from "./pages/AdminGrievances";
import FarmerRegistration from "./pages/FarmerRegistration";
import GovernmentSchemes from "./pages/GovernmentSchemes";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/farmer-registration" element={<FarmerRegistration />} />
            <Route path="/government-schemes" element={<GovernmentSchemes />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/grievances" element={<AdminGrievances />} />
            <Route path="/ai-crop-advisor" element={<AIcropAdvisor />} />
            <Route path="/price-intelligence" element={<PriceIntelligence />} />
            <Route path="/grievance-system" element={<GrivienceSystem />} />
            <Route path="/agri-marketplace" element={<AgriMarketPlace />} />
            <Route path="/weather-Intel" element={<WeatherIntel />} />
            <Route path="/smart-dashboard" element={<SmartDashboard />} />
            <Route path="/community-forum" element={<CommunityForum />} />
            <Route path="/alert-system" element={<AlertSystem />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
