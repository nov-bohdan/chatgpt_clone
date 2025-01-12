"use client";

import { Dispatch, SetStateAction, useActionState, useState } from "react";
import AttachIcon from "./icons/AttachIcon";
import SendMessageIcon from "./icons/SendMessageIcon";
import ToolsIcon from "./icons/ToolsIcon";
import WebIcon from "./icons/WebIcon";
import { addNewMessage } from "@/lib/chats/actions";
import { useEffect } from "react";
import { useSidebar } from "@/lib/context/SidebarContext";
import { ChatModel, Message } from "@/lib/types";
import InputPanelIcon from "./InputPanelIcon";
import { handleStream } from "@/lib/chats/handleStream";
import { useModel } from "@/lib/context/ModelContext";

export default function InputPanel({
  chatId = null,
  setMessagesState,
  setChatIdState,
}: {
  chatId: string | null;
  setMessagesState: Dispatch<SetStateAction<Message[] | null>>;
  setChatIdState: Dispatch<SetStateAction<string | null>>;
}) {
  const addNewMessageWrapper = async (
    chatId: string | null,
    selectedModel: ChatModel | null,
    prevData: unknown,
    formData: FormData
  ) => {
    setMessagesState((oldMessages) => {
      const newMessage: Message = {
        id: "null",
        content: formData.get("message")?.toString() || "",
        role: "user",
      };
      if (!oldMessages) return [newMessage];
      return [...oldMessages, newMessage];
    });
    return addNewMessage(chatId, selectedModel, prevData, formData);
  };

  const { setChats } = useSidebar();
  const { selectedModel } = useModel();
  const [chatState, chatAction, chatPending] = useActionState(
    addNewMessageWrapper.bind(null, chatId, selectedModel),
    undefined
  );
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    handleStream(chatState, setChats, setChatIdState, setMessagesState);
  }, [chatState, setMessagesState, setChatIdState, setChats]);

  return (
    <div className="w-full md:mb-auto">
      {chatState && "error" in chatState && chatState.error}
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-transparent w-full outline-none"
            readOnly={chatPending}
          ></input>
        </div>
        {/* BOTTOM */}
        <div className="flex flex-row justify-between items-center">
          {/* LEFT */}
          <div className="flex flex-row gap-2">
            <InputPanelIcon>
              <AttachIcon />
            </InputPanelIcon>
            <InputPanelIcon>
              <ToolsIcon />
            </InputPanelIcon>
            <InputPanelIcon>
              <WebIcon />
            </InputPanelIcon>
          </div>
          {/* RIGHT */}
          <div className="">
            <button
              className="flex w-8 h-8 rounded-full bg-white cursor-pointer text-black hover:opacity-70 disabled:opacity-10"
              type="submit"
              disabled={chatPending || !inputValue}
            >
              <SendMessageIcon />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
