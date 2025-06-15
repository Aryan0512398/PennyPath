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
    // Check user budget when the component mounts
    user && checkUserBudget();
  }, [user]);
  const checkUserBudget = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
    console.log(result);
    if (result.length === 0) {
      // If no budget exists, you can redirect or show a message
      console.log("No budget found for this user");
      router.replace("/dashboard/budgets");
    } else {
      // Handle the case where a budget exists
      console.log("User's budget:", result);
    }
  };
  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav></SideNav>
      </div>
      <div className="md:ml-64 pb-16">
        {" "}
        {/* 👈 Add padding to avoid overlap with MobileMenuBar */}
        <DashboardHeader />
        <DashboardOverview />
        {children}
      </div>
      <MobileMenuBar /> {/* ✅ Add MobileMenuBar here */}
      <Footer></Footer>
      
    </div>
  );
};

export default DashboardLayout;
