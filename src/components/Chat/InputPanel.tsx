"use client";

import { useActionState } from "react";
import AttachIcon from "./icons/AttachIcon";
import SendMessageIcon from "./icons/SendMessageIcon";
import ToolsIcon from "./icons/ToolsIcon";
import WebIcon from "./icons/WebIcon";
import { addNewMessage, createChat } from "@/lib/chats/actions";

export default function InputPanel({ chatId }: { chatId: string | undefined }) {
  const [newChatState, newChatAction, newChatPending] = useActionState(
    createChat,
    undefined
  );
  const [existingChatState, existingChatAction, existingChatPending] =
    useActionState(addNewMessage.bind(null, chatId), undefined);
  const pending = newChatPending || existingChatPending;
  return (
    <div className="w-full">
      {newChatState?.error && newChatState.error}
      {existingChatState?.error && existingChatState.error}
      <form
        action={chatId ? existingChatAction : newChatAction}
        className="p-3 bg-[#2f2f2f] w-[65%] flex flex-col gap-4 rounded-3xl mx-auto"
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
