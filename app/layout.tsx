import type { Metadata } from "next";
import pkg from "../package.json";
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
        <footer className="mt-auto text-center text-sm py-4 px-4 text-muted border-t border-card-border">
          TarotWise v{pkg.version}
        </footer>
      </body>
    </html>
  );
}
