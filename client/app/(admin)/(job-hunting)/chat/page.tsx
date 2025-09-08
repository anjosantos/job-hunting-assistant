"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {messages.map((message) => (
        <div>
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, index) =>
            part.type === "text" ? <span key={index}>{part.text}</span> : null
          )}
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput("");
          }
        }}
      >
        <div className="space-y-4">
          <div>
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter message here"
            />
          </div>

          <div className="flex justify-end">
            <Button size="sm" variant="primary" type="submit">
              Send
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
