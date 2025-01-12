import OpenAI from "openai";
import { ChatModel, Message } from "../types";
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

function isOpenAIError(
  error: unknown
): error is { error: { message: string } } {
  return (
    typeof error === "object" &&
    error !== null &&
    "error" in error &&
    typeof (error as { error: { message: unknown } }).error.message === "string"
  );
}

export async function getAnswer(messages: Message[]) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    temperature: 0.8,
  });
  return completion.choices[0].message;
}

export async function getStreamedAnswer(messages: Message[], model: ChatModel) {
  try {
    const completion = await openai.chat.completions.create({
      model: model.apiName,
      messages,
      temperature: 0.8,
      stream: true,
    });

    return completion;
  } catch (error) {
    if (isOpenAIError(error)) {
      throw new Error(error.error.message);
    } else {
      throw new Error("Unknown error occured in getting streamed answer");
    }
  }
}
