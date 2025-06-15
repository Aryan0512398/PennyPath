import { PiggyBankIcon, ReceiptIndianRupee, Wallet2 } from "lucide-react";
import React, { useEffect, useState } from "react";

function CardInfo({ budgetList }) {
    const[totalBudget, setTotalBudget] = useState(0);
    const[totalSpend, setTotalSpend] = useState(0);
    const[totalBudgetItem, setTotalBudgetItem] = useState(0);
    const calculateCardInfo = () => {
        console.log("Calculating card info...");
        console.log(budgetList)
        let totalBudget_ = 0;
        let totalSpend_ = 0;
        let totalBudgetItem_ = 0;
        budgetList.forEach(budget => {
            totalBudget_ += Number(budget.amount);
            totalSpend_ += (budget.totalSpend);
            totalBudgetItem_ += budget.totalItem || 0; // Handle cases where totalItem might be undefined
        });
        setTotalBudget(totalBudget_);
        setTotalSpend(totalSpend_);
        setTotalBudgetItem(totalBudgetItem_);
        console.log("Total Budget:", totalBudget_);
        console.log("Total Spend:", totalSpend_);
        console.log("Total Budget Items:", totalBudgetItem_);
    }
    useEffect(() => {
        if (budgetList && budgetList.length > 0) {
            calculateCardInfo();
        }
    }, [budgetList]);
  return (
    <div>
   {budgetList.length>0 ? <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div className="p-7 border rounded-lg flex items-center justify-between bg-white shadow-md">
        <div>
          <h2 className="text-sm">Total Budget</h2>
          <h2 className="font-bold text-2xl">₹{totalBudget}</h2>
        </div>
        <PiggyBankIcon className="h-10 w-10 p-2 bg-indigo-100 text-indigo-600 rounded-full shadow-md" />
      </div>
      <div className="p-7 border rounded-lg flex items-center justify-between bg-white shadow-md">
        <div>
          <h2 className="text-sm">Total Spend</h2>
          <h2 className="font-bold text-2xl">₹{totalSpend}</h2>
        </div>
        <ReceiptIndianRupee className="h-10 w-10 p-2 bg-indigo-100 text-indigo-600 rounded-full shadow-md" />
      </div>
      <div className="p-7 border rounded-lg flex items-center justify-between bg-white shadow-md">
        <div>
          <h2 className="text-sm">No. of Budgets</h2>
          <h2 className="font-bold text-2xl">{totalBudgetItem}</h2>
        </div>
        <Wallet2 className="h-10 w-10 p-2 bg-indigo-100 text-indigo-600 rounded-full shadow-md" />
      </div>
    </div> : <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
       { [1,2,3].map((item , key) => (
        <div key={key} className="h-[110px] w-full bg-slate-200 animate-pulse rounded-md"></div>

        ))}
        </div>}
    </div>
  );
}

export default CardInfo;
