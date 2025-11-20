import { ArrowLeft, Languages, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Translator = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);
    try {
      const response = await fetch("http://192.168.4.1:8000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          source: "en",
          target: "hi",
        }),
      });
      const data = await response.json();
      setOutputText(data.translated_text || "Translation not available");
    } catch (error) {
      toast({
        title: "Translation Failed",
        description: "Could not translate text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
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
            <Languages className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Translator</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-center">
            <p className="font-semibold text-foreground">English</p>
          </div>
          <ArrowRight className="h-6 w-6 text-primary" />
          <div className="text-center">
            <p className="font-semibold text-foreground">Hindi</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Input Text</label>
            <Textarea
              placeholder="Enter text in English..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px] resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Translation</label>
            <Textarea
              placeholder="Translation will appear here..."
              value={outputText}
              readOnly
              className="min-h-[200px] resize-none bg-muted"
            />
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={handleTranslate}
            disabled={isTranslating || !inputText.trim()}
            className="w-full md:w-auto"
          >
            {isTranslating ? "Translating..." : "Translate"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Translator;
