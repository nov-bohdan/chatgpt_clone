import OpenAI from "openai";
import { Message } from "../types";
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function getAnswer(messages: Message[]) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    temperature: 0.8,
  });
  return completion.choices[0].message;
}

export async function getStreamedAnswer(messages: Message[]) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    temperature: 0.8,
    stream: true,
  });

  return completion;
}
