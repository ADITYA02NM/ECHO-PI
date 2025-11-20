import { useState } from "react";
import { Wifi, ArrowLeft, Radio, Zap, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AdminNodes = () => {
  const [nodeStatus, setNodeStatus] = useState({
    lastPing: "2 minutes ago",
    battery: "85%",
    status: "Online",
  });
  const { toast } = useToast();

  const pingNode = async () => {
    try {
      await fetch("http://192.168.4.1:8000/admin/node/ping", { method: "POST" });
      toast({ title: "Ping Sent", description: "Node responded successfully." });
    } catch {
      toast({ title: "Ping Failed", description: "Node did not respond.", variant: "destructive" });
    }
  };

  const flashLED = async () => {
    try {
      await fetch("http://192.168.4.1:8000/admin/node/flash", { method: "POST" });
      toast({ title: "LED Flashed", description: "Node LED indicator activated." });
    } catch {
      toast({ title: "Failed", description: "Could not flash LED.", variant: "destructive" });
    }
  };

  const resetNode = async () => {
    try {
      await fetch("http://192.168.4.1:8000/admin/node/reset", { method: "POST" });
      toast({ title: "Node Reset", description: "ESP32 node has been reset." });
    } catch {
      toast({ title: "Failed", description: "Could not reset node.", variant: "destructive" });
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
            <Wifi className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Node Status</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Status Card */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">ESP32 Node Health</h2>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last Ping</span>
              <span className="font-semibold text-foreground">{nodeStatus.lastPing}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Battery Level</span>
              <span className="font-semibold text-foreground">{nodeStatus.battery}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-semibold text-primary">{nodeStatus.status}</span>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button onClick={pingNode} className="w-full" size="lg">
            <Radio className="h-5 w-5 mr-2 text-white" />
            Ping Node
          </Button>
          <Button onClick={flashLED} className="w-full" size="lg" variant="secondary">
            <Zap className="h-5 w-5 mr-2 text-primary" />
            Flash LED
          </Button>
          <Button onClick={resetNode} className="w-full" size="lg" variant="destructive">
            <RotateCcw className="h-5 w-5 mr-2 text-white" />
            Reset Node
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AdminNodes;
