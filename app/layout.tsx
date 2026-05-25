import type { Metadata } from "next";
import { Press_Start_2P, Crimson_Text } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import PixelNavbar from "@/components/landing/PixelNavbar";
import AmbientPlayer from "@/components/audio/AmbientPlayer";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const bodyFont = Crimson_Text({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Balangay of the Forgotten",
  description: "An immersive pixel-art experience through the archives of the forgotten.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pixelFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <div className="crt-overlay" />
          <PixelNavbar />
          {children}
          <AmbientPlayer />
        </LenisProvider>
      </body>
    </html>
  );
}
