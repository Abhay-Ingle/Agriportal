import { motion } from "framer-motion";
import { Brain, MapPin, Calendar, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AICropAdvisor() {
  return (
    <div className="min-h-screen bg-background pt-24 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 mx-auto rounded-xl gradient-primary flex items-center justify-center mb-6">
            <Brain className="w-8 h-8 text-primary-foreground" />
          </div>

          <h1 className="text-4xl font-bold mb-4">
            AI Crop Advisor
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Smart crop recommendations powered by AI based on soil type,
            season, rainfall patterns, and location-specific data.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">

          <div className="p-6 rounded-xl border bg-card shadow-sm">
            <MapPin className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Location-Based Insights</h3>
            <p className="text-sm text-muted-foreground">
              Recommendations tailored to your district and climate conditions.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-card shadow-sm">
            <Calendar className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Seasonal Planning</h3>
            <p className="text-sm text-muted-foreground">
              Crop suggestions optimized for current and upcoming seasons.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-card shadow-sm">
            <Sprout className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Soil Analysis Support</h3>
            <p className="text-sm text-muted-foreground">
              Soil-based crop matching for improved yield and profitability.
            </p>
          </div>

        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button className="gradient-primary text-primary-foreground border-0 px-8 py-6 text-lg">
            Start Crop Recommendation
          </Button>
        </div>

      </div>
    </div>
  );
}
