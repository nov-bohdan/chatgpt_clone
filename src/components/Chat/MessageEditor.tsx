import { editMessage } from "@/lib/chats/actions";
import { handleStream } from "@/lib/chats/handleStream";
import { useChat } from "@/lib/context/ChatContext";
import { useModel } from "@/lib/context/ModelContext";
import { useSidebar } from "@/lib/context/SidebarContext";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";

export default function MessageEditor({
  message,
  chatId,
  messageId,
  setIsEditing,
}: {
  message: string;
  chatId: string;
  messageId: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {
  const { setMessagesState, setChatIdState } = useChat();
  const { selectedModel } = useModel();
  const [localMessage, setLocalMessage] = useState(message);

  const [state, action, pending] = useActionState(
    editMessage.bind(null, chatId, selectedModel),
    undefined
  );

  const { setChats } = useSidebar();

  useEffect(() => {
    handleStream(state, setChats, setChatIdState, setMessagesState);
  }, [state, setMessagesState, setChatIdState, setChats, setIsEditing]);

  return (
    <div className="bg-[#424242] rounded-2xl p-3">
      <form className="flex flex-col" action={action}>
        <input
          type="text"
          name="message"
          value={localMessage}
          onChange={(e) => setLocalMessage(e.target.value)}
          className="mb-4 bg-transparent outline-none"
          readOnly={pending}
        />
        <input type="hidden" value={messageId} name="messageId" />
        <div className="flex flex-row items-center justify-end gap-2">
          <button
            type="button"
            className="bg-[#212121] p-2 rounded-full text-white text-sm"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-white p-2 rounded-full text-gray-800 text-sm disabled:bg-opacity-20"
            disabled={pending}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
