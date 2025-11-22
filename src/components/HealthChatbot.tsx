import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = { role: "user" | "assistant"; content: string };

const HealthChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessage: string) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/health-chat`;
    
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: [...messages, { role: "user", content: userMessage }] }),
    });

    if (!resp.ok) {
      if (resp.status === 429) {
        toast({
          title: "Rate limit exceeded",
          description: "Please try again in a moment.",
          variant: "destructive",
        });
      } else if (resp.status === 402) {
        toast({
          title: "Service unavailable",
          description: "Please contact support.",
          variant: "destructive",
        });
      }
      throw new Error("Failed to start stream");
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;
    let assistantContent = "";

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant") {
                return prev.map((m, i) => 
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      await streamChat(userMessage);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="flex flex-col h-[600px] bg-card/50 backdrop-blur-sm border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Health AI Assistant</h3>
            <p className="text-sm text-muted-foreground">Ask about diseases, prevention, and health tips</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <Bot className="w-12 h-12 mx-auto mb-4 text-primary/50" />
              <p className="text-sm">Start a conversation by asking about health topics</p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInput("What are common disease outbreaks in urban areas?")}
                >
                  Common outbreaks
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInput("How can communities prevent disease spread?")}
                >
                  Prevention tips
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInput("What are early warning signs of cholera?")}
                >
                  Warning signs
                </Button>
              </div>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.role === "assistant" ? "" : "flex-row-reverse"}`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === "assistant" ? "bg-primary/10" : "bg-secondary"
              }`}>
                {msg.role === "assistant" ? (
                  <Bot className="w-5 h-5 text-primary" />
                ) : (
                  <User className="w-5 h-5 text-secondary-foreground" />
                )}
              </div>
              <div className={`flex-1 ${msg.role === "user" ? "text-right" : ""}`}>
                <div className={`inline-block p-3 rounded-lg ${
                  msg.role === "assistant" 
                    ? "bg-muted text-foreground" 
                    : "bg-primary text-primary-foreground"
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="inline-block p-3 rounded-lg bg-muted">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about health, diseases, or prevention..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default HealthChatbot;
