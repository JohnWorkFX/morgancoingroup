"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DashBoardNav from "../components/DashBoardNav";
import { LuMenuSquare } from "react-icons/lu";

// Placeholder asset data
const mockAssets = [
  {
    icon: "/images/coins/bitcoin.svg",
    name: "Bitcoin",
    symbol: "BTC",
    delisted: false,
    amount: 0.0778,
    usd: 0.0,
    price: null,
    costPrice: null,
    pnl: 0.0,
  },
  {
    icon: "/images/coins/binance.svg",
    name: "BNB",
    symbol: "BNB",
    delisted: false,
    amount: 0.00320702,
    usd: 1.94,
    price: 605.51,
    costPrice: 578.62,
    pnl: 0.02,
  },
  {
    icon: "/images/coins/usdt.svg",
    name: "TetherUS",
    symbol: "USDT",
    delisted: false,
    amount: 0.35964048,
    usd: 0.36,
    price: 1.0,
    costPrice: null,
    pnl: null,
  },
  {
    icon: "/images/coins/tron.svg",
    name: "TRON",
    symbol: "TRX",
    delisted: false,
    amount: 0.02612,
    usd: 0.01,
    price: 0.25,
    costPrice: 0.09,
    pnl: 0.0,
  },
  {
    icon: "/images/coins/usdc.svg",
    name: "USDC",
    symbol: "USDC",
    delisted: false,
    amount: 0.00387665,
    usd: 0.0,
    price: 1.0,
    costPrice: null,
    pnl: null,
  },
];

// Map asset symbols to CoinGecko IDs
const COINGECKO_IDS: Record<string, string> = {
  BTC: "bitcoin",
  BNB: "binancecoin",
  USDT: "tether",
  TRX: "tron",
  USDC: "usd-coin",
  // Add more as needed
};

const WalletPage = () => {
  const [search, setSearch] = useState("");
  const [hideSmall, setHideSmall] = useState(false);
  const [tab, setTab] = useState("Coin View");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [prices, setPrices] = useState<Record<string, number>>({});

  // Placeholder balance and PnL
  const btcBalance = 0.00002454;
  const usdBalance = 2.31;
  const todayPnl = 0.02;
  const todayPnlPercent = 0.83;

  // HTTP polling for real-time prices (every 60 seconds)
  useEffect(() => {
    const fetchPrices = async () => {
      const ids = Object.values(COINGECKO_IDS).join(",");
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        // Map CoinGecko IDs to asset symbols
        const newPrices: Record<string, number> = {};
        for (const [symbol, id] of Object.entries(COINGECKO_IDS)) {
          if (data[id] && data[id].usd) {
            newPrices[symbol] = data[id].usd;
          }
        }
        setPrices(newPrices);
      } catch (e) {
        // Optionally handle error
        console.log(e)
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // 60 seconds
    return () => clearInterval(interval);
  }, []);

  // Filtered assets
  const filteredAssets = mockAssets.filter((asset) => {
    if (hideSmall && asset.usd < 1) return false;
    if (
      search &&
      !asset.symbol.toLowerCase().includes(search.toLowerCase()) &&
      !asset.name.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

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
                    <span className="text-3xl font-bold">{btcBalance.toFixed(8)}</span>
                    <span className="text-gray-400 text-lg">BTC ▼</span>
                  </div>
                  <div className="text-gray-400">≈ ${usdBalance.toFixed(2)}</div>
                  <div className={`mt-1 text-sm ${todayPnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                    Today&apos;s PnL <span className="text-gray-400">🛈</span> {todayPnl >= 0 ? "+" : "-"}${Math.abs(todayPnl).toFixed(2)} ({todayPnlPercent >= 0 ? "+" : "-"}{Math.abs(todayPnlPercent).toFixed(2)}%)
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 w-full md:w-auto mt-6 md:mt-0">
                  <div className="flex gap-2">
                    <button className="bg-[#23262F] px-4 py-2 rounded text-white">Deposit</button>
                    <button className="bg-[#23262F] px-4 py-2 rounded text-white">Withdraw</button>
                    <button className="bg-[#23262F] px-4 py-2 rounded text-white">Transfer</button>
                  </div>
                  <div className="mt-4 md:mt-0">
                    {/* Placeholder for chart */}
                    <div className="h-16 w-32 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded"></div>
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
                      {/*  eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                      {filteredAssets.map((asset, idx) => {
                        let livePrice = null;
                        if (asset.symbol === "USDT" || asset.symbol === "USDC") {
                          livePrice = 1.0;
                        } else if (prices[asset.symbol]) {
                          livePrice = prices[asset.symbol];
                        }
                        const usdValue = livePrice !== null ? asset.amount * livePrice : null;
                        return (
                          <tr key={asset.symbol} className="border-t border-gray-800 hover:bg-[#23262F]">
                            <td className="py-3 flex items-center gap-2">
                              <img src={asset.icon} alt={asset.symbol} className="h-6 w-6 rounded-full bg-gray-700" />
                              <span>{asset.symbol}</span>
                            </td>
                            <td className="py-3">
                              {asset.amount}
                              <div className="text-gray-400 text-xs">
                                {usdValue !== null ? `$${usdValue.toFixed(2)}` : "--"}
                              </div>
                            </td>
                            <td className="py-3">
                              {livePrice !== null ? `$${livePrice}` : "--"}
                              {asset.costPrice !== null && (
                                <div className="text-gray-400 text-xs">${asset.costPrice}</div>
                              )}
                            </td>
                            <td className={`py-3 ${asset.pnl !== null ? (asset.pnl > 0 ? "text-green-500" : asset.pnl < 0 ? "text-red-500" : "text-gray-400") : "text-gray-400"}`}>
                              {asset.pnl !== null ? `${asset.pnl > 0 ? "+" : asset.pnl < 0 ? "-" : ""}$${Math.abs(asset.pnl).toFixed(2)}` : "--"}
                            </td>
                          </tr>
                        );
                      })}
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