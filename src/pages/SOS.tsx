import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import sosIllustration from "@/assets/sos-illustration.png";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const SOS = () => {
  const [isTriggering, setIsTriggering] = useState(false);
  const { toast } = useToast();

  const handleTriggerSOS = async () => {
    setIsTriggering(true);
    try {
      const response = await fetch("http://192.168.4.1:8000/sos/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "app", timestamp: new Date().toISOString() }),
      });

      if (response.ok) {
        toast({
          title: "SOS Alert Sent!",
          description: "Emergency services have been notified.",
          variant: "default",
        });
      } else {
        throw new Error("Failed to send SOS");
      }
    } catch (error) {
      toast({
        title: "SOS Failed",
        description: "Could not send alert. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTriggering(false);
    }
  };

  return (
    <div className="min-h-screen bg-emergency flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link to="/">
          <Button variant="ghost" size="sm" className="text-emergency-foreground hover:bg-white/20">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <img 
          src={sosIllustration} 
          alt="SOS Alert" 
          className="w-64 h-64 mb-8 animate-pulse"
        />
        <h1 className="text-4xl font-bold text-emergency-foreground mb-4">Emergency SOS</h1>
        <p className="text-xl text-emergency-foreground/90 mb-12 max-w-md">
          Press the button below to send an emergency alert to all connected rescue nodes.
        </p>

        <Button
          size="lg"
          onClick={handleTriggerSOS}
          disabled={isTriggering}
          className="h-40 w-40 rounded-full text-2xl font-bold bg-card text-emergency hover:bg-card/90 shadow-2xl border-8 border-white"
        >
          {isTriggering ? "Sending..." : "TRIGGER SOS"}
        </Button>
      </main>
    </div>
  );
};

export default SOS;
