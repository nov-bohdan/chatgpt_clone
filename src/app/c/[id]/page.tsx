import ChatPanel from "@/components/Chat/ChatPanel";
import { getChatMessages } from "@/lib/chats/data";
import { ChatProvider } from "@/lib/context/ChatContext";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const chatId = (await params).id;
  const messages = await getChatMessages(chatId);
  return (
    <ChatProvider initialMessages={messages} initialChatId={chatId}>
      <ChatPanel />;
    </ChatProvider>
  );
}
