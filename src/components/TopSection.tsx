import Link from "next/link";
import NewChatIcon from "./icons/NewChatIcon";
import SearchIcon from "./icons/SearchIcon";
import SplitPanelIcon from "./icons/SplitPanelIcon";

export default function TopSection({
  setSidebarHidden,
  isCompact = false,
}: {
  setSidebarHidden: () => void;
  isCompact?: boolean;
}) {
  return (
    <>
      {/* TOP SECTION */}
      <div
        className={`flex flex-row p-2 items-center w-full text-[#b4b4b4] ${
          isCompact ? "justify-start" : "justify-between"
        }`}
      >
        {/* LEFT */}
        <div className="">
          <span
            className="cursor-pointer hover:bg-gray-500 hover:bg-opacity-10 p-2 block rounded-lg"
            onClick={setSidebarHidden}
          >
            <SplitPanelIcon className="w-6 h-6" />
          </span>
        </div>
        {/* RIGHT */}
        <div className="flex flex-row ">
          {!isCompact && (
            <span className="cursor-pointer hover:bg-gray-500 hover:bg-opacity-10 p-2 block rounded-lg">
              <SearchIcon className="w-6 h-6" />
            </span>
          )}
          <Link href="/new_chat">
            <span className="cursor-pointer hover:bg-gray-500 hover:bg-opacity-10 p-2 block rounded-lg">
              <NewChatIcon className="w-6 h-6" />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
