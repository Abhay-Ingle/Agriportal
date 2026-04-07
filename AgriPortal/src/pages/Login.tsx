import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/config/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [otpStep, setOtpStep] = useState(false); // false = form, true = OTP verification
  const [role, setRole] = useState("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    const endpoint = `${API}/api/auth/login`;
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

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
    if (!name || !email || !password || !confirmPassword || !phone) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Phone number must be 10 digits");
      setLoading(false);
      return;
    }

    const endpoint = `${API}/api/auth/send-otp`;
    const bodyData = { phone, email };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      
      if (res.ok) {
        setSuccess("OTP sent to your phone. Valid for 2 minutes.");
        setOtpStep(true);
        setOtpTimer(120); // 2 minutes
        
        // Start countdown timer
        const interval = setInterval(() => {
          setOtpTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setOtpStep(false);
              setError("OTP expired. Please try again.");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Network error. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!otp) {
      setError("OTP is required");
      setLoading(false);
      return;
    }

    const endpoint = `${API}/api/auth/verify-otp-and-signup`;
    const bodyData = { 
      name, 
      email, 
      password, 
      phone,
      otp,
      role: "farmer" 
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      
      if (res.ok) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          setIsSignUp(false);
          setOtpStep(false);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setPhone("");
          setOtp("");
        }, 2000);
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
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
          {isSignUp 
            ? otpStep 
              ? "Verify OTP" 
              : "Create Farmer Account"
            : "Farmer Login"}
        </h2>

        {/* Success Message */}
        {success && (
          <div className="p-3 rounded-lg bg-green-50 text-green-700 text-sm mb-4">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm mb-4">
            {error}
          </div>
        )}

        {isSignUp && otpStep ? (
          // OTP Verification Form
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700 mb-4">
              We've sent an OTP to {phone}. It's valid for {Math.floor(otpTimer / 60)}:{(otpTimer % 60).toString().padStart(2, '0')}
            </div>

            <Input
              type="text"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              disabled={loading}
              className="text-center text-2xl tracking-widest"
            />

            <Button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full gradient-primary border-0 text-primary-foreground"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>

            <button
              type="button"
              onClick={() => {
                setOtpStep(false);
                setOtp("");
                setError("");
              }}
              className="w-full text-sm text-primary font-semibold hover:underline"
            >
              Back to Form
            </button>
          </form>
        ) : isSignUp ? (
          // Sign Up Form
          <>
            <form onSubmit={handleSendOtp} className="space-y-4">
              <Input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />

              <Input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />

              <Input
                type="tel"
                placeholder="Phone Number (10 digits)"
                required
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
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

              <Input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full gradient-primary border-0 text-primary-foreground"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>

            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(false);
                    setError("");
                    setSuccess("");
                  }}
                  className="text-primary font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </>
        ) : (
          // Login Form
          <>
            <form onSubmit={handleLogin} className="space-y-4">
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

            {role !== "admin" && (
              <div className="text-center mt-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                  New farmer?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(true);
                      setError("");
                      setSuccess("");
                    }}
                    className="text-primary font-semibold hover:underline"
                  >
                    Sign Up here
                  </button>
                </p>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
