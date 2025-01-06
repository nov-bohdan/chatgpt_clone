import { Chat } from "@/lib/types";
import Link from "next/link";

export default function ChatListSection({
  chats,
  header,
}: {
  chats: Chat[];
  header: string;
}) {
  return (
    <div className="flex flex-col">
      <h3 className="text-xs font-semibold px-2 mb-2">{header}</h3>
      {chats.map((chat) => {
        return (
          <div key={chat.id} className="">
            <div className="flex flex-col gap-2">
              <Link href={`/c/${chat.id}`}>
                <div
                  className="text-sm cursor-pointer hover:bg-gray-500 hover:bg-opacity-10 p-2 rounded-lg truncate"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to right, black 60%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to right, black 60%, transparent 100%)",
                  }}
                >
                  {chat.title}
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
