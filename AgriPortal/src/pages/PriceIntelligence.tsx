import { motion } from "framer-motion";
import { TrendingUp, BarChart3, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PriceIntelligence() {
  return (
    <div className="min-h-screen bg-background pt-24 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 mx-auto rounded-xl gradient-primary flex items-center justify-center mb-6">
            <TrendingUp className="w-8 h-8 text-primary-foreground" />
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Price Intelligence
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay ahead with real-time mandi prices, 30-day trend analysis,
            and AI-powered price predictions.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">

          {/* Real-time Prices */}
          <div className="p-6 rounded-xl border bg-card shadow-sm">
            <MapPin className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Live Mandi Prices</h3>
            <p className="text-sm text-muted-foreground">
              Get real-time crop prices from nearby mandis and districts.
            </p>
          </div>

          {/* 30-day Trends */}
          <div className="p-6 rounded-xl border bg-card shadow-sm">
            <Calendar className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-semibold mb-2">30-Day Trend Analysis</h3>
            <p className="text-sm text-muted-foreground">
              View historical price movements to identify profitable selling periods.
            </p>
          </div>

          {/* AI Prediction */}
          <div className="p-6 rounded-xl border bg-card shadow-sm">
            <BarChart3 className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-semibold mb-2">AI Price Prediction</h3>
            <p className="text-sm text-muted-foreground">
              Predict future price movements using demand and seasonal data.
            </p>
          </div>

        </div>

        {/* Sample Chart Section */}
        <div className="bg-card border rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-semibold mb-6">Sample Price Trend</h2>

          <div className="h-64 flex items-center justify-center text-muted-foreground">
            📊 (Price Trend Chart Placeholder)
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button className="gradient-primary text-primary-foreground border-0 px-8 py-6 text-lg">
            View Live Market Data
          </Button>
        </div>

      </div>
    </div>
  );
}
