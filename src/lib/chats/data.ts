import { Chat } from "../types";
import { mockChats } from "./mockChats";

export async function getChats(): Promise<Chat[]> {
  return mockChats.map((chat) => ({
    id: chat.id,
    title: chat.title,
    date: chat.date,
  }));
}

export async function getChat(id: number): Promise<Chat | undefined> {
  const chat: Chat | undefined = mockChats.find((chat) => chat.id === id);
  return chat;
}
