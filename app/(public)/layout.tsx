import "../globals.css";
import BottomNavbar from "@/components/bottom-navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-[calc(100vh-2rem)] flex flex-col">
      {children}
      <div className="mt-auto p-2">
        <BottomNavbar />
      </div>
    </div>
  );
}
