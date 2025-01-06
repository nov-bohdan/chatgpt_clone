import type { Metadata } from "next";
import "./globals.css";
import LeftPanel from "@/components/LeftPanel";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="sans-serif antialiased">
        <div className="flex flex-row">
          <LeftPanel />
          {children}
        </div>
      </body>
    </html>
  );
}
