"use client";

import { Message } from "@/lib/types";
import InputPanel from "./InputPanel";
import MessageHistory from "./MessageHistory";
import TopPanel from "./TopPanel";
import { useState } from "react";

export default function ChatPanel({
  messages = null,
  chatId = null,
}: {
  messages: Message[] | null;
  chatId?: string | null;
}) {
  const [messagesState, setMessagesState] = useState<Message[] | null>(
    messages
  );
  const [chatIdState, setChatIdState] = useState<string | null>(chatId);

  // useEffect(() => {
  //   setMessagesState(messages);
  // }, [messages]);

  // useEffect(() => {
  //   setChatIdState(chatId);
  // }, [chatId]);

  return (
    <div className="text-[#ececec] px-4 pt-2 pb-1 w-full h-screen flex flex-col items-center relative">
      <TopPanel />
      {messagesState && <MessageHistory messages={messagesState} />}
      <div
        className={`flex flex-col w-full items-center gap-2 ${
          messagesState
            ? "mt-auto mb-2"
            : "absolute top-1/2 left-1/2 -translate-x-1/2"
        }`}
      >
        {!messagesState && <h2 className="text-4xl">What can I help with? </h2>}
        <InputPanel
          chatId={chatIdState}
          setMessagesState={setMessagesState}
          setChatIdState={setChatIdState}
        />
      </div>
      <p
        className={`text-xs text-gray-400 mb-1 ${!messagesState && "mt-auto"}`}
      >
        ChatGPT can make mistakes. Check important info.
      </p>
    </div>
  );
}
