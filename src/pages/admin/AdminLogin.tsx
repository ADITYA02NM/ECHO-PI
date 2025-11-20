import { useState } from "react";
import { Shield, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [pin, setPin] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = () => {
    if (pin === "2580") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect PIN. Please try again.",
        variant: "destructive",
      });
      setPin("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-5 w-5 mr-2 text-primary" />
            Back to Home
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="bg-primary rounded-full p-6 inline-block mb-4">
              <Shield className="h-16 w-16 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Mode</h1>
            <p className="text-muted-foreground">Enter your PIN to access admin features</p>
          </div>

          <div className="space-y-4">
            <Input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="text-center text-2xl py-6"
              maxLength={4}
            />
            <Button onClick={handleLogin} className="w-full" size="lg">
              Unlock Admin Mode
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Default PIN: 2580
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
