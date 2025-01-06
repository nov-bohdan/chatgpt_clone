import { Chat } from "@/lib/types";
import InputPanel from "./InputPanel";
import MessageHistory from "./MessageHistory";
import TopPanel from "./TopPanel";

export default function ChatPanel({ chat }: { chat: Chat }) {
  return (
    <div className="text-[#ececec] px-4 pt-2 pb-1 w-full flex flex-col items-center">
      <TopPanel />
      <MessageHistory messages={chat.messages} />
      <div className="flex flex-col justify-between w-full items-center mt-auto gap-2">
        <InputPanel />
        <p className="text-xs text-gray-400">
          ChatGPT can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}
