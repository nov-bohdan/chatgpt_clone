import { Message } from "@/lib/types";
import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";

export default function MessageHistory({
  messages = [],
}: {
  messages: Message[] | undefined;
}) {
  return (
    <div className="w-[65%] flex flex-col gap-4">
      {messages.map((message, idx) =>
        message.role === "user" ? (
          <UserMessage key={message.id} message={message.content} />
        ) : (
          <AssistantMessage
            key={message.id}
            message={message.content}
            isLast={idx >= messages.length - 2}
          />
        )
      )}
    </div>
  );
}
