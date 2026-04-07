import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Shield, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import API from "@/config/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Grievance {
  _id: string;
  title: string;
  status: string;
  userId: { name: string; email: string };
  createdAt: string;
}

interface DashboardStats {
  total: number;
  pending: number;
  inProgress: number;
  resolved: number;
}

export default function AdminDashboard() {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("adminEmail") || "Admin User";

    if (userRole !== "admin" || !token) {
      navigate("/login");
      return;
    }

    setAdminEmail(email);
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch(`${API}/api/griviences/admin/all`);
      const data = await res.json();

      setGrievances(data);

      // Calculate stats
      const stats = {
        total: data.length,
        pending: data.filter((g: Grievance) => g.status === "Pending").length,
        inProgress: data.filter(
          (g: Grievance) => g.status === "In Progress"
        ).length,
        resolved: data.filter((g: Grievance) => g.status === "Resolved").length,
      };

      setStats(stats);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
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

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      "Pending": "destructive",
      "In Progress": "secondary",
      "Resolved": "default",
    };

    return (
      <div className="flex items-center gap-2">
        {getStatusIcon(status)}
        <Badge variant={variants[status] || "outline"}>{status}</Badge>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            </div>
            <p className="text-muted-foreground">
              Welcome, {adminEmail} • Manage all grievances below
            </p>
          </div>
          <Button
            variant="destructive"
            size="lg"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 border">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Grievances
                </p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Pending
                </p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  In Progress
                </p>
                <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Resolved
                </p>
                <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Grievances Table */}
        <Card className="border overflow-hidden">
          <div className="bg-primary text-primary-foreground p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold">
              All Grievances ({grievances.length})
            </h2>
            <p className="text-sm text-primary-foreground/80 mt-1">
              Manage and update all farmer grievances
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
                    <TableHead className="font-bold">Email</TableHead>
                    <TableHead className="font-bold">Issue</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="font-bold">Date</TableHead>
                    <TableHead className="font-bold text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grievances.map((grievance) => (
                    <TableRow key={grievance._id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">
                        {grievance.userId.name}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {grievance.userId.email}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        <span title={grievance.title}>{grievance.title}</span>
                      </TableCell>
                      <TableCell>{getStatusBadge(grievance.status)}</TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(grievance.createdAt).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            navigate("/admin/grievances", {
                              state: { selectedId: grievance._id },
                            })
                          }
                        >
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>

        {/* Footer Info */}
        <div className="mt-8 p-4 bg-muted rounded-lg border">
          <p className="text-sm text-muted-foreground">
            <strong>Admin Dashboard Information:</strong> This dashboard displays
            all grievances from farmers. Click "Manage" on any grievance to
            update its status or add admin notes.
          </p>
        </div>
      </div>
    </div>
  );
}
