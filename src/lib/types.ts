export type Message = {
  id: number;
  content: string;
  role: "user" | "assistant";
};

export type Chat = {
  id: number;
  title: string;
  messages?: Message[];
  date: Date;
};
