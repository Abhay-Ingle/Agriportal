import { motion } from "framer-motion";
import { ShoppingCart, MapPin, Tag, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const sampleListings = [
  {
    crop: "Wheat",
    price: "₹2200 / quintal",
    quantity: "50 quintals",
    location: "Pune, Maharashtra",
  },
  {
    crop: "Onion",
    price: "₹1800 / quintal",
    quantity: "30 quintals",
    location: "Nashik, Maharashtra",
  },
  {
    crop: "Tomato",
    price: "₹1200 / quintal",
    quantity: "20 quintals",
    location: "Solapur, Maharashtra",
  },
];

export default function AgriMarketplace() {
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
            <ShoppingCart className="w-8 h-8 text-primary-foreground" />
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Agri Marketplace
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            List your crops, negotiate directly with buyers, and sell at the best possible price.
          </p>
        </motion.div>

        {/* List Product Section */}
        <div className="bg-card border rounded-2xl p-8 shadow-sm mb-16">
          <h2 className="text-2xl font-semibold mb-6">List Your Produce</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <Input placeholder="Crop Name" />
            <Input placeholder="Price per Quintal" />
            <Input placeholder="Available Quantity" />
          </div>

          <div className="mt-4">
            <Button className="gradient-primary border-0 text-primary-foreground">
              Add Listing
            </Button>
          </div>
        </div>

        {/* Listings Section */}
        <h2 className="text-2xl font-semibold mb-6">Available Listings</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {sampleListings.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-3">{item.crop}</h3>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  <span>{item.price}</span>
                </div>

                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-primary" />
                  <span>{item.quantity}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{item.location}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Contact Buyer
              </Button>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
