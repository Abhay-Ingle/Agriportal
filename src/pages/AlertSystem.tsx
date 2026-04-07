import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, AlertTriangle, TrendingUp, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Alert {
  id: number;
  type: "weather" | "price" | "grievance";
  message: string;
  priority: "High" | "Medium" | "Low";
  time: string;
  read: boolean;
}

export default function AlertSystem() {

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: "weather",
      message: "Heatwave warning in Pune district for next 3 days.",
      priority: "High",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "price",
      message: "Onion prices increased by 12% in Nashik mandi.",
      priority: "Medium",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "grievance",
      message: "Your grievance ID #AG1234 has been resolved.",
      priority: "Low",
      time: "1 day ago",
      read: true,
    },
  ]);

  const markAsRead = (id: number) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "weather":
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case "price":
        return <TrendingUp className="w-5 h-5 text-primary" />;
      case "grievance":
        return <FileText className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-destructive";
      case "Medium":
        return "text-primary";
      case "Low":
        return "text-muted-foreground";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 px-4">
      <div className="container mx-auto max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 mx-auto rounded-xl gradient-primary flex items-center justify-center mb-6">
            <Bell className="w-8 h-8 text-primary-foreground" />
          </div>

          <h1 className="text-4xl font-bold mb-4">Alert System</h1>
          <p className="text-muted-foreground">
            Stay informed with critical weather, market, and grievance updates.
          </p>
        </motion.div>

        {/* Alerts List */}
        <div className="space-y-6">
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`border rounded-xl p-6 shadow-sm bg-card 
                ${alert.read ? "opacity-60" : "border-primary"}`}
            >
              <div className="flex justify-between items-start gap-4">

                <div className="flex gap-4">
                  {getIcon(alert.type)}

                  <div>
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {alert.time}
                    </p>

                    <p className={`text-sm mt-1 font-semibold ${getPriorityColor(alert.priority)}`}>
                      Priority: {alert.priority}
                    </p>
                  </div>
                </div>

                {!alert.read && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => markAsRead(alert.id)}
                  >
                    Mark as Read
                  </Button>
                )}

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
