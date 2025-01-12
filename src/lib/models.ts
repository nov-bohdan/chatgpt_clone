type ChatModelsType = {
  [key: string]: {
    apiName: string;
    modelName: string;
    description: string;
  };
};

export const chatModels: ChatModelsType = {
  "gpt-4o": {
    apiName: "gpt-4o",
    modelName: "GPT-4o",
    description: "Great for most tasks",
  },
  o1: {
    apiName: "o1",
    modelName: "o1",
    description: "Uses advanced reasoning",
  },
  "o1-mini": {
    apiName: "o1-mini",
    modelName: "o1-mini",
    description: "Faster at reasoning",
  },
};
