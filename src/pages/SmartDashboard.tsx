import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  CloudSun,
  AlertTriangle,
  Package
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SmartDashboard() {

  // Mock dynamic data (can connect backend later)
  const [yieldPrediction] = useState(82); // %
  const [expectedIncome] = useState(145000); // ₹
  const [activeListings] = useState(3);
  const [alerts] = useState(2);

  return (
    <div className="min-h-screen bg-background pt-24 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 mx-auto rounded-xl gradient-primary flex items-center justify-center mb-6">
            <BarChart3 className="w-8 h-8 text-primary-foreground" />
          </div>

          <h1 className="text-4xl font-bold mb-4">Smart Dashboard</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Monitor crop performance, financial estimates, weather insights,
            and alerts — all in one place.
          </p>
        </motion.div>

        {/* Top Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">

          {/* Yield Prediction */}
          <div className="bg-card border rounded-xl p-6 text-center shadow-sm">
            <TrendingUp className="w-6 h-6 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Yield Prediction</h3>
            <p className="text-2xl font-bold">{yieldPrediction}%</p>
          </div>

          {/* Income */}
          <div className="bg-card border rounded-xl p-6 text-center shadow-sm">
            <DollarSign className="w-6 h-6 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Expected Income</h3>
            <p className="text-2xl font-bold">₹{expectedIncome}</p>
          </div>

          {/* Active Listings */}
          <div className="bg-card border rounded-xl p-6 text-center shadow-sm">
            <Package className="w-6 h-6 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Active Listings</h3>
            <p className="text-2xl font-bold">{activeListings}</p>
          </div>

          {/* Alerts */}
          <div className="bg-card border rounded-xl p-6 text-center shadow-sm">
            <AlertTriangle className="w-6 h-6 text-destructive mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Active Alerts</h3>
            <p className="text-2xl font-bold">{alerts}</p>
          </div>

        </div>

        {/* Weather Summary */}
        <div className="bg-card border rounded-2xl p-8 shadow-sm mb-16">
          <div className="flex items-center gap-4 mb-6">
            <CloudSun className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">Weather Summary</h2>
          </div>

          <p className="text-muted-foreground">
            Temperature expected between 32°C – 36°C this week.
            No significant rainfall predicted.
          </p>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-card border rounded-2xl p-8 shadow-sm mb-16">
          <h2 className="text-2xl font-semibold mb-6">
            Crop Performance Analytics
          </h2>

          <div className="h-64 flex items-center justify-center text-muted-foreground">
            📊 Chart Placeholder (Yield vs Income Trend)
          </div>
        </div>

        {/* Action Section */}
        <div className="text-center">
          <Button className="gradient-primary text-primary-foreground border-0 px-8 py-6 text-lg">
            Update Farm Data
          </Button>
        </div>

      </div>
    </div>
  );
}
