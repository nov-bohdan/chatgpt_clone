import { Dispatch, SetStateAction, useState } from "react";
import EditIcon from "./icons/EditIcon";
import MessageEditor from "./MessageEditor";
import { Message } from "@/lib/types";

export default function UserMessage({
  message,
  chatId,
  messageId,
  setMessagesState,
  setChatIdState,
}: {
  message: string;
  chatId: string | null;
  messageId: string;
  setMessagesState: Dispatch<SetStateAction<Message[] | null>>;
  setChatIdState: Dispatch<SetStateAction<string | null>>;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return isEditing && chatId ? (
    <MessageEditor
      message={message}
      chatId={chatId}
      messageId={messageId}
      setMessagesState={setMessagesState}
      setChatIdState={setChatIdState}
    />
  ) : (
    <div className="group flex flex-row gap-3 items-start max-w-[60%] ml-auto justify-end">
      <span onClick={() => setIsEditing(true)}>
        <EditIcon className="invisible group-hover:visible cursor-pointer mt-4 shrink-0 w-5 h-5" />
      </span>
      <div className="bg-[#323232D9] p-4 rounded-3xl">{message}</div>
    </div>
  );
}
