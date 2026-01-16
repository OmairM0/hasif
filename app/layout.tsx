import type { Metadata } from "next";
// import { ibmPlexSans } from "./fonts/font";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import BottomNavbar from "@/components/bottom-navbar";
import { FavoritesClientProvider } from "@/providers/FavoritesClientProvider";
import { Analytics } from "@vercel/analytics/next";

const ibmPlexSans = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-sans",
  subsets: ["arabic", "latin"],
  weight: "400",
});

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

const themeScript = `
(() => {
  try {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored ?? (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (_) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${ibmPlexSans.className} antialiased`}>
        <div className="max-w-4xl md:mx-auto h-full p-4 bg-background min-h-dvh flex flex-col">
          <>
            <FavoritesClientProvider>{children}</FavoritesClientProvider>
          </>
          <div className="mt-auto p-2">
            <BottomNavbar />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
