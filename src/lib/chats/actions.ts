"use server";

import { redirect } from "next/navigation";
import { createNewChat, getChatMessages, newMessage } from "./data";
import { revalidatePath } from "next/cache";
import { getAnswer } from "../openai/openai";

export async function createChat(prevData: unknown, formData: FormData) {
  const message = formData.get("message")?.toString();
  if (!message) return { error: "No message" };
  const newChat = await createNewChat(message);
  await newMessage(message, newChat.id);
  const messages = await getChatMessages(newChat.id);
  const answer = await getAnswer(messages);
  console.log(answer);
  if (!answer || !answer.content) return { error: "OpenAI Error" };
  await newMessage(answer.content, newChat.id, "assistant");
  redirect(`/c/${newChat.id}`);
}

export async function addNewMessage(
  chatId: string | undefined,
  prevData: unknown,
  formData: FormData
) {
  const message = formData.get("message")?.toString();
  if (!message) return { error: "No message" };
  if (!chatId) return { error: "No chatId" };
  await newMessage(message, chatId, "user");
  const messages = await getChatMessages(chatId);
  const answer = await getAnswer(messages);
  console.log(answer);
  if (!answer || !answer.content) return { error: "OpenAI Error" };
  await newMessage(answer.content, chatId, "assistant");
  revalidatePath(`/c/${chatId}`);
}
