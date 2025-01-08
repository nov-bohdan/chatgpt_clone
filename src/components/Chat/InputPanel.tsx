"use client";

import { useActionState } from "react";
import AttachIcon from "./icons/AttachIcon";
import SendMessageIcon from "./icons/SendMessageIcon";
import ToolsIcon from "./icons/ToolsIcon";
import WebIcon from "./icons/WebIcon";
import { addNewMessage, createChat, getChatList } from "@/lib/chats/actions";
import { useEffect } from "react";
import { Message } from "@/lib/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { useSidebar } from "@/lib/context/SidebarContext";

export default function InputPanel({
  chatId,
  setMessagesState,
  setChatIdState,
}: {
  chatId: string | undefined;
  setMessagesState: any;
  setChatIdState: any;
}) {
  const { setChats } = useSidebar();
  const [chatState, chatAction, chatPending] = useActionState(
    addNewMessage.bind(null, chatId),
    undefined
  );
  const pending = chatPending;

  useEffect(() => {
    const handleStream = async (state: typeof chatState) => {
      if (!state || !("stream" in state)) {
        return;
      }

      const reader = state.stream.getReader();
      if (!reader) return;
      const decoder = new TextDecoder();

      const oldMessages = state.messages!;
      const lastMessage = { ...oldMessages[oldMessages.length - 1] };
      setChatIdState(state.chatId);
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          reader.releaseLock();
          break;
        }
        const content = decoder.decode(value);
        lastMessage.content += content;
        const newMessages = [...oldMessages.slice(0, -1), lastMessage];
        setMessagesState(newMessages);
        if (window.location.pathname !== `/c/${state.chatId}`) {
          const chats = await getChatList();
          setChats(chats);
          redirect(`/c/${state.chatId}`);
        }
      }
    };

    handleStream(chatState);
  }, [chatState, setMessagesState, setChatIdState]);

  return (
    <div className="w-full">
      {chatState && "error" in chatState && chatState.error}
      {/* {newChatState?.error && newChatState.error} */}
      {/* {existingChatState?.error && existingChatState.error} */}
      <form
        action={chatAction}
        className="p-3 bg-[#2f2f2f] w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] flex flex-col gap-4 rounded-3xl mx-auto"
      >
        {/* TOP */}
        <div className="">
          <input
            type="text"
            name="message"
            placeholder="Message ChatGPT"
            className="bg-transparent w-full outline-none"
            readOnly={pending}
          ></input>
        </div>
        {/* BOTTOM */}
        <div className="flex flex-row justify-between items-center">
          {/* LEFT */}
          <div className="flex flex-row gap-2">
            <span className="flex h-8 min-w-8 items-center justify-center rounded-lg p-1 text-xs font-semibold hover:bg-black/10 focus-visible:outline-black dark:focus-visible:outline-white cursor-pointer">
              <AttachIcon />
            </span>
            <span className="flex h-8 min-w-8 items-center justify-center rounded-lg p-1 text-xs font-semibold hover:bg-black/10 focus-visible:outline-black dark:focus-visible:outline-white cursor-pointer">
              <ToolsIcon />
            </span>
            <span className="flex h-8 min-w-8 items-center justify-center rounded-lg p-1 text-xs font-semibold hover:bg-black/10 focus-visible:outline-black dark:focus-visible:outline-white cursor-pointer">
              <WebIcon />
            </span>
          </div>
          {/* RIGHT */}
          <div className="">
            <button
              className="flex w-8 h-8 rounded-full bg-white cursor-pointer text-black hover:opacity-70 disabled:opacity-10"
              type="submit"
              disabled={pending}
            >
              <SendMessageIcon />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
