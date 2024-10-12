"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import DashBoardNav from "../components/DashBoardNav";
import DepositCrypto from "../components/DepositCrypto";
import WithdrawCrypto from "../components/WithdrawCrypto";

interface Transaction {
  id: number;
  user: number;
  transaction_type: string;
  status: string;
  amount: string;
  created_at: string;
  description: string;
}

const Page = () => {
  const { data: session } = useSession();
  const [grandBalance, setGrandBalance] = useState(0);
  const [investment, setInvestment] = useState(0);
  const [ROI, setROI] = useState(0);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchBalance = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transact/balance`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch balance");
      }

      const data = await response.json();
      console.log(data);
      setGrandBalance(data.data.balance);
      setInvestment(data.data.investment);
      setROI(data.data.ROI);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transact/transactions`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTransactions(data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchBalance();
      fetchTransactions();
    }
  }, [session]);
  return (
    <div>
      <DashBoardNav />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 text-white">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          <div className="rounded-lg border shadow-sm w-full ">
            <div className="flex flex-grow p-6 items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Wallet</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-dollar-sign h-4 w-4 text-white"
              >
                <line x1="12" x2="12" y1="2" y2="22"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div className="p-6 pt-0 flex w-full justify-between">
              <h3 className="text-2xl font-bold">${grandBalance}</h3>
              <div className="">
                <WithdrawCrypto />
              </div>
            </div>
          </div>
          <div className="rounded-lg border shadow-sm w-full ">
            <div className="flex flex-grow p-6 items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Total Investments
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-users h-4 w-4 text-white"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="p-6 pt-0">
              <h3 className="text-2xl font-bold">${investment}</h3>
            </div>
          </div>
          <div className="rounded-lg border shadow-sm w-full ">
            <div className="flex flex-grow p-6 items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">ROI</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-activity h-4 w-4 text-white"
              >
                <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
              </svg>
            </div>
            <div className="p-6 pt-0">
              <h3 className="text-2xl font-bold">${ROI}</h3>
            </div>
          </div>
          <div className="rounded-lg border shadow-sm w-full ">
            <div className="flex flex-grow p-6 items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">INVEST NOW</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-credit-card h-4 w-4 text-white"
              >
                <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                <line x1="2" x2="22" y1="10" y2="10"></line>
              </svg>
            </div>
            <div className="p-6 pt-0">
              <DepositCrypto />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center align-middle">
          <div className="rounded-lg border border-white shadow-lg xl:w-1/2 w-full min-h-[400px]   text-white">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Recent Transactions
              </h3>
              <p className="text-sm">
                View your recent transactions and investment activity.
              </p>
            </div>
            <div className="p-6 pt-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm  ">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-slate-600 data-[state=selected]:bg-slate-300">
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Date
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Amount
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Type
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b transition-colors hover:bg-slate-600"
                      >
                        <td className="p-4 align-middle">
                          {transaction.created_at}
                        </td>
                        <td className="p-4 align-middle">
                          ${transaction.amount}
                        </td>
                        <td className="p-4 align-middle">
                          {(transaction.transaction_type || "N/A").charAt(0).toUpperCase()  + transaction.transaction_type.slice(1)}
                        </td>
                        <td className="p-4 align-middle">
                          <div
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${
                              transaction.status === "confirmed"
                                ? "text-black bg-white"
                                : transaction.status === "failed" 
                                ? "text-red-600 bg-red-200" 
                                : "text-orange-600 bg-yellow-200" 
                            }`}
                          >
                            {transaction.status.charAt(0).toUpperCase() +
                              transaction.status.slice(1)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
