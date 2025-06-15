"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "@/components/CardInfo";
import BarChartDash from "@/components/BarChartDash";
import BudgetItem from "@/components/BudgetItem";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import ExpenseListTable from "@/components/ExpenseListTable";

function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList,setExpensesList]=useState([])

  const getBudgetList = async () => {
    const res = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    console.log(res);
    setBudgetList(res);
    getAllExpenses();
  };
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));

    console.log("All Expense ", result);
    setExpensesList(result)
  };

  useEffect(() => {
    user && getBudgetList();
  }, [user]);
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">
       Welcome, {user?.fullName}! 🚀
      </h1>
      <p className="text-gray-600 text-base mt-1">
        Here's what's happening with your money — let’s manage it like a pro.
      </p>
      <CardInfo budgetList={budgetList}></CardInfo>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          <BarChartDash budgetList={budgetList}></BarChartDash>
          <ExpenseListTable expensesList={expensesList} refreshData={()=>getBudgetList()}></ExpenseListTable>
        </div>
        <div className="grid grid-cols-1 gap-5">
          <h2 className="font-bold text-lg">Latest Budget's</h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index}></BudgetItem>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
