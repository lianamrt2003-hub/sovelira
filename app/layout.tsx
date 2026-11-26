import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VORS — шубы из искусственного меха",
  description: "Каталог шуб VORS и запись на примерку в шоуруме",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        {/* Шрифты VORS: Forum (бренд), Fira Sans Extra Condensed (меню, кнопки), Geologica (текст) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Forum&family=Fira+Sans+Extra+Condensed:wght@700&family=Geologica:wght@300;400&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
