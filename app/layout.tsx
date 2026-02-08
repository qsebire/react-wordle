import type { Metadata } from "next";
import { Fascinate, Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const fascinate = Fascinate({
  variable: "--font-fascinate",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React Wordle",
  description: "React Wordle create by Quentin Sébire",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${fascinate.variable} ${openSans.variable} antialiased`}
      >
        <div className="flex flex-col justify-between items-center w-screen h-screen p-2 md:p-6">
          <h1 className="font-fascinate text-2xl text-center">React Wordle</h1>
          {children}
          <div>
            <p className="text-center">Créé par Quentin Sébire</p>
          </div>
        </div>
      </body>
    </html>
  );
}
