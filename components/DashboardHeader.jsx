"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function DashboardHeader() {
  const router=useRouter()
  return (
    <div className="p-4 shadow-sm border-b flex justify-between items-center">
      <div className="flex items-center gap-4">
        {/* Responsive logo for small screens only */}
        <div className="block md:hidden " onClick={()=>router.push("/")}>
          <Image
            src="/logoShort.svg"
            alt="Logo"
            width={10}
            height={40}
            className="h-auto w-auto cursor-pointer"
            priority // Ensures it's loaded early
          />
        </div>

        {/* Motivational Text */}
        <div className="text-sm bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md">
  💰 Save smart, live better!
</div>
      </div>

      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-8 h-8 md:w-10 md:h-10", // Responsive sizes
          },
        }}
      />
    </div>
  );
}

export default DashboardHeader;
