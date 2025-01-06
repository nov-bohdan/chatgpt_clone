import AttachIcon from "./icons/AttachIcon";
import SendMessageIcon from "./icons/SendMessageIcon";
import ToolsIcon from "./icons/ToolsIcon";
import WebIcon from "./icons/WebIcon";

export default function InputPanel() {
  return (
    <div className="p-3 bg-[#2f2f2f] w-[65%] flex flex-col gap-4 mt-auto rounded-3xl">
      {/* TOP */}
      <div className="">
        <input
          type="text"
          name="message"
          placeholder="Message ChatGPT"
          className="bg-transparent w-full outline-none"
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
          <span className="w-8 h-8 block rounded-full bg-white cursor-pointer text-black hover:opacity-70">
            <SendMessageIcon />
          </span>
        </div>
      </div>
    </div>
  );
}
