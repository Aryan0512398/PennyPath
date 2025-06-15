"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  Rocket,
} from "lucide-react";

const MobileMenuBar = () => {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Budgets", icon: Wallet, href: "/dashboard/budgets" },
    { name: "Expenses", icon: CreditCard, href: "/dashboard/expenses" },
    { name: "Upgrade", icon: Rocket, href: "/dashboard/upgrade" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50 flex justify-around md:hidden">
      {menu.map((item, index) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            href={item.href}
            key={index}
            className={`flex flex-col items-center justify-center py-2 px-3 text-xs transition-all duration-150 ${
              isActive ? "text-indigo-600 font-semibold" : "text-gray-500"
            }`}
          >
            <Icon
              className={`w-5 h-5 mb-1 ${
                isActive ? "stroke-2" : "stroke-1"
              }`}
            />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileMenuBar;
