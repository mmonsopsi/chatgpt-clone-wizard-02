import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { motion } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const simulateResponse = async (userMessage: string) => {
    setIsTyping(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `I received your message: "${userMessage}". This is a simulated response. To make this chatbot functional, you'll need to integrate it with an AI service like OpenAI's API.`,
      },
    ]);
    setIsTyping(false);
  };

  const handleSendMessage = async (content: string) => {
    setMessages((prev) => [...prev, { role: "user", content }]);
    await simulateResponse(content);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <motion.main 
        className="flex-1 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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