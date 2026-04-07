import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    const endpoint = "http://localhost:5000/api/auth/login";
    const bodyData = { email, password, role };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      
      console.log("Response status:", res.status);
      console.log("Response data:", data);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.role);
        
        // Store admin email if admin login
        if (data.role === "admin") {
          localStorage.setItem("adminEmail", email);
          navigate("/admin-dashboard");
        } else {
          navigate("/profile");
        }
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Network error. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-background rounded-2xl shadow-xl p-8 border"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6">
          {role === "admin" ? "Admin Login" : "Farmer Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Role Selector */}
          <Select
            onValueChange={(value) => setRole(value)}
            defaultValue="farmer"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="farmer">Farmer</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <Input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full gradient-primary border-0 text-primary-foreground"
          >
            {loading
              ? "Loading..."
              : role === "admin"
              ? "Sign In as Admin"
              : "Sign In"}
          </Button>
        </form>

        {/* Toggle */}
        {role !== "admin" && (
          <div className="text-center mt-6 space-y-3">
            <p className="text-sm text-muted-foreground">
              New farmer looking to register?
            </p>
            <button
              type="button"
              onClick={() => navigate("/farmer-registration")}
              className="w-full py-2 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/5 transition"
            >
              Create Farmer Account
            </button>
            <p className="text-xs text-muted-foreground">
              Already registered?{" "}
              <span className="text-primary font-semibold">
                Already logged in will redirect you
              </span>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
