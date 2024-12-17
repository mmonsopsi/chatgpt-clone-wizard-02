import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { motion } from "framer-motion";
import { ApiKeyForm } from "@/components/ApiKeyForm";
import { toast } from "@/components/ui/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [model, setModel] = useState<string>("");

  const sendMessageToOpenAI = async (userMessage: string) => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "system",
              content:
                "Você é um assistente prestativo e amigável. Responda de forma clara e concisa.",
            },
            ...messages,
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Erro ao se comunicar com a API");
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Erro na chamada da API:", error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleSendMessage = async (content: string) => {
    setMessages((prev) => [...prev, { role: "user", content }]);
    setIsTyping(true);

    const assistantResponse = await sendMessageToOpenAI(content);
    
    if (assistantResponse) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantResponse },
      ]);
    }
    
    setIsTyping(false);
  };

  const handleApiSubmit = (newApiKey: string, selectedModel: string) => {
    setApiKey(newApiKey);
    setModel(selectedModel);
    console.log("API Key configurada:", newApiKey);
    console.log("Modelo selecionado:", selectedModel);
  };

  if (!apiKey) {
    return <ApiKeyForm onSubmit={handleApiSubmit} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <motion.main
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {messages.length === 0 && (
          <div className="flex h-[60vh] items-center justify-center">
            <h1 className="text-4xl font-bold text-foreground/80">
              Como posso ajudar?
            </h1>
          </div>
        )}
        <div className="chat-container flex flex-col gap-6 overflow-y-auto px-4 py-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
          {isTyping && <TypingIndicator />}
        </div>
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </motion.main>
    </div>
  );
};

export default Index;