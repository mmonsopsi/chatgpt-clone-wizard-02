import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { motion } from "framer-motion";
import { ApiKeyForm } from "@/components/ApiKeyForm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [model, setModel] = useState<string>("");

  const simulateResponse = async (userMessage: string) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `Recebi sua mensagem usando o modelo ${model}: "${userMessage}". Esta é uma resposta simulada. Para tornar este chatbot funcional, você precisará integrá-lo com a API da OpenAI.`,
      },
    ]);
    setIsTyping(false);
  };

  const handleSendMessage = async (content: string) => {
    setMessages((prev) => [...prev, { role: "user", content }]);
    await simulateResponse(content);
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