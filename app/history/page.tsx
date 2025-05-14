"use client";
import React, { useState, useEffect } from "react";
import { LuMenuSquare } from "react-icons/lu";
import { useSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
// import DepositCrypto from "../components/DepositCrypto";
// import WithdrawCrypto from "../components/WithdrawCrypto";
import TransactionHistory from "../components/TransactionHistory";
import TradeHistory from "../components/TradeHistory";
import DashBoardNav from "../components/DashBoardNav";

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
    status: "pending" | "completed" | "cancelled";
    amount: string;
    created_at: string;
    description: string;
    date: string;
    coin: string;
  };
  open_price: string;
  closing_price: string;
}
interface UsdData {
  investment: Record<string, number>;
  ROI: Record<string, number>;
  balance: Record<string, number>;
}

const COINGECKO_IDS: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  USDT: "tether",
  BNB: "binancecoin", // Replace with actual CoinGecko ID if available
};

const Page = () => {
  const { data: session } = useSession();

  
  const [grandBalance, setGrandBalance] = useState(0);
  const [investment, setInvestment] = useState(0);
  const [ROI, setROI] = useState(0);
  const [usdData, setUsdData] = useState<UsdData | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [activeTab, setActiveTab] = useState<"transactions" | "trades">(
    "transactions"
  );
  const [prices, setPrices] = useState<Record<string, number>>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [assets, setAssets] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hideSmall, setHideSmall] = useState(false);

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
      setUsdData(data.data);
      // setGrandBalance(data.data.balance);
      // setInvestment(data.data.investment);
      // setROI(data.data.ROI);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    const fetchPrices = async () => {
      const ids = Object.values(COINGECKO_IDS).join(",");
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

      try {
        const res = await fetch(url);
        const priceData = await res.json();

        const prices: Record<string, number> = {};
        for (const [symbol, id] of Object.entries(COINGECKO_IDS)) {
          if (priceData[id] && priceData[id].usd) {
            prices[symbol] = priceData[id].usd;
          }
        }

        setPrices(prices);
      } catch (e) {
        console.error("Failed to fetch prices:", e);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

useEffect(() => {
  if (!usdData || !prices || Object.keys(prices).length === 0) return;

  const convertToUSD = (section: Record<string, number>) => {
    let total = 0;
    for (const [coin, amount] of Object.entries(section)) {
      const price = prices[coin] ?? 0;
      total += amount * price;
    }
    return parseFloat(total.toFixed(2));
  };

  const totalBalance = convertToUSD(usdData.balance);
  const totalInvestment = convertToUSD(usdData.investment);
  const totalROI = convertToUSD(usdData.ROI);

  setGrandBalance(totalBalance);
  setInvestment(totalInvestment);
  setROI(totalROI);
}, [usdData, prices]);



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
      console.log(data);
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
      console.log(data);
      setTrades(data);
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  };

  const fetchAssets = async () => {
    try {
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/assets`);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/assets`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch assets");
      }
      const data = await response.json();
      setAssets(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch assets");
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPrices = async () => {
      const ids = Object.values(COINGECKO_IDS).join(",");
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        const newPrices: Record<string, number> = {};
        for (const [symbol, id] of Object.entries(COINGECKO_IDS)) {
          if (data[id] && data[id].usd) {
            newPrices[symbol] = data[id].usd;
          }
        }
        setPrices(newPrices);
      } catch (e) {
        console.error("Failed to fetch prices:", e);
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (assets.length > 0 && Object.keys(prices).length > 0) {
      const updatedAssets = assets.map((asset) => {
        const livePrice =
          prices[asset.symbol] ?? (asset.symbol === "USDT" ? 1.0 : null);
        const usdValue = livePrice !== null ? asset.amount * livePrice : null;
        return {
          ...asset,
          usd: usdValue,
          price: livePrice,
        };
      });
      setAssets(updatedAssets);
    }
  }, [prices]);

  // Filtered assets
  const filteredAssets = assets.filter((asset) => {
    const usdValue = asset.usd ?? 0;
    if (hideSmall && usdValue < 1) return false;
    if (
      search &&
      !asset.symbol.toLowerCase().includes(search.toLowerCase()) &&
      !asset.name.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  useEffect(() => {
    if (session?.accessToken) {
      fetchBalance();
      fetchTransactions();
      fetchTrades();
      fetchAssets();
    }
  }, [session]);
  const totalBalance = filteredAssets.reduce(
    (sum, asset) => sum + (asset.usd ?? 0),
    0
  );
  const totalPnl = filteredAssets.reduce(
    (sum, asset) => sum + (asset.pnl ?? 0),
    0
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pnlPercentage = totalBalance > 0 ? (totalPnl / totalBalance) * 100 : 0;

  return (
    <>
      <div className="min-h-screen bg-[#0C0D0F] text-white">
        {/* Top Navigation */}
        <DashBoardNav />

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden fixed top-20 left-4 z-40 bg-[#23262F] p-2 rounded-full shadow-lg"
          onClick={() => setShowMobileSidebar(true)}
          aria-label="Open sidebar"
        >
          <LuMenuSquare className="h-8 w-8 text-white" />
        </button>
        {/* Main Content */}
        <div className="flex pt-16">
          {/* Sidebar */}
          <div className="hidden md:block">
            <Sidebar isSidebarOpen={isSidebarOpen} />
          </div>
          {/* Mobile Sidebar Overlay */}
          {showMobileSidebar && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex">
              <div className="w-64 bg-[#1E2026] h-full shadow-lg animate-slide-in-left">
                <Sidebar isSidebarOpen={true} />
              </div>
              <div
                className="flex-1"
                onClick={() => setShowMobileSidebar(false)}
              />
            </div>
          )}

          {/* Main Content Area */}
          <div className={`flex-1 w-full ${isSidebarOpen ? "md:ml-64" : ""}`}>
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
                <div className="rounded-lg border shadow-sm w-full">
                  <div className="flex flex-grow p-6 items-center justify-between space-y-0 pb-2">
                    <h3 className="tracking-tight text-sm font-medium">
                      Wallet
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
                      className="lucide lucide-dollar-sign h-4 w-4 text-white"
                    >
                      <line x1="12" x2="12" y1="2" y2="22"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <div className="p-6 pt-0 flex w-full justify-between">
                    <h3 className="text-2xl font-bold">${grandBalance.toLocaleString()}</h3>
                    <a href="/withdraw" className="block">
                      {/* <WithdrawCrypto /> */}
                      <button className="text-custom-green border border-custom-green py-2 px-4 text-xs rounded-md">
                        withdraw
                      </button>
                    </a>
                  </div>
                </div>
                <div className="rounded-lg border shadow-sm w-full">
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
                  <div className="p-6 pt-0">
                    <h3 className="text-2xl font-bold">${investment.toLocaleString()}</h3>
                  </div>
                </div>
                <div className="rounded-lg border shadow-sm w-full">
                  <div className="flex flex-grow p-6 items-center justify-between space-y-0 pb-2">
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
                  <div className="p-6 pt-0">
                    <h3 className="text-2xl font-bold">${ROI.toLocaleString()}</h3>
                  </div>
                </div>
                <div className="rounded-lg border shadow-sm w-full">
                  <div className="flex flex-grow p-6 items-center justify-between space-y-0 pb-2">
                    <h3 className="tracking-tight text-sm font-medium">
                      INVEST NOW
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
                      className="lucide lucide-credit-card h-4 w-4 text-white"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                      <line x1="2" x2="22" y1="10" y2="10"></line>
                    </svg>
                  </div>
                  <a href="/deposit" className="p-6 pt-0">
                    {/* <DepositCrypto /> */}
                    <button className="bg-custom-green text-black py-2 px-4 text-sm rounded-md">Deposit</button>
                  </a>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex flex-col mt-8">
                <div className="flex border-b border-[#23242a]">
                  <button
                    onClick={() => setActiveTab("transactions")}
                    className={`relative py-2 px-4 text-base font-medium focus:outline-none transition-colors
                    ${
                      activeTab === "transactions"
                        ? "text-[#F0B90B]"
                        : "text-gray-400 hover:text-gray-200"
                    }
                  `}
                    style={{ marginRight: "24px" }}
                  >
                    Transaction History
                    {activeTab === "transactions" && (
                      <span className="absolute left-0 -bottom-[1px] w-full h-1 bg-[#F0B90B] rounded-t"></span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("trades")}
                    className={`relative py-2 px-4 text-base font-medium focus:outline-none transition-colors
                    ${
                      activeTab === "trades"
                        ? "text-[#F0B90B]"
                        : "text-gray-400 hover:text-gray-200"
                    }
                  `}
                  >
                    Trade History
                    {activeTab === "trades" && (
                      <span className="absolute left-0 -bottom-[1px] w-full h-1 bg-[#F0B90B] rounded-t"></span>
                    )}
                  </button>
                </div>
                <div className="mt-6">
                  {activeTab === "transactions" ? (
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
