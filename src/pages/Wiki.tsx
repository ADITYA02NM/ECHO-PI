import { useState } from "react";
import { Search, ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Wiki = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `http://192.168.4.1:8000/wiki/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Could not search Wikipedia. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
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
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Offline Wikipedia</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {!selectedArticle ? (
          <>
            {/* Search Bar */}
            <div className="flex gap-2 mb-6">
              <Input
                placeholder="Search Wikipedia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={isSearching}>
                <Search className="h-5 w-5 text-white" />
              </Button>
            </div>

            {/* Results */}
            <div className="space-y-3">
              {results.map((article, idx) => (
                <Card
                  key={idx}
                  className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedArticle(article.title)}
                >
                  <h3 className="font-semibold text-foreground mb-1">{article.title}</h3>
                  <p className="text-sm text-muted-foreground">{article.snippet}</p>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div>
            <Button onClick={() => setSelectedArticle(null)} variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2 text-primary" />
              Back to results
            </Button>
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">{selectedArticle}</h2>
              <div className="prose max-w-none text-foreground">
                <p>Article content would be loaded from /wiki/article/{selectedArticle}</p>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Wiki;
