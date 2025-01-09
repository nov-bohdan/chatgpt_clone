import { createClient } from "@supabase/supabase-js";
import { Chat, Message } from "../types";
import { redirect } from "next/navigation";

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;
  if (!url || !key) throw new Error("Invalid database credentials");
  return createClient(url, key);
}

export async function createNewChat(message: string): Promise<Chat> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("chats")
    .insert({
      title: message.slice(0, 50),
    })
    .select()
    .limit(1)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function newMessage(
  message: string,
  chatId: string,
  role = "user"
): Promise<Message> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("messages")
    .insert({
      content: message,
      role,
      chat_id: chatId,
    })
    .select()
    .limit(1)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateMessage(message: string, messageId: string) {
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from("messages")
    .update({ content: message })
    .eq("id", messageId);

  if (error) throw new Error(error.message);
}

export async function getChats(): Promise<Chat[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("chats")
    .select("id, title, date")
    .order("id", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getChatMessages(id: string): Promise<Message[]> {
  if (id === "undefined") redirect("/");
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("messages")
    .select()
    .eq("chat_id", id)
    .order("id", { ascending: true });
  if (error) throw new Error(error.message);
  if (!data || data.length === 0) redirect("/");
  return data;
}
