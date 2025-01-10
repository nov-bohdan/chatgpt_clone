export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

export type Chat = {
  id: string;
  title: string;
  messages?: Message[];
  date: Date;
};

export type StreamType =
  | {
      stream: ReadableStream;
      messages: Message[];
      chatId: string;
    }
  | {
      error: string;
    }
  | undefined;
