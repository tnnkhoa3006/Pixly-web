import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Pixly — Professional Pixel Art & Animation Editor",
  description:
    "Design, animate, and bring pixels to life. A powerful pixel art editor with layer-based editing, frame-by-frame animation, and professional drawing tools.",
  keywords: ["pixel art", "animation", "editor", "game development", "sprite editor", "pixel editor"],
  openGraph: {
    title: "Pixly — Professional Pixel Art & Animation Editor",
    description: "Design, animate, and bring pixels to life.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}