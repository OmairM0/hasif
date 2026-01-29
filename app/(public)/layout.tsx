import "../globals.css";
import BottomNavbar from "@/components/bottom-navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-6xl mx-auto min-h-dvh flex flex-col p-4">
      {children}
      <div className="mt-auto p-2">
        <BottomNavbar />
      </div>
    </div>
  );
}
