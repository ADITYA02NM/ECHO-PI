import { useState, useEffect } from "react";
import { FileText, ArrowLeft, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AdminLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://192.168.4.1:8000/admin/logs");
      const data = await response.json();
      setLogs(data.logs || []);
    } catch (error) {
      console.error("Failed to fetch logs");
    }
  };

  const clearLogs = async () => {
    try {
      await fetch("http://192.168.4.1:8000/admin/logs/clear", { method: "POST" });
      toast({
        title: "Logs Cleared",
        description: "All SOS logs have been removed.",
      });
      setLogs([]);
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not clear logs.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-5 w-5 text-primary" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">SOS Logs</h1>
            </div>
          </div>
          <Button variant="destructive" size="sm" onClick={clearLogs}>
            <Trash2 className="h-4 w-4 mr-2 text-white" />
            Clear Logs
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-2">
          {logs.map((log, idx) => (
            <Card key={idx} className="p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-mono text-foreground">{log.timestamp}</span>
                <span className="text-muted-foreground">{log.details}</span>
              </div>
            </Card>
          ))}
          {logs.length === 0 && (
            <Card className="p-8 text-center">
              <FileText className="h-12 w-12 text-primary/50 mx-auto mb-3" />
              <p className="text-muted-foreground">No logs available</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminLogs;
