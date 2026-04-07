import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, ArrowLeft, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import API from "@/config/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  const [updating, setUpdating] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // Check if user is admin
  useEffect(() => {
    if (userRole !== "admin") {
      navigate("/login");
      return;
    }

    const email = localStorage.getItem("adminEmail") || "Admin User";
    setAdminEmail(email);
    fetchAllGrievances();
  }, [userRole, navigate]);

  const fetchAllGrievances = async () => {
    try {
      const res = await fetch(`${API}/api/griviences/admin/all`);
      if (!res.ok) {
        throw new Error("Failed to fetch grievances");
      }
      const data = await res.json();
      setGrievances(data);
    } catch (error) {
      console.error("Error fetching grievances:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateGrievance = async () => {
    if (!selectedGrievance || !newStatus) return;

    setUpdating(true);
    try {
      const res = await fetch(
        `${API}/api/griviences/${selectedGrievance._id}/status`,
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
        alert("✓ Grievance updated successfully!");
      } else {
        alert("Failed to update grievance");
      }
    } catch (error) {
      console.error("Error updating grievance:", error);
      alert("Error: Failed to update grievance");
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("adminEmail");
    navigate("/login");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case "In Progress":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "Resolved":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (
    status: string
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Pending":
        return "destructive";
      case "In Progress":
        return "secondary";
      case "Resolved":
        return "default";
      default:
        return "outline";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading grievances...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Manage Grievances</h1>
            <p className="text-muted-foreground">
              Admin: {adminEmail} • Total: {grievances.length} grievance(s)
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate("/admin-dashboard")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Grievances Table */}
          <div className="lg:col-span-2">
            <Card className="border overflow-hidden">
              <div className="bg-primary text-primary-foreground p-6">
                <h2 className="text-xl font-semibold">
                  All Grievances ({grievances.length})
                </h2>
                <p className="text-sm text-primary-foreground/80 mt-1">
                  Select a grievance to view details and update status
                </p>
              </div>

              {grievances.length === 0 ? (
                <div className="p-8 text-center">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">No grievances found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead className="font-bold">Farmer Name</TableHead>
                        <TableHead className="font-bold">Issue Title</TableHead>
                        <TableHead className="font-bold">Mobile</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                        <TableHead className="font-bold text-center">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grievances.map((grievance) => (
                        <TableRow
                          key={grievance._id}
                          className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                            selectedGrievance?._id === grievance._id
                              ? "bg-muted/70"
                              : ""
                          }`}
                        >
                          <TableCell className="font-medium">
                            <div>
                              <p className="font-semibold">{grievance.userId.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {grievance.userId.email}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <p className="truncate" title={grievance.title}>
                              {grievance.title}
                            </p>
                          </TableCell>
                          <TableCell>{grievance.mobile}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(grievance.status)}
                              <Badge variant={getStatusBadgeVariant(grievance.status)}>
                                {grievance.status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
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
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>
          </div>

          {/* Details & Update Panel */}
          {selectedGrievance ? (
            <div className="lg:col-span-1">
              <Card className="border p-6 sticky top-28 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Update Grievance</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setSelectedGrievance(null);
                      setNewStatus("");
                      setAdminNotes("");
                    }}
                  >
                    ✕
                  </Button>
                </div>

                {/* Grievance Details */}
                <div className="space-y-4 mb-6 pb-6 border-b">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                      Issue Title
                    </p>
                    <p className="font-semibold text-sm mt-1">
                      {selectedGrievance.title}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                      Description
                    </p>
                    <p className="text-sm mt-1">{selectedGrievance.description}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                      Farmer Details
                    </p>
                    <div className="mt-1 space-y-1">
                      <p className="font-semibold text-sm">{selectedGrievance.userId.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedGrievance.userId.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedGrievance.mobile}
                      </p>
                    </div>
                  </div>

                  {selectedGrievance.image ? (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">
                        Evidence Image
                      </p>
                      <div className="mt-1 border rounded-lg overflow-hidden bg-muted">
                        <img
                          src={selectedGrievance.image}
                          alt="Grievance Evidence"
                          className="w-full h-48 object-contain"
                          onError={(e) => {
                            console.error("Image failed to load:", selectedGrievance.image);
                            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3Ctext x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='20'%3EImage Not Available%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">
                        Evidence Image
                      </p>
                      <div className="mt-1 border border-dashed rounded-lg p-4 bg-muted/30 text-center">
                        <p className="text-xs text-muted-foreground">No image attached</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                      Submitted On
                    </p>
                    <p className="text-xs mt-1">
                      {new Date(selectedGrievance.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Update Controls */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      Update Status <span className="text-destructive">*</span>
                    </label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                            Pending
                          </div>
                        </SelectItem>
                        <SelectItem value="In Progress">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            In Progress
                          </div>
                        </SelectItem>
                        <SelectItem value="Resolved">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            Resolved
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      Admin Notes
                    </label>
                    <Textarea
                      placeholder="Add resolution notes, actions taken, or messages for the farmer..."
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      className="h-24 resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {adminNotes.length} / 500 characters
                    </p>
                  </div>

                  <Button
                    onClick={handleUpdateGrievance}
                    disabled={updating || !newStatus}
                    className="w-full gradient-primary border-0 text-primary-foreground"
                    size="lg"
                  >
                    {updating ? "Updating..." : "✓ Update Grievance"}
                  </Button>

                  {selectedGrievance.adminNotes && (
                    <div className="p-3 bg-muted rounded-lg border">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">
                        Previous Notes
                      </p>
                      <p className="text-xs">{selectedGrievance.adminNotes}</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ) : (
            <div className="lg:col-span-1">
              <Card className="border p-6 sticky top-28 bg-muted/30 flex items-center justify-center min-h-80">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">
                    Select a grievance from the table to view details and update status
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
