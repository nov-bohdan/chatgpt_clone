"use client";
import Link from "next/link";
import NewChatIcon from "../icons/NewChatIcon";
import SplitPanelIcon from "../icons/SplitPanelIcon";
import ShareIcon from "./icons/ShareIcon";
import { useSidebar } from "@/lib/context/SidebarContext";

export default function TopPanel() {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="flex flex-row justify-between items-center w-full">
      {/* LEFT */}
      <div className="flex flex-row justify-between w-full text-[#b4b4b4]">
        <span
          className="cursor-pointer hover:bg-gray-500 hover:bg-opacity-10 p-2 block md:hidden rounded-lg"
          onClick={toggleSidebar}
        >
          <SplitPanelIcon className="w-6 h-6" />
        </span>
        <p className="text-lg font-semibold cursor-pointer hover:bg-gray-500 hover:bg-opacity-10 p-2 rounded-lg">
          ChatGPT 4o
        </p>
        <Link href="/" className="block md:hidden">
          <span className="cursor-pointer hover:bg-gray-500 hover:bg-opacity-10 p-2 block rounded-lg">
            <NewChatIcon className="w-6 h-6" />
          </span>
        </Link>
      </div>
      {/* RIGHT */}
      <div className="hidden md:flex flex-row gap-2 items-center">
        {/* SHARE ICON */}
        <div className="flex flex-row justify-between items-center gap-1.5 rounded-full border-[1px] border-gray-100 border-opacity-20 py-2 px-4 text-sm">
          <span>
            <ShareIcon className="w-4 h-4" />
          </span>
          <span>Share</span>
        </div>
        {/* USER ICON */}
        <div className="flex justify-center items-center rounded-full w-3 h-3 p-4 bg-red-500">
          <span>LI</span>
        </div>
      </div>
    </div>
  );
}
