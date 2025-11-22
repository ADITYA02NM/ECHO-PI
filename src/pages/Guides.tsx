import { useState } from "react";
import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { emergencyGuides } from "@/data/emergencyGuides";

const Guides = () => {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  const loadGuide = (id: string) => {
    setSelectedGuide(id);
  };

  const currentGuide = emergencyGuides.find(g => g.id === selectedGuide);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-5 w-5 text-primary" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Emergency Guides</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {!selectedGuide ? (
          <div className="space-y-3">
            {emergencyGuides.map((guide) => (
              <Card
                key={guide.id}
                className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => loadGuide(guide.id)}
              >
                <h3 className="font-semibold text-foreground mb-1">{guide.title}</h3>
                <p className="text-sm text-muted-foreground">{guide.description}</p>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            <Button onClick={() => setSelectedGuide(null)} variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2 text-primary" />
              Back to guides
            </Button>
            <Card className="p-6">
              <h2 className="text-3xl font-bold text-primary mb-6">{currentGuide?.title}</h2>
              <div className="text-foreground leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: currentGuide?.content || "" }} />
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Guides;
