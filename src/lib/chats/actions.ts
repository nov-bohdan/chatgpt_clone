"use server";

import { redirect } from "next/navigation";
import { createNewChat, getChatMessages, newMessage } from "./data";
import { revalidatePath } from "next/cache";
import { getAnswer, getStreamedAnswer } from "../openai/openai";
import { Updater } from "./chunksMessageUpdater";

async function processStream(chatId: string) {
  let messages = [];
  const returnedStream = new TransformStream();
  const writer = returnedStream.writable.getWriter();

  let completeAnswer = "";
  const newAssistantMessage = await newMessage("", chatId, "assistant");
  messages = await getChatMessages(chatId);

  (async () => {
    const streamedAnswer = await getStreamedAnswer(messages);
    const encoder = new TextEncoder();
    Updater.startUpdating(newAssistantMessage.id);
    for await (const chunk of streamedAnswer) {
      const content = chunk.choices[0]?.delta?.content || undefined;
      if (!content) continue;
      completeAnswer += content;
      Updater.addInQueue(completeAnswer);

      try {
        await writer.write(encoder.encode(content));
      } catch {}
    }
    console.log(`Complete answer: ${completeAnswer}`);
    Updater.stopUpdating();
    try {
      await writer.close();
    } catch {}
  })();

  return { stream: returnedStream.readable, messages, chatId };
}

export async function createChat(prevData: unknown, formData: FormData) {
  const message = formData.get("message")?.toString();
  if (!message) return { error: "No message" };
  const newChat = await createNewChat(message);
  await newMessage(message, newChat.id);
  revalidatePath(`/`);
  return processStream(newChat.id);
}

export async function addNewMessage(
  chatId: string | undefined,
  prevData: unknown,
  formData: FormData
) {
  const message = formData.get("message")?.toString();
  if (!message) return { error: "No message" };
  if (!chatId) {
    const newChat = await createNewChat(message);
    chatId = newChat.id;
  }
  await newMessage(message, chatId, "user");
  revalidatePath(`/c/${chatId}`);
  revalidatePath(`/`);
  return processStream(chatId);
}
