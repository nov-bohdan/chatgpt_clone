import { editMessage } from "@/lib/chats/actions";
import { handleStream } from "@/lib/chats/handleStream";
import { useSidebar } from "@/lib/context/SidebarContext";
import { Message } from "@/lib/types";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";

export default function MessageEditor({
  message,
  chatId,
  messageId,
  setMessagesState,
  setChatIdState,
}: {
  message: string;
  chatId: string;
  messageId: string;
  setMessagesState: Dispatch<SetStateAction<Message[] | null>>;
  setChatIdState: Dispatch<SetStateAction<string | null>>;
}) {
  const [state, action] = useActionState(
    editMessage.bind(null, chatId),
    undefined
  );

  const { setChats } = useSidebar();

  useEffect(() => {
    handleStream(state, setChats, setChatIdState, setMessagesState);
  }, [state, setMessagesState, setChatIdState, setChats]);

  return (
    <div className="bg-[#424242] rounded-2xl p-3">
      <form className="flex flex-col" action={action}>
        <input
          type="text"
          name="message"
          defaultValue={message}
          className="mb-4 bg-transparent outline-none"
        />
        <input type="hidden" value={messageId} name="messageId" />
        <div className="flex flex-row items-center justify-end gap-2">
          <button className="bg-[#212121] p-2 rounded-full text-white text-sm">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-white p-2 rounded-full text-gray-800 text-sm"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
