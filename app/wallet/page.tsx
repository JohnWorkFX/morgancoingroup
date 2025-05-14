"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import DashBoardNav from "../components/DashBoardNav";
import { LuMenuSquare } from "react-icons/lu";

// Map asset symbols to CoinGecko IDs
const COINGECKO_IDS: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  USDT: "tether",
  BNB: "binancecoin", // Replace with actual CoinGecko ID if available
};

// interface UsdData {
//   investment: Record<string, number>;
//   ROI: Record<string, number>;
//   balance: Record<string, number>;
// }

const WalletPage = () => {
  const {data: session} = useSession()
  const [search, setSearch] = useState("");
  const [hideSmall, setHideSmall] = useState(false);
  const [tab, setTab] = useState("Coin View");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [prices, setPrices] = useState<Record<string, number>>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [assets, setAssets] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  // Fetch user assets
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/assets`);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/assets`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`, 
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch assets');
        }
        const data = await response.json();
        setAssets(data);
        console.log(data)
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch assets');
        console.error(err);
        setLoading(false);
      }
    };
    fetchAssets();
  }, [session?.accessToken]);

  // HTTP polling for real-time prices (every 60 seconds)
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
        console.error('Failed to fetch prices:', e);
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 6000);
    return () => clearInterval(interval);
  }, []);

  // Calculate USD values and update assets
  useEffect(() => {
    if (assets.length > 0 && Object.keys(prices).length > 0) {
      const updatedAssets = assets.map(asset => {
        const livePrice = prices[asset.symbol] ?? (asset.symbol === "USDT" ? 1.0 : null);
        const usdValue = livePrice !== null ? asset.amount * livePrice : null;
        return {
          ...asset,
          usd: usdValue,
          price: livePrice
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

  // Calculate total balance and PnL
  const totalBalance = filteredAssets.reduce((sum, asset) => sum + (asset.usd ?? 0), 0);
  const totalPnl = filteredAssets.reduce((sum, asset) => sum + (asset.pnl ?? 0), 0);
  const pnlPercentage = totalBalance > 0 ? (totalPnl / totalBalance) * 100 : 0;

  // if (loading) {
  //   return <div className="min-h-screen bg-[#0C0D0F] text-white pt-16">Loading...</div>;
  // }

  // if (error) {
  //   return <div className="min-h-screen bg-[#0C0D0F] text-white pt-16">Error: {error}</div>;
  // }


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
              {/* Estimated Balance Card */}
              <div className="bg-[#1E2026] rounded-xl p-6 flex flex-col md:flex-row justify-between items-center mb-8 shadow">
                <div className="w-full md:w-auto">
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    Estimated Balance <span className="text-gray-400 cursor-pointer">🛈</span>
                  </div>
                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-3xl font-bold">${totalBalance.toFixed(2)}</span>
                  </div>
                  <div className={`mt-1 text-sm ${totalPnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                    Today&apos;s PnL <span className="text-gray-400">🛈</span> {totalPnl >= 0 ? "+" : "-"}${Math.abs(totalPnl).toFixed(2)} ({pnlPercentage >= 0 ? "+" : "-"}{Math.abs(pnlPercentage).toFixed(2)}%)
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 w-full md:w-auto mt-6 md:mt-0">
                  <div className="flex gap-2">
                    <a href="/deposit" className="block">
                    <button className="bg-[#23262F] px-4 py-2 rounded text-white">Deposit</button>
                    </a>
                    <a href="/withdraw" className="block"><button className="bg-[#23262F] px-4 py-2 rounded text-white">Withdraw</button></a>
                    <button className="bg-[#23262F] px-4 py-2 rounded text-white">Transfer</button>
                  </div>
                </div>
              </div>

              {/* My Assets Card */}
              <div className="bg-[#1E2026] rounded-xl p-6 shadow">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                  <h2 className="text-2xl font-bold w-full md:w-auto">My Assets</h2>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <input
                      type="text"
                      placeholder="Search"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="bg-[#23262F] rounded px-3 py-1 text-white w-40"
                    />
                    <label className="flex items-center gap-1 text-gray-400 text-sm">
                      <input type="checkbox" className="accent-yellow-500" checked={hideSmall} onChange={e => setHideSmall(e.target.checked)} />
                      Hide assets &lt; 1 USD
                    </label>
                  </div>
                </div>
                <div className="flex gap-6 border-b border-gray-700 mb-4">
                  <button
                    className={`pb-2 border-b-2 font-semibold ${tab === "Coin View" ? "border-yellow-500 text-yellow-500" : "border-transparent text-gray-400"}`}
                    onClick={() => setTab("Coin View")}
                  >
                    Coin View
                  </button>
                  <button
                    className={`pb-2 font-semibold ${tab === "Account View" ? "text-yellow-500" : "text-gray-400"}`}
                    onClick={() => setTab("Account View")}
                  >
                    Account View
                  </button>
                </div>
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[600px]">
                    <thead>
                      <tr className="text-gray-400 text-sm">
                        <th className="py-2 font-normal">Coin</th>
                        <th className="py-2 font-normal">Amount</th>
                        <th className="py-2 font-normal">Coin Price / Cost Price</th>
                        <th className="py-2 font-normal">Today&apos;s PnL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAssets.length === 0 && (
                        <tr>
                          <td colSpan={4} className="text-center text-gray-500 py-8">No assets found.</td>
                        </tr>
                      )}
                      {filteredAssets.map((asset) => (
                        <tr key={asset.symbol} className="border-t border-gray-800 hover:bg-[#23262F]">
                          <td className="py-3 flex items-center gap-2">
                            <img src={asset.icon} alt={asset.symbol} className="h-6 w-6 rounded-full bg-gray-700" />
                            <span>{asset.symbol}</span>
                          </td>
                          <td className="py-3">
                            {asset.amount}
                            <div className="text-gray-400 text-xs">
                              {asset.usd !== null ? `$${asset.usd.toFixed(2)}` : "--"}
                            </div>
                          </td>
                          <td className="py-3">
                            {asset.price !== null ? `$${asset.price}` : "--"}
                            {asset.costPrice !== null && (
                              <div className="text-gray-400 text-xs">${asset.costPrice}</div>
                            )}
                          </td>
                          <td className={`py-3 ${asset.pnl !== null ? (asset.pnl > 0 ? "text-green-500" : asset.pnl < 0 ? "text-red-500" : "text-gray-400") : "text-gray-400"}`}>
                            {asset.pnl !== null ? `${asset.pnl > 0 ? "+" : asset.pnl < 0 ? "-" : ""}$${Math.abs(asset.pnl).toFixed(2)}` : "--"}
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
    </>
  );
};

export default WalletPage; 