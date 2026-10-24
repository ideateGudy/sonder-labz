import type { Metadata } from "next";
import { Bricolage_Grotesque, Onest } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/components/providers";
import { AmbientBackdrop } from "@/components/brand/AmbientBackdrop";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Sonder Labz",
    default: "Sonder Labz — Software Development Agency",
  },
  description:
    "Sonder Labz designs and builds high-craft web, mobile, and desktop applications for ambitious businesses and founders.",
  metadataBase: new URL("https://sonderlabz.com"),
  icons: {
    icon: "/brand/icon.svg",
    shortcut: "/brand/icon.svg",
    apple: "/brand/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${onest.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Providers>
          <AmbientBackdrop />
          {children}
        </Providers>
      </body>
    </html>
  );
}
