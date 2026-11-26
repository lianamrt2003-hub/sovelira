import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VORS — шубы из искусственного меха",
  description: "Каталог шуб VORS и запись на примерку в шоуруме",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
