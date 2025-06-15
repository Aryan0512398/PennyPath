"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";

function DashboardHeader() {
  return (
    <div className="p-4 shadow-sm border-b flex gap-2 justify-between">
      <div className="text-sm bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md">
        🚀 Every rupee saved is a step toward freedom. Keep it going!
      </div>

      <div>
        <UserButton></UserButton>
      </div>
    </div>
  );
}

export default DashboardHeader;
