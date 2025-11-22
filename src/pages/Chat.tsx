import { useState, useEffect, useRef } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import aiChatIllustration from "@/assets/ai-chat-illustration.png";
import echoMascot from "@/assets/echo-mascot.png";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PRESET_QUESTIONS = [
  { q: "What is photosynthesis?", a: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll pigments." },
  { q: "How does evaporation work?", a: "Evaporation is the process by which water changes from a liquid to a gas or vapor." },
  { q: "What is the water cycle?", a: "The water cycle describes how water evaporates from the surface of the earth, rises into the atmosphere, cools and condenses into rain or snow in clouds, and falls again to the surface as precipitation." },
  { q: "Define gravity.", a: "Gravity is a force which tries to pull two objects toward each other. Anything which has mass also has a gravitational pull." },
  { q: "What are the three states of matter?", a: "The three states of matter are solid, liquid, and gas." },
  { q: "What is the solar system?", a: "The solar system consists of the Sun and everything that orbits, or travels around, the Sun." },
  { q: "How do plants breathe?", a: "Plants breathe through tiny pores called stomata, located on the underside of their leaves." },
  { q: "What is an atom?", a: "An atom is the smallest unit of ordinary matter that forms a chemical element." },
  { q: "Why is the sky blue?", a: "The sky is blue because of Rayleigh scattering. As sunlight reaches Earth's atmosphere, it is scattered in all directions by all the gases and particles in the air." },
  { q: "What is force?", a: "A force is a push or a pull upon an object resulting from the object's interaction with another object." },
];

const Chat = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (query?: string) => {
    const messageText = query || input;
    if (!messageText.trim()) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Check for preset questions first
    // Normalize strings for comparison: lowercase, trim, remove trailing punctuation
    const normalize = (str: string) => str.toLowerCase().trim().replace(/[?.,!]+$/, "");

    const preset = PRESET_QUESTIONS.find(p => normalize(p.q) === normalize(messageText));

    if (preset) {
      setTimeout(() => {
        const assistantMessage: Message = { role: "assistant", content: preset.a };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 500); // Simulate slight delay
      return;
    }

    try {
      const response = await fetch("http://10.178.17.91:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });
      const data = await response.json();
      const assistantMessage: Message = { role: "assistant", content: data.response || "No response" };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I couldn't process your request. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-5 w-5 text-primary" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <img src={echoMascot} alt="AI Assistant" className="h-8 w-8 rounded-full" />
            <h1 className="text-xl font-bold text-foreground">AI Assistant</h1>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <img
                src={aiChatIllustration}
                alt="AI Assistant"
                className="w-48 h-48 mb-6 animate-fade-in"
              />
              <h2 className="text-2xl font-bold text-foreground mb-2">Ask me anything!</h2>
              <p className="text-muted-foreground mb-8">I'm here to help with your questions, offline.</p>

              <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                {PRESET_QUESTIONS.map((q, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleSend(q.q)}
                  >
                    {q.q}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <Card
                className={`max-w-[80%] p-4 ${msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-card-foreground"
                  }`}
              >
                <p className="text-sm">{msg.content}</p>
              </Card>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <Card className="bg-card text-card-foreground p-4">
                <p className="text-sm">Thinking...</p>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input */}
      <div className="border-t border-border bg-card p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Input
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button onClick={() => handleSend()} disabled={isLoading || !input.trim()}>
            <Send className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
