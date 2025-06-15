"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const router=useRouter()
  return (
    <div className="p-5 flex justify-between items-center shadow-md">
      <Image className="cursor-pointer" src="/logo.svg" alt="Logo" width={160} height={100} onClick={()=> router.push("/") } />
      {isSignedIn ? (
        <UserButton />
      ) : (
         <div className="flex gap-4">
          <Link href="/dashboard">
            <Button variant={"outline"} className="cursor-pointer">
              Dashboard
            </Button>
          </Link>
          <Link href={isSignedIn ? `/dashboard` : `/sign-in`}>
            <Button className="cursor-pointer border-indigo-600 bg-indigo-600 transition-colors hover:bg-indigo-700">
              Get Started
            </Button>
          </Link>
          
        </div>
        
      )}
    </div>
  );
};

export default Header;
