import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Grievance {
  _id: string;
  title: string;
  description: string;
  mobile: string;
  status: string;
  adminNotes: string;
  image?: string;
  userId: { name: string; email: string };
  createdAt: string;
}

export default function AdminGrievances() {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // Check if user is admin
  useEffect(() => {
    if (userRole !== "admin") {
      navigate("/");
      return;
    }

    fetchAllGrievances();
  }, [userRole, navigate]);

  const fetchAllGrievances = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/griviences/admin/all");
      const data = await res.json();
      setGrievances(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching grievances:", error);
      setLoading(false);
    }
  };

  const handleUpdateGrievance = async () => {
    if (!selectedGrievance || !newStatus) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/griviences/${selectedGrievance._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
            adminNotes,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setGrievances(
          grievances.map((g) => (g._id === selectedGrievance._id ? data : g))
        );
        setSelectedGrievance(null);
        setNewStatus("");
        setAdminNotes("");
        alert("Grievance updated successfully!");
      }
    } catch (error) {
      console.error("Error updating grievance:", error);
      alert("Failed to update grievance");
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading grievances...</div>;
  }

  return (
    <div className="min-h-screen bg-background pt-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Admin - Grievance Management</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Grievances List */}
          <div className="lg:col-span-2">
            <div className="bg-card border rounded-lg overflow-hidden">
              <div className="bg-primary text-primary-foreground p-4">
                <h2 className="text-xl font-semibold">
                  All Grievances ({grievances.length})
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted border-b">
                    <tr>
                      <th className="p-4 text-left font-semibold">Farmer</th>
                      <th className="p-4 text-left font-semibold">Issue</th>
                      <th className="p-4 text-left font-semibold">Mobile</th>
                      <th className="p-4 text-center font-semibold">Status</th>
                      <th className="p-4 text-center font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grievances.map((grievance) => (
                      <tr
                        key={grievance._id}
                        className="border-b hover:bg-muted/50"
                      >
                        <td className="p-4 text-sm">
                          <div>
                            <p className="font-medium">{grievance.userId.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {grievance.userId.email}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-sm max-w-xs truncate">
                          {grievance.title}
                        </td>
                        <td className="p-4 text-sm">{grievance.mobile}</td>
                        <td className="p-4 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                              grievance.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : grievance.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {grievance.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <Button
                            size="sm"
                            variant={
                              selectedGrievance?._id === grievance._id
                                ? "default"
                                : "outline"
                            }
                            onClick={() => {
                              setSelectedGrievance(grievance);
                              setNewStatus(grievance.status);
                              setAdminNotes(grievance.adminNotes || "");
                            }}
                          >
                            {selectedGrievance?._id === grievance._id
                              ? "Selected"
                              : "Select"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Details & Update Panel */}
          {selectedGrievance && (
            <div className="lg:col-span-1">
              <div className="bg-card border rounded-lg p-6 shadow-sm sticky top-24">
                <h3 className="text-xl font-bold mb-4">Update Grievance</h3>

                {/* Grievance Details */}
                <div className="space-y-4 mb-6 pb-6 border-b">
                  <div>
                    <p className="text-xs text-muted-foreground">Category</p>
                    <p className="font-semibold">{selectedGrievance.title}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Description</p>
                    <p className="text-sm">{selectedGrievance.description}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Farmer</p>
                    <p className="font-semibold">{selectedGrievance.userId.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedGrievance.userId.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Mobile</p>
                    <p className="font-semibold">{selectedGrievance.mobile}</p>
                  </div>

                  {selectedGrievance.image && (
                    <div>
                      <p className="text-xs text-muted-foreground">Image</p>
                      <img
                        src={selectedGrievance.image}
                        alt="Grievance"
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-muted-foreground">Submitted</p>
                    <p className="text-xs">
                      {new Date(selectedGrievance.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Update Controls */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      Update Status
                    </label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      Admin Notes
                    </label>
                    <Textarea
                      placeholder="Add notes for the farmer..."
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      className="h-24"
                    />
                  </div>

                  <Button
                    onClick={handleUpdateGrievance}
                    className="w-full gradient-primary border-0 text-primary-foreground"
                  >
                    Update Grievance
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
