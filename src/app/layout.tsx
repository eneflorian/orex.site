import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "OLX Scraper Pro - Monitor anunțuri OLX în timp real",
  description: "Monitorizează și analizează anunțurile de pe OLX.ro cu scraping în timp real. Găsește cele mai bune oferte și urmărește tendințele de piață cu OLX Monitor.",
  keywords: "OLX, scraper, monitor, anunțuri, preturi, piață, România, imobiliare, auto, telefoane",
  authors: [{ name: "OLX Monitor Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
