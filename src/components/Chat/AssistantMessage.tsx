import ChatControlPanel from "./ChatControlPanel";
import ChatGPTIcon from "./icons/ChatGPTIcon";

export default function AssistantMessage({
  message,
  isLast,
  isError = false,
}: {
  message: string;
  isLast: boolean;
  isError?: boolean;
}) {
  return (
    <div className="group flex flex-row gap-4 rounded-3xl">
      <span className="p-1.5 border-gray-400 border-opacity-30 border-[1px] h-fit rounded-full">
        <ChatGPTIcon />
      </span>
      <div className="flex flex-col gap-3">
        <p className={isError ? "text-red-500" : ""}>{message}</p>
        <ChatControlPanel
          styles={`${isLast ? "visible" : "invisible group-hover:visible"}`}
        />
      </div>
    </div>
  );
}
