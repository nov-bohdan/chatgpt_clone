"use server";

import {
  createNewChat,
  deleteMessages,
  getChatMessages,
  getChats,
  newMessage,
} from "./data";
import { revalidatePath } from "next/cache";
import { getStreamedAnswer } from "../openai/openai";
import { Updater } from "./chunksMessageUpdater";
import { ChatModel } from "../types";

async function processStream(chatId: string, selectedModel: ChatModel) {
  let messages = [];
  const returnedStream = new TransformStream();
  const writer = returnedStream.writable.getWriter();

  let completeAnswer = "";
  const newAssistantMessage = await newMessage("", chatId, "assistant");
  messages = await getChatMessages(chatId);

  (async () => {
    const encoder = new TextEncoder();
    try {
      const streamedAnswer = await getStreamedAnswer(messages, selectedModel);
      Updater.startUpdating(newAssistantMessage.id);
      for await (const chunk of streamedAnswer) {
        const content = chunk.choices[0]?.delta?.content || undefined;
        if (!content) continue;
        completeAnswer += content;
        Updater.addInQueue(completeAnswer);

        try {
          await writer.write(
            encoder.encode(JSON.stringify({ type: "content", content }))
          );
        } catch {}
      }
      Updater.stopUpdating();
      try {
        await writer.close();
        revalidatePath(`/c/${chatId}`);
        revalidatePath(`/`);
      } catch {}
    } catch (err) {
      if (err instanceof Error) {
        try {
          await writer.write(
            encoder.encode(
              JSON.stringify({ type: "error", content: err.message })
            )
          );
        } catch {}
      } else {
        try {
          await writer.write(
            encoder.encode(
              JSON.stringify({ type: "error", content: "Unknown error" })
            )
          );
        } catch {}
      }
      await deleteMessages(messages.slice(-2).map((msg) => msg.id));
      try {
        await writer.close();
      } catch {}
    }
  })();

  return { stream: returnedStream.readable, messages, chatId };
}

export async function addNewMessage(
  chatId: string | null,
  selectedModel: ChatModel | null,
  prevData: unknown,
  formData: FormData
) {
  const message = formData.get("message")?.toString();
  if (!message) return { error: "No message" };
  if (!chatId) {
    const newChat = await createNewChat(message);
    chatId = newChat.id;
  }
  if (!selectedModel) return { error: "No selected model" };

  await newMessage(message, chatId, "user");
  return processStream(chatId, selectedModel);
}

export async function editMessage(
  chatId: string | null,
  selectedModel: ChatModel | null,
  prevData: unknown,
  formData: FormData
) {
  const message = formData.get("message")?.toString();
  const messageId = formData.get("messageId")?.toString();
  if (!message) return { error: "No message" };
  if (!chatId) return { error: "No chat id" };
  if (!messageId) return { error: "No message id" };
  if (!selectedModel) return { error: "No selected model" };

  const chatMessages = await getChatMessages(chatId);
  const idsToDelete = chatMessages
    .filter((msg) => Number(msg.id) >= Number(messageId))
    .map((msg) => msg.id);

  await deleteMessages(idsToDelete);
  await newMessage(message, chatId, "user");
  console.log("Returning stream ");

  return processStream(chatId, selectedModel);
}

export async function getChatList() {
  const data = await getChats();
  return data;
}
