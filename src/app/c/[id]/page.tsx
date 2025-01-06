"use server";

import ChatPanel from "@/components/Chat/ChatPanel";
import { getChatMessages } from "@/lib/chats/data";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const chatId = (await params).id;
  const messages = await getChatMessages(chatId);
  return <ChatPanel messages={messages} chatId={chatId} />;
}
