"use server";

import { createNewChat, getChatMessages, getChats, newMessage } from "./data";
import { revalidatePath } from "next/cache";
import { getStreamedAnswer } from "../openai/openai";
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
    Updater.stopUpdating();
    try {
      await writer.close();
      revalidatePath(`/c/${chatId}`);
      revalidatePath(`/`);
    } catch {}
  })();

  return { stream: returnedStream.readable, messages, chatId };
}

export async function addNewMessage(
  chatId: string | null,
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
  return processStream(chatId);
}

export async function getChatList() {
  const data = await getChats();
  return data;
}
