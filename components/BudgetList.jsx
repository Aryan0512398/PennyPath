"use client"
import React, { use, useEffect, useState } from 'react'
import CreateBudeget from './CreateBudget'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import BudgetItem from './BudgetItem'
function BudgetList() {
  const { user } = useUser()
  const [budgetList, setBudgetList] = useState([])
  const getBudgetList = async () => {
      const res=await db.select({
        ...getTableColumns(Budgets),
        totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
        totalItem : sql `count(${Expenses.id})`.mapWith(Number),
      }).from(Budgets)
      .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId)).where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress)).groupBy(Budgets.id).orderBy(desc(Budgets.id))
      console.log(res)
      setBudgetList(res)
    }
    useEffect(() => {
      user && getBudgetList()
    },[user])
  return (
    
    <div className='mt-7'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      <CreateBudeget refreshData={()=>getBudgetList()}></CreateBudeget>
      {budgetList?.length>0 ? budgetList.map((budget) => (
        <BudgetItem key={budget.id} budget={budget} />
      )):[1,2,3,4,5,6].map((item,index) => (
        <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'>

        </div>
      ))}
        </div>
    </div>
  )
}

export default BudgetList
