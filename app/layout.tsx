import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TarotWise — 塔羅智慧",
  description: "隨時隨地抽牌、AI 智慧解牌、記錄心靈軌跡",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="h-full">
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
