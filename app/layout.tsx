import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { AuthProvider } from "@/components/AuthProvider";
import AfriverseAiAssistant from "@/components/AfriverseAiAssistant";

export const metadata: Metadata = {
  title: "AFRIVERSE Arusha — Connecting Arusha Artisans to Global Markets",
  description:
    "Connecting Arusha artisans to global markets. Authentic Arusha artisan-made goods, Maasai beadwork, Maasai shuka textiles, and cultural experiences directly from Arusha, Tanzania.",
  keywords: [
    "Arusha",
    "Arusha Artisans",
    "Tanzania",
    "Maasai Beadwork",
    "Maasai Shuka",
    "African art",
    "luxury crafts",
    "AFRIVERSE",
    "authentic Arusha artisan-made goods",
    "ethical luxury",
  ],
  openGraph: {
    title: "AFRIVERSE Arusha — Connecting Arusha Artisans to Global Markets",
    description:
      "Discover authentic Arusha artisan-made goods, Maasai beadwork, Maasai shuka textiles, and cultural experiences from Arusha, Tanzania.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-obsidian text-earth-cream antialiased overflow-x-hidden flex flex-col min-h-screen">
        <StoreProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
          <AfriverseAiAssistant />
        </StoreProvider>
      </body>
    </html>
  );
}
