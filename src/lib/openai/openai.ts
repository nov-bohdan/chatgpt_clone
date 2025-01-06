import OpenAI from "openai";
import { Message } from "../types";
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function getAnswer(messages: Message[]) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
  });

  return completion.choices[0].message;
}
