import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import {  Trash2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner';

function ExpenseListTable({expensesList,refreshData}) {
    const handleDeleteExpense = async (expense) => {
        const res = await db.delete(Expenses).where(eq(Expenses.id, expense.id)).returning({ deletedId: Expenses.id });
        if (res) {
            toast("Expense deleted successfully!");
            // Optionally, you can refresh the expenses list here
             refreshData();
        } else {
            toast.error("Failed to delete expense.");
        }
    }
  return (
    <div className='mt-2'>
      <h2 className='font-bold text-lg'>Latest Expenses</h2>
    <div className='grid grid-cols-4  mt-3 p-4 bg-slate-200 rounded-lg'>
        <h2 className='font-bold'>Name</h2>
        <h2 className='font-bold'>Amount</h2>
        <h2 className='font-bold'>Date & Time</h2>
        <h2 className='font-bold'>Action</h2>
    </div>
    {expensesList?.length > 0 ? (
      expensesList.map((expense) => (
        <div key={expense.id} className='grid grid-cols-4   p-4 bg-slate-50 rounded-lg'>
          <h2>{expense.name}</h2>
          <h2>₹{expense.amount}</h2>
          <h2>{(expense.createdAt)}</h2>
          <h2 className='flex items-center justify-start cursor-pointer hover:text-red-600 transition-all duration-200'>
            <Trash2 className='text-red-600' onClick={() => handleDeleteExpense(expense)}></Trash2>
          </h2>
        </div>
      ))
    ) : (
      <div className='p-5 text-center text-gray-500'>No expenses found.</div>
    )}
    </div>
  )
}

export default ExpenseListTable
