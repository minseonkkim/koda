import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "KODA",
  description: "KODA task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="font-sans w-full bg-gray-100 min-h-screen flex flex-col items-center">
          <div className="w-[470px] md:w-[770px] flex flex-col gap-2 my-2">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
