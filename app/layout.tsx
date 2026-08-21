import type { Metadata } from "next";
import { Noto_Serif_Devanagari, Manrope } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: "--font-noto-serif-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dhruvtapaniya.com"), // [DOMAIN TO CONFIRM]
  title: "Dhruv Tapaniya — Developer & Computer Engineering Student",
  description: "Portfolio of Dhruv Tapaniya: Indian roots × Editorial minimalism × Cinematic motion × Modern engineering",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dhruv Tapaniya — Developer & Computer Engineering Student",
    description: "From Roots to Code",
    url: "https://dhruvtapaniya.com", // [DOMAIN TO CONFIRM]
    siteName: "Dhruv Tapaniya Portfolio",
    images: [
      {
        url: "/og-image.jpg", // [OG IMAGE REQUIRED]
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Tapaniya — Developer & Computer Engineering Student",
    description: "From Roots to Code",
    images: ["/og-image.jpg"], // [OG IMAGE REQUIRED]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dhruv Tapaniya",
    url: "https://dhruvtapaniya.com", // [DOMAIN TO CONFIRM]
  };

  return (
    <html lang="en" className={`${notoSerifDevanagari.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen">
        <LenisProvider>
          {children}
        </LenisProvider>
        <CustomCursor />
        <ScrollProgress />
      </body>
    </html>
  );
}
