import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import API from "@/config/api";

interface UserType {
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface GrivienceType {
  _id: string;
  title: string;
  description: string;
  mobile: string;
  image?: string;
  status: string;
  adminNotes?: string;
  createdAt: string;
}

export default function Profile() {
  const [user, setUser] = useState<UserType | null>(null);
  const [griviences, setGriviences] = useState<GrivienceType[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [editName, setEditName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const hasToasted = useRef(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const token = localStorage.getItem("token");

  // ==============================
  // PROTECT PAGE + FETCH DATA
  // ==============================
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user profile
    fetch(`${API}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Profile fetch failed");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setEditName(data.name); // Initialize edit form with current name

        // Show welcome toast only once
        if (!hasToasted.current) {
          toast({
            title: `Welcome ${data.name} 👋`,
            description: "Access your services from the sidebar",
          });
          hasToasted.current = true;
        }
      })
      .catch(() => navigate("/login"));

    // Fetch user's griviences
    fetch(`${API}/api/griviences/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch grievances");
        return res.json();
      })
      .then((data) => {
        console.log("Grievances fetched:", data);
        setGriviences(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Grievance fetch error:", error);
        setGriviences([]);
      });

  }, [token, navigate, toast]);

  // Refresh grievances
  const refreshGriviences = () => {
    if (!token) return;
    
    fetch(`${API}/api/griviences/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch grievances");
        return res.json();
      })
      .then((data) => {
        setGriviences(Array.isArray(data) ? data : []);
        toast({
          title: "Refreshed",
          description: "Grievances updated successfully",
        });
      })
      .catch((error) => {
        console.error("Grievance fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to refresh grievances",
          variant: "destructive",
        });
      });
  };

  // Update profile
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) return;

    // Validate passwords if changing password
    if (newPassword || currentPassword) {
      if (!currentPassword) {
        toast({
          title: "Error",
          description: "Current password is required to set a new password",
          variant: "destructive",
        });
        return;
      }

      if (newPassword !== confirmPassword) {
        toast({
          title: "Error",
          description: "New passwords do not match",
          variant: "destructive",
        });
        return;
      }

      if (newPassword.length < 6) {
        toast({
          title: "Error",
          description: "New password must be at least 6 characters",
          variant: "destructive",
        });
        return;
      }
    }

    setIsUpdating(true);

    try {
      const response = await fetch(
        `${API}/api/users/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: editName || undefined,
            currentPassword: currentPassword || undefined,
            newPassword: newPassword || undefined,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Update failed");
      }

      const result = await response.json();

      // Update local user state
      if (user && editName) {
        setUser({ ...user, name: editName });
      }

      // Reset password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      toast({
        title: "Success",
        description: result.message || "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) return <div className="p-10">Loading...</div>;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background flex">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 border-r bg-muted p-6 hidden md:flex flex-col">

        {/* User Info */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
            {initials}
          </div>

          <h3 className="mt-4 font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="text-xs mt-1 text-primary">
            {user.role.toUpperCase()}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 text-sm">

          <button
            onClick={() => setActiveTab("overview")}
            className={`text-left p-2 rounded ${
              activeTab === "overview"
                ? "bg-primary text-white"
                : "hover:bg-background"
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab("edit")}
            className={`text-left p-2 rounded ${
              activeTab === "edit"
                ? "bg-primary text-white"
                : "hover:bg-background"
            }`}
          >
            Edit Profile
          </button>

          <button
            onClick={() => setActiveTab("grivience")}
            className={`text-left p-2 rounded ${
              activeTab === "grivience"
                ? "bg-primary text-white"
                : "hover:bg-background"
            }`}
          >
            My Grivience
          </button>

          <button
            onClick={() => navigate("/grievance-system")}
            className="text-left p-2 rounded hover:bg-background"
          >
            Submit Grivience
          </button>

          <button
            onClick={() => navigate("/ai-crop-advisor")}
            className="text-left p-2 rounded hover:bg-background"
          >
            AI Crop Advisor
          </button>

          <button
            onClick={() => navigate("/price-intelligence")}
            className="text-left p-2 rounded hover:bg-background"
          >
            Price Intelligence
          </button>

          <button
            onClick={() => navigate("/weather-Intel")}
            className="text-left p-2 rounded hover:bg-background"
          >
            Weather Intelligence
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="text-left p-2 rounded bg-destructive text-white mt-6"
          >
            Logout
          </button>

        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 p-10">

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Profile Overview
            </h2>

            <div className="space-y-4 bg-card p-6 rounded-xl shadow">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p>
                <strong>Joined:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {/* EDIT PROFILE TAB */}
        {activeTab === "edit" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

            <form
              onSubmit={handleUpdateProfile}
              className="bg-card p-6 rounded-xl shadow max-w-md space-y-4"
            >
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="border-t pt-4 mt-6">
                <h3 className="font-semibold mb-4">Change Password (Optional)</h3>

                {/* Current Password */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* New Password */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full mt-6 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50"
              >
                {isUpdating ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        )}

        {/* GRIVIENCE TAB */}
        {activeTab === "grivience" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My Grivience History</h2>
              <button
                onClick={refreshGriviences}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm font-medium"
              >
                🔄 Refresh
              </button>
            </div>

            {griviences.length === 0 ? (
              <p className="text-muted-foreground">
                No grivience submitted yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="p-4 text-left font-semibold">ID</th>
                      <th className="p-4 text-left font-semibold">Category</th>
                      <th className="p-4 text-left font-semibold">Description</th>
                      <th className="p-4 text-left font-semibold">Mobile</th>
                      <th className="p-4 text-center font-semibold">Status</th>
                      <th className="p-4 text-left font-semibold">Submitted</th>
                      <th className="p-4 text-left font-semibold">Admin Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {griviences.map((item) => (
                      <tr key={item._id} className="border-t hover:bg-muted/50 transition-colors">
                        <td className="p-4 font-mono text-xs">{item._id.slice(0, 8).toUpperCase()}</td>
                        <td className="p-4 font-medium">{item.title}</td>
                        <td className="p-4 text-sm text-muted-foreground max-w-xs line-clamp-2">
                          {item.description}
                        </td>
                        <td className="p-4 text-sm">{item.mobile}</td>
                        <td className="p-4 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            item.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                            item.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                            "bg-green-100 text-green-800"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4 text-xs text-muted-foreground">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-sm">
                          {item.adminNotes ? (
                            <span className="text-muted-foreground">{item.adminNotes}</span>
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}