"use client";
import ChatListSection from "./ChatListSection";
import TopSection from "./TopSection";
import { useSidebar } from "@/lib/context/SidebarContext";

const getDates = () => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return [today, yesterday];
};

export default function LeftPanel() {
  const { sidebarHidden, toggleSidebar, chats } = useSidebar();

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
    <>
      {/* HIDDEN SECTION */}
      <div
        className={`transition-all duration-300 ease-in-out h-screen flex-col text-[#ececec] absolute inset-0 hidden md:flex ${
          sidebarHidden
            ? "translate-x-0 shrink-1"
            : "-translate-x-full shrink-0"
        }`}
      >
        <TopSection setSidebarHidden={toggleSidebar} isCompact={true} />
      </div>

      <div
        className={`bg-[#171717] flex h-screen flex-col text-[#ececec] transition-all duration-300 ease-in-out absolute md:relative z-10 inset-0 overflow-y-scroll ${
          sidebarHidden
            ? "-translate-x-full overflow-hidden shrink-1 w-0 md:w-[100px]"
            : "translate-x-0 w-[80%] md:w-[260px] shrink-0"
        }`}
      >
        {/* TOP SECTION */}
        <TopSection setSidebarHidden={toggleSidebar} />
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
    </>
  );
}
