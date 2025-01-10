import { redirect } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { StreamType, Chat, Message } from "../types";
import { getChatList } from "./actions";

export const handleStream = async (
  state: StreamType,
  setChats: Dispatch<SetStateAction<Chat[]>>,
  setChatIdState: (value: SetStateAction<string | null>) => void,
  setMessagesState: (value: SetStateAction<Message[] | null>) => void
) => {
  if (!state || !("stream" in state)) {
    return;
  }

  const reader = state.stream.getReader();
  if (!reader) return;
  const decoder = new TextDecoder();

  const oldMessages = state.messages!;
  const lastMessage = { ...oldMessages[oldMessages.length - 1] };
  setChatIdState(state.chatId);
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      reader.releaseLock();
      break;
    }
    const content = decoder.decode(value);
    lastMessage.content += content;
    const newMessages = [...oldMessages.slice(0, -1), lastMessage];
    setMessagesState(newMessages);
  }
  if (window.location.pathname !== `/c/${state.chatId}`) {
    const chats = await getChatList();
    setChats(chats);
    redirect(`/c/${state.chatId}`);
  }
};
