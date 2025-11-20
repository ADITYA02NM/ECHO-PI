import { Shield, BookOpen, Map, Languages, FileText, AlertCircle, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ConnectivityStatus } from "@/components/ConnectivityStatus";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroIllustration from "@/assets/hero-illustration.png";
import echoMascot from "@/assets/echo-mascot.png";
import backgroundPattern from "@/assets/background-pattern.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(${backgroundPattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={echoMascot} alt="ECHO-Pi Mascot" className="h-10 w-10 rounded-full" />
            <h1 className="text-2xl font-bold text-foreground">ECHO-Pi</h1>
          </div>
          <ConnectivityStatus />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8 relative z-10">
        {/* Hero Illustration */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <img 
            src={heroIllustration} 
            alt="ECHO-Pi Hero" 
            className="w-full max-w-md h-auto rounded-2xl"
          />
        </div>
        {/* AI Chat Search */}
        <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <img src={echoMascot} alt="AI Assistant" className="h-12 w-12 rounded-full" />
            <h2 className="text-xl font-bold text-foreground">Offline AI Assistant</h2>
          </div>
          <div className="relative">
            <Input
              placeholder="Ask the Offline AI..."
              className="pl-4 pr-4 py-6 text-lg border-2 border-primary/20 focus:border-primary rounded-xl"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                  navigate(`/chat?q=${encodeURIComponent(e.currentTarget.value)}`);
                }
              }}
            />
          </div>
        </div>

        {/* Feature Grid */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Features</h2>
          <div className="grid grid-cols-2 gap-4">
            <FeatureCard title="Offline Wikipedia" icon={BookOpen} href="/wiki" color="primary" />
            <FeatureCard title="Offline Maps" icon={Map} href="/map" color="primary" />
            <FeatureCard title="Translator" icon={Languages} href="/translator" color="accent" />
            <FeatureCard title="Emergency Guides" icon={FileText} href="/guides" color="accent" />
          </div>
        </div>

        {/* Admin Link */}
        <div className="text-center">
          <Link to="/admin/login">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Settings className="h-4 w-4 mr-2" />
              Switch to Admin Mode
            </Button>
          </Link>
        </div>
      </main>

      {/* Floating SOS Button */}
      <Link to="/sos">
        <Button
          size="lg"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full shadow-2xl bg-emergency hover:bg-emergency/90 border-4 border-card z-50"
        >
          <AlertCircle className="h-10 w-10" />
        </Button>
      </Link>
    </div>
  );
};

export default Home;
