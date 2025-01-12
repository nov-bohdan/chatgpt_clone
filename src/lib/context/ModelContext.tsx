"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ChatModel } from "../types";

type ModelContextType = {
  selectedModel: ChatModel | null;
  setSelectedModel: Dispatch<SetStateAction<ChatModel | null>>;
};

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider({
  children,
  initialModel = null,
}: {
  children: React.ReactNode;
  initialModel?: ChatModel | null;
}) {
  const [selectedModel, setSelectedModel] = useState<ChatModel | null>(
    initialModel
  );

  return (
    <ModelContext.Provider value={{ selectedModel, setSelectedModel }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModel() {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  return context;
}
