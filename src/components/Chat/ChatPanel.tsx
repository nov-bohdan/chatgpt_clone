"use client";

import InputPanel from "./InputPanel";
import MessageHistory from "./MessageHistory";
import TopPanel from "./TopPanel";
import { useChat } from "@/lib/context/ChatContext";

export default function ChatPanel({}) {
  const { messagesState, setMessagesState, chatIdState, setChatIdState } =
    useChat();

  return (
    <div className="text-[#ececec] px-4 pt-0 pb-1 w-full min-h-[100dvh] max-h-[100dvh] flex flex-col items-center justify-between relative overflow-y-auto">
      <TopPanel />
      {messagesState && (
        <MessageHistory messages={messagesState} chatId={chatIdState} />
      )}
      <div
        className={`flex flex-col w-full items-center gap-2 flex-1 justify-center `}
      >
        {!messagesState && (
          <h2 className="text-4xl mt-auto mb-auto md:mb-0">
            What can I help with?
          </h2>
        )}
        <InputPanel
          chatId={chatIdState}
          setMessagesState={setMessagesState}
          setChatIdState={setChatIdState}
        />
      </div>
      <p className={`text-xs text-gray-400 p-2 ${!messagesState && "mt-auto"}`}>
        ChatGPT can make mistakes. Check important info.
      </p>
    </div>
  );
}
