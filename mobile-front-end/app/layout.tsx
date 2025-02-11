import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

import { DM_Serif_Text, Inter, Syne } from "next/font/google";

const dmSerifText = DM_Serif_Text({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dmSerifText",
});

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WoodTracker",
  description: "Traceability and compliance of the dApp wood supply chain, an ESILV and IDEX project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${dmSerifText.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
