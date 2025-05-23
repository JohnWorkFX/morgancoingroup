'use client'
import React, {useState, useEffect} from "react";
import { useSession } from "next-auth/react";

import BitCoinChart from "../components/BitCoinChart";
import MarketOverview from "../components/MarketOverview";
import Sidebar from "../components/Sidebar";
import DashBoardNav from "../components/DashBoardNav";
import { LuMenuSquare } from "react-icons/lu";

interface UsdData {
  investment: Record<string, number>;
  ROI: Record<string, number>;
  balance: Record<string, number>;
}

const Page = () => {
  const {data: session} = useSession()
  const [grandBalance, setGrandBalance] = useState(0)
  const [investment, setInvestment] = useState(0)
  const [ROI, setROI] = useState(0)
  const [usdData, setUsdData] = useState<UsdData | null>(null);
  const [prices, setPrices] = useState<Record<string, number>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);



  const COINGECKO_IDS: Record<string, string> = {
    BTC: "bitcoin",
    ETH: "ethereum",
    USDT: "tether",
    BNB: "binancecoin", // Replace with actual CoinGecko ID if available
  };

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

  useEffect(() => {
    if (session?.accessToken) {
      fetchBalance();
    }
  }, [session]);

  return (
    <>
      <DashBoardNav />
      <div className="min-h-screen bg-[#0C0D0F] text-white pt-16">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row">
          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden fixed top-20 left-4 z-40 bg-[#23262F] p-2 rounded-full shadow-lg"
            onClick={() => setShowMobileSidebar(true)}
            aria-label="Open sidebar"
          >
            <LuMenuSquare className="h-8 w-8 text-white" />
          </button>
          {/* Sidebar - hidden on small screens, overlay on mobile */}
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
              {/* Portfolio Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#1E2026] p-4 rounded-lg">
                  <h3 className="text-sm text-gray-400">Total Balance</h3>
                  <p className="text-2xl font-bold break-words">${grandBalance.toLocaleString()}</p>
                </div>
                <div className="bg-[#1E2026] p-4 rounded-lg">
                  <h3 className="text-sm text-gray-400">Total Investment</h3>
                  <p className="text-2xl font-bold break-words">${investment.toLocaleString()}</p>
                </div>
                <div className="bg-[#1E2026] p-4 rounded-lg">
                  <h3 className="text-sm text-gray-400">ROI</h3>
                  <p className="text-2xl font-bold break-words">${ROI.toLocaleString()}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-4   mb-6">
                <a href="/deposit" className="bg-green-700 p-2 rounded-md">Deposit</a>
                <a href="/withdraw" className="bg-white text-black p-2 rounded-md">Withdraw</a>
              </div>

              {/* Market Overview */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Market Overview</h2>
                <MarketOverview />
              </div>

              {/* Trading Chart */}
              <div className="bg-[#1E2026] rounded-lg p-2 sm:p-4 overflow-x-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                  <h2 className="text-xl font-bold">BTC/USDT</h2>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-gray-800 rounded">1H</button>
                    <button className="px-3 py-1 bg-gray-800 rounded">4H</button>
                    <button className="px-3 py-1 bg-gray-800 rounded">1D</button>
                    <button className="px-3 py-1 bg-gray-800 rounded">1W</button>
                  </div>
                </div>
                <div className="h-[250px] md:h-[400px] w-full">
                  <BitCoinChart />
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
