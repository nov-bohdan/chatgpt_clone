import { useModel } from "@/lib/context/ModelContext";
import InfoIcon from "../../icons/InfoIcon";
import Model from "./Model";
import { chatModels } from "@/lib/models";
import { ChatModel } from "@/lib/types";

export default function ModelSelector({ onClose }: { onClose: () => void }) {
  const { selectedModel, setSelectedModel } = useModel();

  const handleSetModel = (model: ChatModel) => {
    setSelectedModel(model);
  };

  return (
    <div className="rounded-xl w-[340px] py-4 bg-[#2f2f2f] border-[1px] border-white border-opacity-10 flex flex-col gap-2 absolute top-full left-0 mt-2">
      {/* HEADER */}
      <div className="flex flex-row items-center justify-between text-sm font-light px-4">
        <p>Model</p>
        <InfoIcon />
      </div>
      {/* MODELS */}
      <div className="px-2">
        {Object.keys(chatModels).map((modelName) => {
          return (
            <Model
              key={chatModels[modelName].apiName}
              modelName={chatModels[modelName].modelName}
              description={chatModels[modelName].description}
              isSelected={
                chatModels[modelName].apiName === selectedModel?.apiName
              }
              onSelect={() => {
                handleSetModel(chatModels[modelName]);
                onClose();
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
