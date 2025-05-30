"use client";

import { IoIosSettings } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleClick1 = () => {
    router.push("/dashboard");
  };

  const handleClick2 = () => {
    router.push("/settings");
  };
  return (
    <div className="flex flex-row items-center justify-between p-2">
      <div
        className="font-bold text-[30px] text-gray-900 cursor-pointer"
        onClick={handleClick1}
      >
        KODA
      </div>
      <IoIosSettings
        className="size-7 text-gray-600 cursor-pointer"
        onClick={handleClick2}
      />
    </div>
  );
}
