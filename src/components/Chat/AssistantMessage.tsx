import ChatControlPanel from "./ChatControlPanel";
import ChatGPTIcon from "./icons/ChatGPTIcon";

export default function UserMessage({
  message,
  isLast,
}: {
  message: string;
  isLast: boolean;
}) {
  return (
    <div className="group flex flex-row gap-4 rounded-3xl">
      <span className="p-1.5 border-gray-400 border-opacity-30 border-[1px] h-fit rounded-full">
        <ChatGPTIcon />
      </span>
      <div className="flex flex-col gap-3">
        {message}
        <ChatControlPanel
          styles={`${isLast ? "visible" : "invisible group-hover:visible"}`}
        />
      </div>
    </div>
  );
}
