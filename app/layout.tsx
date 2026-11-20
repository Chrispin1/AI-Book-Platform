import type { Metadata } from "next";
import { Jost, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/ui/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bookify",
  description:
    "Transform your books into interactive AI conversations. Upload PDFs and chat with your books using voice.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        jost.variable,
        "font-sans",
        inter.variable,
      )}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
