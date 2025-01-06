import ChatPanel from "@/components/Chat/ChatPanel";
import LeftPanel from "@/components/LeftPanel";
import { getChat } from "@/lib/chats/data";

export default async function Page() {
  const currentChat = await getChat(1);
  return (
    <div className="flex flex-row">
      <LeftPanel />
      {currentChat && <ChatPanel chat={currentChat} />}
    </div>
  );
}
