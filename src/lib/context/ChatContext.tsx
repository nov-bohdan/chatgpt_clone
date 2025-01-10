"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Message } from "../types";

type ChatContextType = {
  messagesState: Message[] | null;
  setMessagesState: Dispatch<SetStateAction<Message[] | null>>;
  chatIdState: string | null;
  setChatIdState: Dispatch<SetStateAction<string | null>>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({
  children,
  initialMessages,
  initialChatId,
}: {
  children: React.ReactNode;
  initialMessages: Message[] | null;
  initialChatId: string | null;
}) {
  const [messagesState, setMessagesState] = useState<Message[] | null>(
    initialMessages
  );
  const [chatIdState, setChatIdState] = useState<string | null>(initialChatId);

  return (
    <ChatContext.Provider
      value={{ messagesState, setMessagesState, chatIdState, setChatIdState }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }

  return context;
}
