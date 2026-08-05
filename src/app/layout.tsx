import type { Metadata } from "next";
import { Oswald, DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const fontHeading = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
});

const fontSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cricket Academy | Master the Game",
  description: "Join West Bengal's premier cricket academy. Expert coaching, world-class facilities, and a proven pathway to excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontHeading.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-crimson selection:text-white">
        {children}
      </body>
    </html>
  );
}
