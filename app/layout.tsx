import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cala Millor · Mallorca",
  description: "Rodzinny dashboard urlopu: pogoda, wypady z hotelu i wschodnia Majorka.",
  appleWebApp: { capable: true, title: "Cala Millor", statusBarStyle: "default" }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f5f5f7"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
