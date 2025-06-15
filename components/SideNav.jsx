"use client"
import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import path from 'path'
import React, { useEffect } from 'react'

function SideNav() {
    const path=usePathname();
    useEffect(()=>{
        console.log(path)
    }, [path])
    const menuList=[
        {
            id:1,
            name:'Dashboard',
            icon:LayoutGrid,
            path:'/dashboard'
        },
        {
            id:2,
            name:'Budgets',
            icon:PiggyBank,
            path:'/dashboard/budgets'
        },
        {
            id:3,
            name:'Expenses',
            icon:ReceiptText,
            path:'/dashboard/expenses'
        },
        {
            id:4,
            name:'Upgrade',
            icon:ShieldCheck,
            path:'/dashboard/upgrade'
        }
    ]
  return (
    <div className='h-screen fixed p-5 border shadow-sm'>
      <Image src={'/logo.svg'} alt='Logo' width={160} height={100} />
      <div className='mt-5'>
        {menuList.map((menu,index) => (
          <Link  href={menu.path} key={index}>
            <h2   className={`flex items-center mb-1 gap-2 text-gray-600 font-semibold text-lg cursor-pointer hover:text-blue-600 hover:bg-blue-200 p-5 rounded-md transition-all duration-200 ${path===menu.path?'bg-blue-200':''}`}>
            <menu.icon></menu.icon>
            {menu.name}</h2>
          </Link>
        ))}
      </div>
      <div className='fixed bottom-15 p-5 flex gap-2 items-center '>
        <UserButton id="user-button" ></UserButton>
         <label htmlFor="user-button" className='cursor-pointer text-gray-600 font-semibold'>Profile</label>
      </div>
    </div>
  )
}

export default SideNav
