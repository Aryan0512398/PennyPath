"use client";
import React from "react";
import { CheckCircle, XCircle, Star, ShieldCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const plans = [
  {
    name: "Free",
    price: "₹0",
    features: [
      "1 Budget",
      "Manual Expense Tracking",
      "Basic Stats",
    ],
    disabled: [
      "AI Insights",
      "Data Export",
      "Priority Support",
    ],
  },
  {
    name: "Pro",
    price: "₹199/month",
    features: [
      "Unlimited Budgets",
      "AI Spending Insights",
      "Data Export (CSV, PDF)",
      "Email Reminders",
      "Priority Support",
    ],
    badge: "Most Popular",
  },
];

const faqs = [
  {
    question: "Will I lose data if I cancel Pro?",
    answer: "No, your data is safe and will remain accessible with limited features.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes, you can request a refund within 7 days if you're not satisfied.",
  },
];

export default function UpgradePage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      {/* Hero */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-gray-800">Upgrade to Pro 🚀</h1>
        <p className="text-gray-600 text-sm md:text-base">Get access to premium features that help you take control of your finances.</p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan, index) => (
          <div key={index} className="border rounded-xl p-6 space-y-4 shadow hover:shadow-lg transition">
            {plan.badge && (
              <div className="text-xs inline-block bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full mb-2">
                {plan.badge}
              </div>
            )}
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-2xl font-bold text-indigo-600">{plan.price}</p>
            <div className="space-y-2">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> {feature}
                </div>
              ))}
              {plan.disabled?.map((feature, i) => (
                <div key={i} className="flex items-center text-sm text-gray-400 line-through">
                  <XCircle className="w-4 h-4 text-red-400 mr-2" /> {feature}
                </div>
              ))}
            </div>
            <Button onClick={()=> toast(plan.name === "Pro"?<div>
      <p className="font-semibold">🚧 Coming Soon</p>
      <p className="text-xs text-gray-500">This feature is under development. Stay tuned!</p>
    </div>:"You're already on the Free plan."
    
  )}  className="cursor-pointer  w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md text-sm font-medium" >
              {plan.name === "Pro" ? "Upgrade Now" : "Current Plan"}
            </Button>
          </div>
        ))}
      </div>

      {/* Feature Highlights */}
      <div className="grid md:grid-cols-3 gap-6">
        <Feature  icon={<Star />} title="Smart Insights" text="AI detects spending patterns and gives actionable advice." />
        <Feature icon={<ShieldCheck />} title="Data Backup" text="All your data is securely backed up in the cloud." />
        <Feature icon={<CheckCircle />} title="Priority Support" text="Get answers faster with premium customer support." />
      </div>

      {/* FAQs */}
      <div className="bg-gray-50 p-6 rounded-xl border space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-500" /> Frequently Asked Questions
        </h3>
        {faqs.map((faq, i) => (
          <div key={i}>
            <p className="font-medium text-gray-800">{faq.question}</p>
            <p className="text-sm text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const Feature = ({ icon, title, text }) => (
  <div className="bg-white p-5 rounded-lg shadow border space-y-2 text-center">
    <div className="flex justify-center text-indigo-600">{icon}</div>
    <h4 className="font-semibold">{title}</h4>
    <p className="text-sm text-gray-600">{text}</p>
  </div>
);
