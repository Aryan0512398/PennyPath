"use client";
import BudgetItem from "@/components/BudgetItem";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import AddExpenses from "@/components/AddExpenses";
import ExpenseListTable from "@/components/ExpenseListTable";
import EditBudget from "@/components/EditBudget";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, PenBoxIcon, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function ExpensesScreen({ params }) {
  const { user } = useUser();
  const unwrappedParams = React.use(params); // ✅ unwrap the params promise
  const [budgetInfo, setBudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const route = useRouter();

  useEffect(() => {
    console.log(unwrappedParams);
    user && getBudgetInfo(unwrappedParams.id);
  }, [unwrappedParams, user]);

  const getBudgetInfo = async (id) => {
    const res = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, id))
      .groupBy(Budgets.id);

    console.log(res);
    setBudgetInfo(res[0]);
    getExpenses(id);
  };
  const getExpenses = async (id) => {
    const res = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, id))
      .orderBy(desc(Expenses.id));
    setExpensesList(res);
    console.log("Expenses latest: ", res);
    console.log("After setting expensesList: ", expensesList);
  };
  const handleDeleteBudget = async () => {
    const deleteExpenses = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, unwrappedParams.id))
      .returning(); // Delete all expenses associated with the budget
    if (deleteExpenses) {
      console.log("All expenses deleted successfully.");
      const res = await db
        .delete(Budgets)
        .where(eq(Budgets.id, unwrappedParams.id))
        .returning({ deletedId: Budgets.id });
      if (res) {
        toast("Budget deleted successfully!");
        // Optionally, you can refresh the budget info here
        getBudgetInfo(unwrappedParams.id);
        route.push("/dashboard/budgets");
      } else {
        toast.error("Failed to delete budget.");
      }
    }
  };
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        <div className="flex items-center gap-1 justify-center">
          <ArrowLeftIcon className="cursor-pointer" onClick={()=> route.push("/dashboard")}></ArrowLeftIcon>
          My Expenses
        </div>

        <div className="flex gap-2 items-center">
          <EditBudget
            budgetInfo={budgetInfo}
            refreshData={() => getBudgetInfo(unwrappedParams.id)}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className={"flex gap-2 cursor-pointer"}
                variant={"destructive"}
              >
                <Trash2 className="mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses and remove your data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className={"cursor-pointer"}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className={"cursor-pointer"}
                  onClick={() => handleDeleteBudget()}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-5 mt-7">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpenses
          budgetId={unwrappedParams.id}
          user={user}
          refreshData={() => getBudgetInfo(unwrappedParams.id)}
        />
      </div>
      <div className="mt-4">
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetInfo(unwrappedParams.id)}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;
