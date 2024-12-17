import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, Paperclip, Globe } from "lucide-react";
import { useState, KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background to-background/0 p-4">
      <div className="mx-auto max-w-3xl">
        <div className="relative flex items-end gap-2 rounded-xl border bg-background p-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Envie uma mensagem para o ChatGPT"
            className="min-h-[20px] max-h-[200px] resize-none bg-transparent border-0 p-2 focus-visible:ring-0"
            disabled={disabled}
          />
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-lg hover:bg-secondary"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-lg hover:bg-secondary"
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleSend}
              disabled={!message.trim() || disabled}
              size="icon"
              className="h-8 w-8 rounded-lg bg-primary hover:bg-primary/90"
            >
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="mt-2 text-center text-xs text-muted-foreground">
          O ChatGPT pode cometer erros. Considere verificar informações importantes.
        </div>
      </div>
    </div>
  );
};