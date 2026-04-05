import { motion } from "framer-motion";
import { ArrowRight, Sprout, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 gradient-hero overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-agri-lime/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-sm font-medium text-primary mb-8"
          >
            <Sprout className="w-4 h-4" />
            Empowering 50,000+ Farmers Across India
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground leading-[1.1] mb-6"
          >
            Smart Agriculture,{" "}
            <span className="gradient-text">Brighter Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            AI-powered crop recommendations, real-time market intelligence, and a complete digital ecosystem to transform farming in India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/login">
              <Button size="lg" className="gradient-primary border-0 text-primary-foreground text-base px-8 h-12 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                Start Free <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg" className="text-base px-8 h-12 rounded-xl">
                Explore Features
              </Button>
            </a>
          </motion.div>

          {/* Quick trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6 mt-16 text-sm text-muted-foreground"
          >
            {[
              { icon: Sprout, text: "AI-Powered" },
              { icon: TrendingUp, text: "Real-Time Prices" },
              { icon: Shield, text: "Secure & Trusted" },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2">
                <badge.icon className="w-4 h-4 text-primary" />
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
