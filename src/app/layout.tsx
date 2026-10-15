import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roast My YouTube 🔥 | How Cooked Is Your Algorithm?",
  description:
    "Sign in with Google to get an AI-powered, savage roast of your YouTube taste, subscriptions, and liked videos. Export your receipt and share the cringe.",
  openGraph: {
    title: "Roast My YouTube 🔥",
    description: "Find out how cooked your algorithm really is.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0c] text-white min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

