import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { IoIosSettings } from "react-icons/io";

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
          <div className="w-[470px] md:w-[770px] flex flex-col gap-4 my-4">
            <div className="flex flex-row items-center justify-between p-2">
              <Link href="/dashboard">
                <div className="font-bold text-[30px] text-gray-900">KODA</div>
              </Link>
              <Link href="/settings">
                <IoIosSettings className="size-7 text-gray-600" />
              </Link>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
