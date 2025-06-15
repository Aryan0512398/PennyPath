"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function BarChartDash({ budgetList }) {
  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg">Activity</h2>
      <ResponsiveContainer width={'80%'} height={300}>
 <BarChart
        width={500}
        height={300}
        data={budgetList}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" name="Amount" stackId="a" fill="#6366f1" />
        <Bar dataKey="totalSpend" name="Total Spend" stackId="a" fill="#c7d2fe" />
      </BarChart>
      </ResponsiveContainer>
     
    </div>
  );
}

export default BarChartDash;
