import ShareIcon from "./icons/ShareIcon";

export default function TopPanel() {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      {/* LEFT */}
      <div className="">
        <p className="text-lg font-semibold cursor-pointer hover:bg-gray-500 hover:bg-opacity-10 p-2 rounded-lg text-[#b4b4b4]">
          ChatGPT 4o
        </p>
      </div>
      {/* RIGHT */}
      <div className="flex flex-row gap-2 items-center">
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
