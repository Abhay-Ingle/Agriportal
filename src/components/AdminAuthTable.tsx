import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Key, Clock, Lock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AuthCredential {
  category: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

export function AdminAuthTable() {
  const credentials: AuthCredential[] = [
    {
      category: "Email",
      value: "abhayingle21@gmail.com",
      description: "Admin login email address",
      icon: <Shield className="w-4 h-4" />,
    },
    {
      category: "Password",
      value: "abhay@1234",
      description: "Admin account password",
      icon: <Key className="w-4 h-4" />,
    },
    {
      category: "Role",
      value: "Admin",
      description: "User role for access control",
      icon: <Shield className="w-4 h-4" />,
    },
    {
      category: "Token Expiry",
      value: "24 Hours",
      description: "JWT token validity period",
      icon: <Clock className="w-4 h-4" />,
    },
  ];

  return (
    <Card className="border overflow-hidden">
      <div className="bg-primary text-primary-foreground p-6">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5" />
          <h3 className="text-xl font-semibold">Admin Authentication Credentials</h3>
        </div>
        <p className="text-sm text-primary-foreground/80 mt-1">
          Use these credentials to access the admin dashboard
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-bold w-24">Category</TableHead>
              <TableHead className="font-bold">Value</TableHead>
              <TableHead className="font-bold">Description</TableHead>
              <TableHead className="font-bold w-20 text-center">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {credentials.map((cred, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{cred.icon}</span>
                    {cred.category}
                  </div>
                </TableCell>
                <TableCell>
                  <code className="bg-muted px-3 py-1 rounded text-sm font-mono">
                    {cred.value}
                  </code>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {cred.description}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {cred.category === "Email" && (
                    <Badge variant="outline">Required</Badge>
                  )}
                  {cred.category === "Password" && (
                    <Badge variant="outline">Secret</Badge>
                  )}
                  {cred.category === "Role" && (
                    <Badge variant="secondary">System</Badge>
                  )}
                  {cred.category === "Token Expiry" && (
                    <Badge variant="outline">Config</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-6 border-t bg-muted/30">
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Login Instructions:</h4>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Navigate to Login page</li>
            <li>Select "Admin" from Role dropdown</li>
            <li>Enter email: <code className="bg-muted px-2 py-1 rounded text-xs">abhayingle21@gmail.com</code></li>
            <li>Enter password: <code className="bg-muted px-2 py-1 rounded text-xs">abhay@1234</code></li>
            <li>Click Login to access admin dashboard</li>
          </ol>
        </div>
      </div>
    </Card>
  );
}
