import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "New Model Way — курс комерційного моделінгу",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  description: "Покрокова онлайн-програма для незалежних комерційних моделей.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="uk"><body>{children}</body></html>;
}
