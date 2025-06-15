"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import SideNav from "@/components/SideNav.jsx";
import DashboardHeader from "@/components/DashboardHeader.jsx";
import DashboardOverview from "@/components/DashboardOverview.jsx";
import MobileMenuBar from "@/components/MobileMenuBar.jsx";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { db } from "../../../utils/dbConfig.jsx";
import { Budgets } from "@/utils/schema.jsx";
import { eq } from "drizzle-orm";

const DashboardLayout = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && checkUserBudget();
  }, [user]);

  const checkUserBudget = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

    if (result.length === 0) {
      router.replace("/dashboard/budgets");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen pb-[70px]">
        {/* 👇 Add pb-[70px] so footer doesn't get pushed down by MobileMenuBar */}
        <DashboardHeader />
        <DashboardOverview />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50">
        <MobileMenuBar />
      </div>
    </div>
  );
};

export default DashboardLayout;
