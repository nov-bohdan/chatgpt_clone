"use server";

import { redirect } from "next/navigation";
import { createNewChat, getChatMessages, newMessage } from "./data";
import { revalidatePath } from "next/cache";
import { getAnswer, getStreamedAnswer } from "../openai/openai";
import { Updater } from "./chunksMessageUpdater";

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
  const stream = true;
  if (!message) return { error: "No message" };
  if (!chatId) return { error: "No chatId" };
  await newMessage(message, chatId, "user");
  let messages = await getChatMessages(chatId);
  if (!stream) {
    const answer = await getAnswer(messages);
    if (!answer || !answer.content) return { error: "OpenAI Error" };
    await newMessage(answer.content, chatId, "assistant");
    revalidatePath(`/c/${chatId}`);
  }

  if (stream) {
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

    revalidatePath(`/c/${chatId}`);
    return { stream: returnedStream.readable, messages };
  }
}
