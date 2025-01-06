"use server";
import { getChats } from "@/lib/chats/data";
import NewChatIcon from "./icons/NewChatIcon";
import SearchIcon from "./icons/SearchIcon";
import SplitPanelIcon from "./icons/SplitPanelIcon";
import ChatListSection from "./ChatListSection";
import Link from "next/link";

const getDates = () => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return [today, yesterday];
};

export default async function LeftPanel() {
  const chats = await getChats();

  const [today, yesterday] = getDates();
  const todayChats = chats.filter((chat) => {
    const chatDate = new Date(chat.date);
    chatDate.setUTCHours(0, 0, 0, 0);
    return chatDate.getTime() === today.getTime();
  });
  const yesterdayChats = chats.filter((chat) => {
    const chatDate = new Date(chat.date);
    chatDate.setUTCHours(0, 0, 0, 0);
    return chatDate.getTime() === yesterday.getTime();
  });
  const olderChats = chats.filter((chat) => {
    const chatDate = new Date(chat.date);
    chatDate.setUTCHours(0, 0, 0, 0);
    return chatDate.getTime() < yesterday.getTime();
  });

  return (
    <div className="bg-[#171717] flex w-[260px] h-screen flex-col text-[#ececec]">
      {/* TOP SECTION */}
      <div className="flex flex-row p-2 justify-between items-center w-full text-[#b4b4b4]">
        {/* LEFT */}
        <div className="">
          <span className="cursor-pointer hover:bg-gray-500 hover:bg-opacity-10 p-2 block rounded-lg">
            <SplitPanelIcon className="w-6 h-6" />
          </span>
        </div>
        {/* RIGHT */}
        <div className="flex flex-row ">
          <span className="cursor-pointer hover:bg-gray-500 hover:bg-opacity-10 p-2 block rounded-lg">
            <SearchIcon className="w-6 h-6" />
          </span>
          <Link href="/">
            <span className="cursor-pointer hover:bg-gray-500 hover:bg-opacity-10 p-2 block rounded-lg">
              <NewChatIcon className="w-6 h-6" />
            </span>
          </Link>
        </div>
      </div>
      {/* CHATS */}
      {/* DATE SECTIONS */}
      <div className="flex flex-col gap-4 px-2">
        {todayChats.length > 0 && (
          <ChatListSection chats={todayChats} header="Today" />
        )}
        {yesterdayChats.length > 0 && (
          <ChatListSection chats={yesterdayChats} header="Yesterday" />
        )}
        {olderChats.length > 0 && (
          <ChatListSection chats={olderChats} header="Older than 3 days" />
        )}
      </div>
    </div>
  );
}
