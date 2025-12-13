import localFont from "next/font/local";

export const ibmPlexSans = localFont({
  src: [
    {
      path: "./ibm-plex/ibm-plex-sans-arabic-latin-100-normal.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./ibm-plex/ibm-plex-sans-arabic-latin-200-normal.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./ibm-plex/ibm-plex-sans-arabic-latin-300-normal.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./ibm-plex/ibm-plex-sans-arabic-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./ibm-plex/ibm-plex-sans-arabic-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./ibm-plex/ibm-plex-sans-arabic-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./ibm-plex/ibm-plex-sans-arabic-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-sans",
});
