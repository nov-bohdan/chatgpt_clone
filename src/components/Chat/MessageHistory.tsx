"use client";
import { Message } from "@/lib/types";
import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";
import { useEffect, useRef } from "react";

export default function MessageHistory({
  messages = [],
}: {
  messages: Message[] | undefined;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-[65%] flex flex-col gap-4 h-[80%] overflow-y-scroll">
      {messages.map((message, idx) =>
        message.role === "user" ? (
          <UserMessage key={message.id} message={message.content} />
        ) : (
          <AssistantMessage
            key={message.id}
            message={message.content}
            isLast={idx >= messages.length - 2}
          />
        )
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
