"use client";
import BudgetList from "@/components/BudgetList.jsx";
function Budget() {
  return (
    <div className="p-10">
      <h1 className="font-bold text-3xl">My Budgets</h1>
      <BudgetList></BudgetList>
    </div>
  );
}

export default Budget;
