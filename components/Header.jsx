"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-5 flex justify-between items-center shadow-md">
      <Image src="/logo.svg" alt="Logo" width={160} height={100} />
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href="/sign-in">
          <Button className="cursor-pointer border-indigo-600 bg-indigo-600 transition-colors hover:bg-indigo-700"
              >
            Get Started
          </Button>{" "}
        </Link>
      )}
    </div>
  );
};

export default Header;
