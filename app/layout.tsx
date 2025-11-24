import type { Metadata } from "next";
import { Mali, Work_Sans } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { MyFirebaseProvider } from "@/components/firebase-providers";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

const font = Mali({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Fluffy Notes",
  description:
    "A simple and relaxing note-taking cute app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(font.className)}>
        <ThemeProvider>
          <MyFirebaseProvider>
            {children}
            <Toaster />
          </MyFirebaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
