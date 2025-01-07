"use client";

import { Message } from "@/lib/types";
import InputPanel from "./InputPanel";
import MessageHistory from "./MessageHistory";
import TopPanel from "./TopPanel";
import { useState } from "react";

export default function ChatPanel({
  messages,
  chatId,
}: {
  messages: Message[] | undefined;
  chatId: string | undefined;
}) {
  const [messagesState, setMessagesState] = useState<Message[] | undefined>(
    messages
  );

  return (
    <div className="text-[#ececec] px-4 pt-2 pb-1 w-full h-screen flex flex-col items-center relative">
      <TopPanel />
      {messages && <MessageHistory messages={messagesState} />}
      <div
        className={`flex flex-col w-full items-center gap-2 ${
          messages
            ? "mt-auto mb-2"
            : "absolute top-1/2 left-1/2 -translate-x-1/2"
        }`}
      >
        {!messages && <h2 className="text-4xl">What can I help with? </h2>}
        <InputPanel chatId={chatId} setMessagesState={setMessagesState} />
      </div>
      <p className={`text-xs text-gray-400 mb-1 ${!messages && "mt-auto"}`}>
        ChatGPT can make mistakes. Check important info.
      </p>
    </div>
  );
}
