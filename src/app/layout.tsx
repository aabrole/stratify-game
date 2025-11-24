import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./providers/ConvexClientProvider";
import { Navigation } from "@/components/Navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://stratify.help"),
  title: "Master The Strat: Drill Setups & Price Action Patterns",
  description: "Stop hesitating at the hard right edge. Stratify helps you drill Strat setups, recognize patterns instantly, and build the muscle memory needed for live trading. Start training today.",
  keywords: [
    "The Strat",
    "Price Action Trading",
    "Trading Drills",
    "Stock Market Simulator",
    "Learn to Trade",
    "Inside Bar",
    "Timeframe Continuity",
    "Rob Smith Strat",
    "Candlestick Patterns",
    "Trading Education",
  ],
  authors: [{ name: "Stratify" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  themeColor: "#1a1a2e",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Stratify",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Master The Strat: Drill Setups & Price Action Patterns",
    description: "Stop hesitating at the hard right edge. Stratify helps you drill Strat setups, recognize patterns instantly, and build the muscle memory needed for live trading.",
    url: "https://stratify.help",
    siteName: "Stratify",
    images: [
      {
        url: "/og-image.jpg",
        width: 1024,
        height: 536,
        alt: "Master The Strat - Drill setups. Build muscle memory.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Master The Strat: Drill Setups & Price Action Patterns",
    description: "Stop hesitating at the hard right edge. Build muscle memory for live trading with interactive Strat drills.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ConvexClientProvider>
            <Navigation />
            {children}
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
