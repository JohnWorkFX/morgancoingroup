"use client";
import React, { useState, useEffect } from "react";
import DashBoardNav from "../components/DashBoardNav";
import { LuMenuSquare } from "react-icons/lu";
import { LuCopy } from "react-icons/lu";
import Sidebar from "../components/Sidebar";
import { QRCodeCanvas } from "qrcode.react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const coins = [
  { 
    symbol: "BTC", 
    name: "Bitcoin",
    address: "bc1qtm72dhtckhxgqf2pq58yg6l6pvpsr6fyw4mklp",
    icon: "/images/coins/bitcoin.svg",
    coingeckoId: "bitcoin",
    network: "bitcoin",
  },
  { 
    symbol: "ETH", 
    name: "Ethereum",
    address: "0xf08C039ECfFea6545fac33Da1A55803CFC4f5149",
    icon: "/images/coins/ethereum.svg",
    coingeckoId: "ethereum",
    network: "ethereum",
  },
  { 
    symbol: "USDT", 
    name: "Tether",
    address: "TZCWqBHrHaw1wFdBpqfsZ7xN29EQEt1rjt",
    icon: "/images/coins/usdt.svg",
    coingeckoId: "tether",
    network: "trc20",
  },
  { 
    symbol: "BNB", 
    name: "Binance Coin",
    address: "0xf08C039ECfFea6545fac33Da1A55803CFC4f5149",
    icon: "/images/coins/binance.svg",
    coingeckoId: "binancecoin",
    network: "binance-smart-chain",
  },
];

interface CoinPrice {
  [key: string]: {
    usd: number;
  };
}

const DepositPage = () => {
  const { data: session } = useSession();
  const [status, setStatus] = useState<'not_submitted' | 'pending' | 'success' | 'failed'>('not_submitted');
  const [form, setForm] = useState({
    coin: '',
    amount: '',
    txid: '',
  });
  const [submitting, setSubmitting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [activeCoin, setActiveCoin] = useState(coins[0]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [coinPrices, setCoinPrices] = useState<CoinPrice>({});
  const [usdAmount, setUsdAmount] = useState<string>('0.00');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const coinIds = coins.map(coin => coin.coingeckoId).join(',');
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`
        );
        const data = await response.json();
        setCoinPrices(data);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
    // Refresh prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (name === 'amount' && value) {
      const price = coinPrices[activeCoin.coingeckoId]?.usd || 0;
      const usdValue = (parseFloat(value) * price).toFixed(2);
      setUsdAmount(usdValue);
    } else if (name === 'amount' && !value) {
      setUsdAmount('0.00');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transact/invest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          coin: activeCoin.symbol,
          amount: form.amount,
          txid: form.txid,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to process deposit');
      }

      setStatus('success');
      // Reset form after successful submission
      setForm({
        coin: '',
        amount: '',
        txid: '',
      });
      setUsdAmount('0.00');
    } catch (err) {
      setStatus('failed');
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(activeCoin.address);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

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
              <div className="flex-1" onClick={() => setShowMobileSidebar(false)} />
            </div>
          )}

          {/* Main Content Area */}
          <div className={`flex-1 w-full ${isSidebarOpen ? 'md:ml-64' : ''}`}>
            <div className="p-6">
              <div className="w-full max-w-lg bg-[#1E2026] rounded-xl shadow p-6 mx-auto">
                <h2 className="text-2xl font-bold mb-2">Deposit Crypto</h2>
                <p className="text-gray-400 mb-6">Select the cryptocurrency you want to deposit and enter the amount. After sending your crypto, enter the transaction ID (TXID) for faster processing.</p>

                {/* Coin Tabs */}
                <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                  {coins.map((coin) => (
                    <button
                      key={coin.symbol}
                      onClick={() => setActiveCoin(coin)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        activeCoin.symbol === coin.symbol
                          ? 'bg-yellow-500 text-black'
                          : 'bg-[#23262F] text-white hover:bg-[#2C3038]'
                      }`}
                    >
                      <div className="w-6 h-6 relative">
                        <Image
                          src={coin.icon}
                          alt={coin.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span>{coin.symbol}</span>
                    </button>
                  ))}
                </div>

                {/* Current Price Display */}
                <div className="mb-6 p-4 bg-[#23262F] rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Current Price</span>
                    <span className="text-lg font-semibold">
                      ${coinPrices[activeCoin.coingeckoId]?.usd?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </div>

                {/* Wallet Address Section */}
                <div className="mb-6 p-4 bg-[#23262F] rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">Your {activeCoin.name} Address</h3>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center space-x-2 px-3 py-1 bg-[#2C3038] rounded hover:bg-[#363A42] transition-colors"
                    >
                      <LuCopy className="h-4 w-4" />
                      <span className="text-sm">{copySuccess ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="break-all text-sm text-gray-400 mb-4">
                    {activeCoin.address}
                  </div>
                  <div className="flex space-x-2 mb-4">
                    <h1>Network:</h1>
                    <h1 className="text-gray-400">{activeCoin.network}</h1>
                  </div>
                  <div className="flex justify-center p-4 bg-white rounded-lg">
                  <QRCodeCanvas value={ activeCoin.address} size={200} />
                   
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-500 text-sm">{error}</p>
                  </div>
                )}

                {/* Status Indicator */}
                <div className="mb-6">
                  {status === 'not_submitted' && <span className="px-3 py-1 rounded bg-gray-700 text-gray-300 text-xs">Not Submitted</span>}
                  {status === 'pending' && <span className="px-3 py-1 rounded bg-yellow-600 text-yellow-100 text-xs">Pending Confirmation</span>}
                  {status === 'success' && <span className="px-3 py-1 rounded bg-green-600 text-green-100 text-xs">Deposit Successful</span>}
                  {status === 'failed' && <span className="px-3 py-1 rounded bg-red-600 text-red-100 text-xs">Deposit Failed</span>}
                </div>

                {/* Deposit Form */}
                {status === 'not_submitted' && (
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-sm mb-1">Amount</label>
                      <div className="relative">
                        <input
                          type="number"
                          name="amount"
                          value={form.amount}
                          onChange={handleChange}
                          required
                          min="0.0001"
                          step="any"
                          className="w-full rounded bg-[#23262F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                          {activeCoin.symbol}
                        </div>
                      </div>
                      {form.amount && (
                        <div className="mt-2 text-sm text-gray-400">
                          ≈ ${usdAmount} USD
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Transaction ID (TXID)</label>
                      <input
                        type="text"
                        name="txid"
                        value={form.txid}
                        onChange={handleChange}
                        placeholder="Paste your TXID after sending crypto"
                        className="w-full rounded bg-[#23262F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Processing...' : 'Deposit'}
                    </button>
                  </form>
                )}

                {status === 'pending' && (
                  <div className="text-yellow-200 text-center py-8">
                    <p>Your deposit is being processed. Please wait...</p>
                  </div>
                )}

                {status === 'success' && (
                  <div className="text-green-300 text-center py-8">
                    <p>Your deposit was successful! Funds will appear in your wallet soon.</p>
                    <button
                      className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded transition"
                      onClick={() => setStatus('not_submitted')}
                    >
                      Make Another Deposit
                    </button>
                  </div>
                )}

                {status === 'failed' && (
                  <div className="text-red-300 text-center py-8">
                    <p>{error || 'Your deposit failed. Please check your transaction and try again.'}</p>
                    <button
                      className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded transition"
                      onClick={() => {
                        setStatus('not_submitted');
                        setError('');
                      }}
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepositPage; 