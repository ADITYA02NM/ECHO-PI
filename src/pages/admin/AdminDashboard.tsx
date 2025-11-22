import { useEffect, useState } from "react";
import { Shield, AlertCircle, Wifi, FileText, Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSOS: 0,
    lastSOS: "N/A",
    nodeStatus: "Unknown",
  });

  useEffect(() => {
    // Check admin auth
    if (!localStorage.getItem("adminAuth")) {
      window.location.href = "/admin/login";
    }

    // Fetch SOS stats
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5001/admin/stats");
        const data = await response.json();
        setStats({
          totalSOS: data.totalSOS || 0,
          lastSOS: data.lastSOS || "N/A",
          nodeStatus: data.nodeStatus || "Unknown",
        });
      } catch (error) {
        console.error("Failed to fetch stats");
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-5 w-5 text-primary" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem("adminAuth");
              window.location.href = "/";
            }}
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="h-6 w-6 text-primary" />
              <h3 className="font-semibold text-foreground">Total SOS Alerts</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.totalSOS}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-6 w-6 text-primary" />
              <h3 className="font-semibold text-foreground">Last SOS</h3>
            </div>
            <p className="text-lg text-muted-foreground">{stats.lastSOS}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Wifi className="h-6 w-6 text-primary" />
              <h3 className="font-semibold text-foreground">Node Status</h3>
            </div>
            <p className="text-lg text-primary font-semibold">{stats.nodeStatus}</p>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/admin/alerts">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">SOS Alerts Feed</h3>
                  <p className="text-sm text-muted-foreground">View and manage live SOS alerts</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/admin/logs">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">View Logs</h3>
                  <p className="text-sm text-muted-foreground">Access complete SOS history</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/admin/nodes">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <Wifi className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Node Management</h3>
                  <p className="text-sm text-muted-foreground">Check ESP32 node health</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Return to User Mode</h3>
                  <p className="text-sm text-muted-foreground">Switch back to user interface</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
