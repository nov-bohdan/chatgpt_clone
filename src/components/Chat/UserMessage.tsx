import EditIcon from "./icons/EditIcon";

export default function UserMessage({ message }: { message: string }) {
  return (
    <div className="group flex flex-row gap-3 items-start max-w-[60%] ml-auto justify-end">
      <EditIcon className="invisible group-hover:visible cursor-pointer mt-4 shrink-0 w-5 h-5" />
      <div className="bg-[#323232D9] p-4 rounded-3xl">{message}</div>
    </div>
  );
}
