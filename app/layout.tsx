import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "YoutubeTrivia",
  description: "Quiz yourself on your favorite Youtube videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="
      bg-gradient-to-b 
      from-slate-50 
      to-slate-200
      dark:bg-gradient-to-b 
      dark:from-slate-900 
      dark:to-black
      "
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="sticky top-0">
            <NavBar />
          </div>
          <main className="flex min-h-screen flex-col items-center justify-between p-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
