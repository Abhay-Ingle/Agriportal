import { Users, Wheat, MapPin, IndianRupee } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

const stats = [
  { end: 50000, suffix: "+", label: "Farmers Empowered", icon: <Users className="w-5 h-5" /> },
  { end: 120, suffix: "+", label: "Crops Tracked", icon: <Wheat className="w-5 h-5" /> },
  { end: 28, label: "States Covered", icon: <MapPin className="w-5 h-5" /> },
  { end: 15, suffix: "Cr+", prefix: "₹", label: "Farmer Revenue", icon: <IndianRupee className="w-5 h-5" /> },
];

export function ImpactSection() {
  return (
    <section id="impact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Impact</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-3 mb-4">
            Transforming Agriculture at Scale
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real numbers, real impact across India's farming communities.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((s) => (
            <AnimatedCounter key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
