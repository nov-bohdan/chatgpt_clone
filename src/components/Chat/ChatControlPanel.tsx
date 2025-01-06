import ChatControlIcon from "./ChatControlIcon";
import CopyIcon from "./icons/CopyIcon";
import DislikeIcon from "./icons/DislikeIcon";
import LikeIcon from "./icons/LikeIcon";
import ReadAloudIcon from "./icons/ReadAloudIcon";
import SwitchModelIcon from "./icons/SwitchModelIcon";

export default function ChatControlPanel({ styles }: { styles: string }) {
  return (
    <div className={`${styles}`}>
      <ChatControlIcon>
        <ReadAloudIcon />
      </ChatControlIcon>
      <ChatControlIcon>
        <CopyIcon />
      </ChatControlIcon>
      <ChatControlIcon>
        <LikeIcon />
      </ChatControlIcon>
      <ChatControlIcon>
        <DislikeIcon />
      </ChatControlIcon>
      <ChatControlIcon>
        <SwitchModelIcon />
      </ChatControlIcon>
    </div>
  );
}
