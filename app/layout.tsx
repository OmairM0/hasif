import type { Metadata } from "next";
import { ibmPlexSans } from "./fonts/font";
import "./globals.css";
import BottomNavbar from "@/components/bottom-navbar";
import { FavoritesClientProvider } from "@/providers/FavoritesClientProvider";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    default: "حصيف | كلمات عربية فصيحة",
    template: "%s | حصيف",
  },
  description:
    "حصيف تطبيق تعليمي يقدّم كلمات عربية فصيحة نادرة مع التشكيل، المعنى، الشرح، والأمثلة.",
  keywords: [
    "اللغة العربية",
    "كلمات فصيحة",
    "معجم عربي",
    "تعلم العربية",
    "حصيف",
  ],
  authors: [{ name: "Hasif Team" }],
  openGraph: {
    title: "حصيف | كلمات عربية فصيحة",
    description: "اكتشف كلمات عربية فصيحة قليلة الاستخدام مع شرح مبسّط وأمثلة.",
    type: "website",
    locale: "ar_AR",
    siteName: "Hasif",
  },
  twitter: {
    card: "summary",
    title: "حصيف | كلمات عربية فصيحة",
    description: "تطبيق تعليمي للكلمات العربية الفصيحة مع التشكيل والمعاني.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${ibmPlexSans.variable} antialiased`}>
        <div className="max-w-4xl md:mx-auto h-full p-4 bg-background min-h-dvh flex flex-col">
          <main>
            <FavoritesClientProvider>{children}</FavoritesClientProvider>
          </main>
          <div className="mt-auto p-2">
            <BottomNavbar />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
