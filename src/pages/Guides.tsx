import { useState, useEffect } from "react";
import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Guide {
  id: string;
  title: string;
  description: string;
}

const Guides = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [guideContent, setGuideContent] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await fetch("http://192.168.4.1:8000/guides/list");
      const data = await response.json();
      setGuides(data.guides || []);
    } catch (error) {
      toast({
        title: "Failed to Load Guides",
        description: "Could not fetch emergency guides.",
        variant: "destructive",
      });
    }
  };

  const loadGuide = async (id: string) => {
    try {
      const response = await fetch(`http://192.168.4.1:8000/guides/${id}`);
      const data = await response.json();
      setGuideContent(data.content || "Content not available");
      setSelectedGuide(id);
    } catch (error) {
      toast({
        title: "Failed to Load Guide",
        description: "Could not fetch guide content.",
        variant: "destructive",
      });
    }
  };

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
            {guides.map((guide) => (
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
              <div className="prose max-w-none text-foreground">
                <div dangerouslySetInnerHTML={{ __html: guideContent }} />
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Guides;
