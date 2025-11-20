import { useState, useEffect } from "react";
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  nodeId: string;
  timestamp: string;
  type: "button" | "app";
  status: "pending" | "acknowledged";
}

const AdminAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch("http://192.168.4.1:8000/admin/sos/list");
      const data = await response.json();
      setAlerts(data.alerts || []);
    } catch (error) {
      console.error("Failed to fetch alerts");
    }
  };

  const acknowledgeAlert = async (id: string) => {
    try {
      await fetch(`http://192.168.4.1:8000/admin/sos/acknowledge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alert_id: id }),
      });
      toast({
        title: "Alert Acknowledged",
        description: "SOS alert has been marked as handled.",
      });
      fetchAlerts();
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not acknowledge alert.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/admin/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-5 w-5 text-primary" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">SOS Alerts Feed</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-3">
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className={`p-4 ${
                alert.status === "pending" ? "border-l-4 border-l-emergency" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">
                    Node {alert.nodeId} - {alert.type.toUpperCase()}
                  </h3>
                  <p className="text-sm text-muted-foreground">{alert.timestamp}</p>
                </div>
                {alert.status === "pending" ? (
                  <Button size="sm" onClick={() => acknowledgeAlert(alert.id)}>
                    Acknowledge
                  </Button>
                ) : (
                  <CheckCircle className="h-5 w-5 text-primary" />
                )}
              </div>
            </Card>
          ))}
          {alerts.length === 0 && (
            <Card className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-primary/50 mx-auto mb-3" />
              <p className="text-muted-foreground">No SOS alerts received</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminAlerts;
