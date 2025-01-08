"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Chat } from "../types";
import { getChats } from "../chats/data";

type SidebarContextType = {
  sidebarHidden: boolean;
  toggleSidebar: () => void;
  setChats: Dispatch<SetStateAction<Chat[]>>;
  chats: Chat[];
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({
  children,
  initialChats = [],
  initialSidebarHidden = true,
}: {
  children: React.ReactNode;
  initialChats?: Chat[];
  initialSidebarHidden?: boolean;
}) {
  const [sidebarHidden, setSidebarHidden] =
    useState<boolean>(initialSidebarHidden);
  const [chats, setChats] = useState<Chat[]>(initialChats);

  useEffect(() => {
    if (!initialChats) {
      const fetchChats = async () => {
        const chatsData = await getChats();
        setChats(chatsData);
      };
      fetchChats();
    }
  }, [initialChats]);

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  return (
    <SidebarContext.Provider
      value={{ sidebarHidden, toggleSidebar, chats, setChats }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar muse be used within a SidebarProvider");
  }

  return context;
}
