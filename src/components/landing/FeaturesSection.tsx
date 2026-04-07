import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useRef } from "react";
import {
  Brain, TrendingUp, ShieldCheck, ShoppingCart,
  CloudSun, BarChart3, MessageSquare, Bell,
} from "lucide-react";



const features = [
  { 
    icon: Brain, 
    title: "AI Crop Advisor", 
    desc: "Smart recommendations based on soil, season, and location data.", 
    color: "from-primary to-agri-lime",
    path: "/ai-crop-advisor"
  },
  { 
    icon: TrendingUp, 
    title: "Price Intelligence", 
    desc: "Real-time mandi prices with 30-day trends and prediction curves.", 
    color: "from-agri-amber to-secondary",
    path: "/price-intelligence"
  },
  { 
    icon: ShieldCheck, 
    title: "Grievance System", 
    desc: "Track complaints with timeline status and satisfaction ratings.", 
    color: "from-agri-sky to-primary",
    path: "/grievance-system"
  },
  { 
    icon: ShoppingCart, 
    title: "Agri Marketplace", 
    desc: "List, negotiate, and sell produce directly to buyers.", 
    color: "from-agri-lime to-primary",
    path: "/agri-marketplace"
  },
  { 
    icon: CloudSun, 
    title: "Weather Intel", 
    desc: "7-day forecasts with rain and heatwave alerts for your region.", 
    color: "from-agri-sky to-agri-lime",
    path: "/weather-intel"
  },
  { 
    icon: BarChart3, 
    title: "Smart Dashboard", 
    desc: "Yield predictions, income estimates, and crop success analytics.", 
    color: "from-primary to-agri-emerald",
    path: "/smart-dashboard"
  },
  { 
    icon: MessageSquare, 
    title: "Community Forum", 
    desc: "Connect with fellow farmers, share knowledge, and get advice.", 
    color: "from-agri-amber to-agri-earth",
    path: "/community-forum"
  },
  { 
    icon: Bell, 
    title: "Alert System", 
    desc: "Critical notifications for weather, prices, and grievance updates.", 
    color: "from-destructive to-agri-amber",
    path: "/alert-system"
  },
];


export function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const navigate = useNavigate(); // ✅ INSIDE COMPONENT

  return (
    <section id="features" ref={ref} className="py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              onClick={() => navigate(f.path)}   // ✅ Navigation here
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card-hover p-6 group cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <div
                className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} text-primary-foreground mb-4 group-hover:scale-110 transition-transform`}
              >
                <f.icon className="w-5 h-5" />
              </div>

              <h3 className="font-display font-semibold text-foreground mb-2">
                {f.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}