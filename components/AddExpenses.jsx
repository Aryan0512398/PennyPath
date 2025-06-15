import React, { useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { db } from '@/utils/dbConfig';
import { toast } from 'sonner';
import { Budgets, Expenses } from '@/utils/schema';
import moment from 'moment';

function AddExpenses({budgetId,user,refreshData}) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const addNewExpense = async () => {
        const res=await db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdAt: moment().format("YYYY-MM-DD & HH:mm:ss"),
        }).returning({ insertedId: Budgets.id });
        console.log("New Expense Added", res);
        if (res) {
            setName("");
            setAmount(0);
            refreshData();
            toast("Expense added successfully!");
        }
    }
  return (
    <div className='border p-5 rounded-lg '>
      <h2 className='font-bold text-lg'>Add Expenses</h2>
      <div className="mt-2">
              <label className="block mb-1 text-black font-medium text-sm">
                Expense Name
              </label>
              <Input
                onChange={(e) => setName(e.target.value)} value={name}
                placeholder="eg. Table Decor"
              />
            </div>
            <div className="mt-2">
              <label className="block mb-1 text-black font-medium text-sm">
                Expense Amount
              </label>
              <Input
                type="number"
                onChange={(e) => setAmount(e.target.value)} value={amount}
                placeholder="eg. ₹2000 "
              />
            </div>
            <Button disabled={!(name && amount)} className={"mt-3 w-full cursor-pointer "} onClick={() => addNewExpense()}>Add New Expense</Button>
    </div>
  )
}

export default AddExpenses
