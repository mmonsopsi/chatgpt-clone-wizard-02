import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChatMessageProps {
  content: string;
  role: "user" | "assistant";
}

export const ChatMessage = ({ content, role }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "mx-auto flex w-full max-w-4xl px-4",
        role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "message-content max-w-[85%]",
          role === "user" ? "user-message" : "assistant-message"
        )}
      >
        {content}
      </div>
    </motion.div>
  );
};