import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  const calculateProgreePercentage = () => {
    if (!budget?.amount || !budget?.totalSpend) return 0;
    const ans= Math.min((budget.totalSpend / budget.amount) * 100, 100).toFixed(2);
    console.log("Percentage: ", ans);
    return ans;
  };
  return (
    <Link href={`/dashboard/expenses/${budget?.id}`} >
      <div className="border h-[180px] p-5 rounded-lg hover:shadow-md transition-all duration-200 bg-white cursor-pointer">
      <div className="flex gap-2 items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          <h2 className="text-3xl p-3 px-4 bg-slate-100 rounded-full">
            {budget?.icon}
          </h2>
          <div>
            <h2 className="font-bold">{budget?.name}</h2>
            <h2 className="text-sm text-gray-500">{budget?.totalItem} Item</h2>
          </div>
        </div>
        <h2 className="font-bold text-indigo-700 text-lg">₹{budget?.amount}</h2>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-xs text-slate-400">₹{budget?.totalSpend ?? 0} Spend</h2>
            <h2 className="font-bold text-xs text-slate-400">₹{(budget?.amount ?? 0) - (budget?.totalSpend ?? 0)} Remaining</h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
            <div className={` bg-indigo-700 h-2 rounded-full`}
            style={{ width: `${calculateProgreePercentage()}%` }}></div>
        </div>
      </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
