import CheckmarkIcon from "@/components/icons/CheckMarkIcon";

export default function Model({
  modelName,
  description,
  isSelected = false,
  onSelect,
}: {
  modelName: string;
  description: string;
  isSelected?: boolean;
  onSelect: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  return (
    <div
      className="flex flex-row items-center justify-between hover:bg-[#f5f5f5] hover:bg-opacity-20 rounded-md p-2 cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex flex-col gap-1">
        <p className="text-sm">{modelName}</p>
        <p className="text-xs font-light">{description}</p>
      </div>
      {isSelected && <CheckmarkIcon className="text-white" />}
    </div>
  );
}
