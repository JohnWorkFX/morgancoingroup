"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import DepositCrypto from "../components/DepositCrypto";
import WithdrawCrypto from "../components/WithdrawCrypto";
import TransactionHistory from "../components/TransactionHistory";
import TradeHistory from "../components/TradeHistory";
import DashBoardNav from "../components/DashBoardNav";
import { LuMenuSquare } from "react-icons/lu";

interface Transaction {
  id: number;
  user: number;
  transaction_type: string;
  status: string;
  amount: string;
  created_at: string;
  coin: string;
  description: string;
}

interface Trade {
  id: number;
  user: number;
  username: string;
  trade_type: "buy" | "sell";
  coin: string;
  amount_invested: string;
  profit_earned: string;
  strategy: string | null;
  trade_date: string; // ISO string date
  transaction: {
    id: number;
    user: number;
    transaction_type: string;
    status: 'pending' | 'completed' | 'cancelled';
    amount: string;
    created_at: string;
    description: string;
    date: string;
    coin: string;
  };
  open_price: string;
  closing_price: string;
}

const Page = () => {
  const { data: session } = useSession();
  const [grandBalance, setGrandBalance] = useState(0);
  const [investment, setInvestment] = useState(0);
  const [ROI, setROI] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [activeTab, setActiveTab] = useState<'transactions' | 'trades'>('transactions');

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
      console.log(data)
      setTransactions(data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchTrades = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transact/trades`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch trades");
      }

      const data = await response.json();
      setTrades(data.data);
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchBalance();
      fetchTransactions();
      fetchTrades();
    }
  }, [session]);

  return (
    <>
      <DashBoardNav />
      <div className="min-h-screen bg-[#0C0D0F] text-white pt-16">
        <div className="flex flex-col md:flex-row">
          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden fixed top-20 left-4 z-40 bg-[#23262F] p-2 rounded-full shadow-lg"
            onClick={() => setShowMobileSidebar(true)}
            aria-label="Open sidebar"
          >
            <LuMenuSquare className="h-8 w-8 text-white" />
          </button>
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <Sidebar isSidebarOpen={isSidebarOpen} />
          </div>
          {/* Mobile Sidebar Overlay */}
          {showMobileSidebar && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex">
              <div className="w-64 bg-[#1E2026] h-full shadow-lg animate-slide-in-left">
                <Sidebar isSidebarOpen={true} />
              </div>
              <div className="flex-1" onClick={() => setShowMobileSidebar(false)} />
            </div>
          )}
          {/* Main Content Area */}
          <div className={`flex-1 w-full ${isSidebarOpen ? 'md:ml-64' : ''}`}>
            <div className="p-2 sm:p-4 md:p-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8 mb-6">
                <div className="rounded-lg border shadow-sm w-full">
                  <div className="flex flex-grow p-4 sm:p-6 items-center justify-between space-y-0 pb-2">
                    <h3 className="tracking-tight text-sm font-medium">Wallet</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-dollar-sign h-4 w-4 text-white"
                    >
                      <line x1="12" x2="12" y1="2" y2="22"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <div className="p-4 sm:p-6 pt-0 flex w-full justify-between">
                    <h3 className="text-2xl font-bold">${grandBalance}</h3>
                    <div className="">
                      <WithdrawCrypto />
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border shadow-sm w-full">
                  <div className="flex flex-grow p-4 sm:p-6 items-center justify-between space-y-0 pb-2">
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-users h-4 w-4 text-white"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="p-4 sm:p-6 pt-0">
                    <h3 className="text-2xl font-bold">${investment}</h3>
                  </div>
                </div>
                <div className="rounded-lg border shadow-sm w-full">
                  <div className="flex flex-grow p-4 sm:p-6 items-center justify-between space-y-0 pb-2">
                    <h3 className="tracking-tight text-sm font-medium">ROI</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-activity h-4 w-4 text-white"
                    >
                      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
                    </svg>
                  </div>
                  <div className="p-4 sm:p-6 pt-0">
                    <h3 className="text-2xl font-bold">${ROI}</h3>
                  </div>
                </div>
                <div className="rounded-lg border shadow-sm w-full">
                  <div className="flex flex-grow p-4 sm:p-6 items-center justify-between space-y-0 pb-2">
                    <h3 className="tracking-tight text-sm font-medium">INVEST NOW</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-credit-card h-4 w-4 text-white"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                      <line x1="2" x2="22" y1="10" y2="10"></line>
                    </svg>
                  </div>
                  <div className="p-4 sm:p-6 pt-0">
                    <DepositCrypto />
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-8">
                <div className="flex border-b border-[#23242a] overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('transactions')}
                    className={`relative py-2 px-4 text-base font-medium focus:outline-none transition-colors
                      ${activeTab === 'transactions'
                        ? 'text-[#F0B90B]'
                        : 'text-gray-400 hover:text-gray-200'}
                    `}
                    style={{ marginRight: '24px' }}
                  >
                    Transaction History
                    {activeTab === 'transactions' && (
                      <span className="absolute left-0 -bottom-[1px] w-full h-1 bg-[#F0B90B] rounded-t"></span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('trades')}
                    className={`relative py-2 px-4 text-base font-medium focus:outline-none transition-colors
                      ${activeTab === 'trades'
                        ? 'text-[#F0B90B]'
                        : 'text-gray-400 hover:text-gray-200'}
                    `}
                  >
                    Trade History
                    {activeTab === 'trades' && (
                      <span className="absolute left-0 -bottom-[1px] w-full h-1 bg-[#F0B90B] rounded-t"></span>
                    )}
                  </button>
                </div>
                <div className="mt-6 overflow-x-auto">
                  {activeTab === 'transactions' ? (
                    <TransactionHistory transactions={transactions} />
                  ) : (
                    <TradeHistory trades={trades} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page; 