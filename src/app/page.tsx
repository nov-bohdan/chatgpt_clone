export const dynamic = "force-dynamic";
import ChatPanel from "@/components/Chat/ChatPanel";
import { ChatProvider } from "@/lib/context/ChatContext";

export default async function Page() {
  return (
    <ChatProvider initialMessages={null} initialChatId={null}>
      <ChatPanel />
    </ChatProvider>
  );
}
