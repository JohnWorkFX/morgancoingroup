"use client";
import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import DashBoardNav from "../components/DashBoardNav";
import { useSession } from "next-auth/react";


// Types
interface User {
  id: number;
  username: string;
  email: string;
  fullname: string;
  kyc_verified: boolean;
  kyc_verified_date: string | null;
}

interface Transaction {
  id: number;
  user: {
    id: number;
    email: string;
    username: string;
  };
  transaction_type: 'investment' | 'withdrawal' | 'ROI';
  status: 'pending' | 'confirmed' | 'failed';
  amount: number;
  date: string;
  created_at: string;
  coin: string;
}


interface TradeRecord {
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
const AdminPage = () => {
  // const router = useRouter();
  const {data: session} = useSession()
  const [activeTab, setActiveTab] = useState<'users' | 'transactions' | 'trades'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [trades, setTrades] = useState<TradeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (activeTab === 'users') {
          // Fetch users
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin/users`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer  ${session?.accessToken}`,
              "Content-Type": "application/json",
            }
          });
          
          
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          
          const data = await response.json();
          setUsers(data.data || []);
        } else if (activeTab === 'transactions') {
          // Fetch transactions
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transact/admin/transactions`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer  ${session?.accessToken}`,
              "Content-Type": "application/json",
            }
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch transactions');
          }
          
          const data = await response.json();
          console.log(data)
          setTransactions(data.data || []);
        } else if (activeTab === 'trades') {
          // Fetch trades
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transact/admin/trades`, {
            headers: {
              'Authorization': `Bearer  ${session?.accessToken}`
            }
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch trades');
          }
          
          const data = await response.json();
          console.log(data)
          setTrades(data || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [activeTab, session?.accessToken]);

  // Handle KYC verification status update
  const handleKycStatusUpdate = async (userId: number, verified: boolean) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/kyc`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer  ${session?.accessToken}`
        },
        body: JSON.stringify({ kyc_verified: verified })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update KYC status');
      }
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId 
          ? { 
              ...user, 
              kyc_verified: verified,
              kyc_verified_date: verified ? new Date().toISOString() : null
            } 
          : user
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    }
  };

  // Handle transaction status update
  const handleTransactionStatusUpdate = async (transactionId: number, status: 'pending' | 'confirmed' | 'failed') => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transact/admin/transactions/${transactionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer  ${session?.accessToken}`
        },
        body: JSON.stringify({ status })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update transaction status');
      }
      
      // Update local state
      setTransactions(transactions.map(transaction => 
        transaction.id === transactionId 
          ? { ...transaction, status } 
          : transaction
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    }
  };

  // Handle trade status update
  const handleTradeStatusUpdate = async (tradeId: number, status: 'pending' | 'completed' | 'cancelled') => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/trades/${tradeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer  ${session?.accessToken}`
        },
        body: JSON.stringify({ status })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update trade status');
      }
      
      // Update local state
      setTrades(trades.map(trade => 
        trade.id === tradeId 
          ? { ...trade, status } 
          : trade
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    }
  };

  // Create a new trade record
  const handleCreateTrade = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transact/admin/createtrades`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify({
          user_id: formData.get('user_id'),
          coin: formData.get('coin'),
          amount_invested: formData.get('amount'),
          profit_earned: formData.get('profit'),
          trade_type: formData.get('type'),
          status: formData.get('status'),
          open_price: formData.get('open_price'),
          closing_price: formData.get('closing_price')
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create trade record');
      }
      
      const data = await response.json();
      console.log(data);
      
      // Update local state
      setTrades([...trades, data.data]);
      
      // Reset form
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    }
  };

  return (
    <>
      <DashBoardNav />
      <div className="min-h-screen bg-[#0C0D0F] text-white pt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-700 mb-6">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'users' 
                  ? 'border-b-2 border-yellow-500 text-yellow-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'transactions' 
                  ? 'border-b-2 border-yellow-500 text-yellow-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('transactions')}
            >
              Transactions
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'trades' 
                  ? 'border-b-2 border-yellow-500 text-yellow-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('trades')}
            >
              Trades
            </button>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          {/* Loading state */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
          ) : (
            <>
              {/* Users Tab */}
              {activeTab === 'users' && (
                <div className="bg-[#1E2026] rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h2 className="text-xl font-semibold">User Management</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-[#23262F]">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">KYC Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {users.map(user => (
                          <tr key={user.id} className="hover:bg-[#23262F]">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium">{user.fullname}</div>
                              <div className="text-sm text-gray-400">{user.username}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {user.kyc_verified ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-200">
                                  Verified
                                </span>
                              ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-900 text-red-200">
                                  Not Verified
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button
                                onClick={() => handleKycStatusUpdate(user.id, !user.kyc_verified)}
                                className={`mr-2 px-3 py-1 rounded ${
                                  user.kyc_verified 
                                    ? 'bg-red-900 text-red-200 hover:bg-red-800' 
                                    : 'bg-green-900 text-green-200 hover:bg-green-800'
                                }`}
                              >
                                {user.kyc_verified ? 'Revoke KYC' : 'Approve KYC'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Transactions Tab */}
              {activeTab === 'transactions' && (
                <div className="bg-[#1E2026] rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h2 className="text-xl font-semibold">Transaction Management</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-[#23262F]">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {transactions.map(transaction => (
                          <tr key={transaction.id} className="hover:bg-[#23262F]">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium">{transaction.user.username}</div>
                              <div className="text-sm text-gray-400">{transaction.user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                transaction.transaction_type === 'investment' 
                                  ? 'bg-blue-900 text-blue-200' 
                                  : transaction.transaction_type === 'withdrawal'
                                    ? 'bg-purple-900 text-purple-200'
                                    : 'bg-green-900 text-green-200'
                              }`}>
                                {transaction.transaction_type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{transaction.amount} {transaction.coin}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                transaction.status === 'confirmed' 
                                  ? 'bg-green-900 text-green-200' 
                                  : transaction.status === 'failed'
                                    ? 'bg-red-900 text-red-200'
                                    : 'bg-yellow-900 text-yellow-200'
                              }`}>
                                {transaction.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {new Date(transaction.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <select
                                value={transaction.status}
                                onChange={(e) => handleTransactionStatusUpdate(transaction.id, e.target.value as 'pending' | 'confirmed' | 'failed')}
                                className="bg-[#23262F] border border-gray-700 rounded px-2 py-1 text-sm"
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="failed">Failed</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Trades Tab */}
              {activeTab === 'trades' && (
                <div className="space-y-6">
                  {/* Create Trade Form */}
                  <div className="bg-[#1E2026] rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-700">
                      <h2 className="text-xl font-semibold">Create Trade Record</h2>
                    </div>
                    <div className="p-6">
                      <form onSubmit={handleCreateTrade} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">User ID</label>
                          <input
                            type="number"
                            name="user_id"
                            required
                            className="w-full rounded bg-[#23262F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Coin</label>
                          <select
                            name="coin"
                            required
                            className="w-full rounded bg-[#23262F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          >
                            <option value="BTC">Bitcoin (BTC)</option>
                            <option value="ETH">Ethereum (ETH)</option>
                            <option value="USDT">Tether (USDT)</option>
                            <option value="BNB">Binance Coin (BNB)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Amount</label>
                          <input
                            type="number"
                            name="amount"
                            step="0.000001"
                            required
                            className="w-full rounded bg-[#23262F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Profit (USD)</label>
                          <input
                            type="number"
                            name="profit"
                            step="0.01"
                            required
                            className="w-full rounded bg-[#23262F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Type</label>
                          <select
                            name="type"
                            required
                            className="w-full rounded bg-[#23262F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          >
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Status</label>
                          <select
                            name="status"
                            required
                            className="w-full rounded bg-[#23262F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Opening Price</label>
                          <input
                            type="number"
                            name="open_price"
                            step="0.01"
                            required
                            className="w-full rounded bg-[#23262F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Closing Price</label>
                          <input
                            type="number"
                            name="closing_price"
                            step="0.01"
                            required
                            className="w-full rounded bg-[#23262F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          />
                        </div>
                        <div className="md:col-span-2 lg:col-span-3">
                          <button
                            type="submit"
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded transition"
                          >
                            Create Trade Record
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  
                  {/* Trades Table */}
                  <div className="bg-[#1E2026] rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-700">
                      <h2 className="text-xl font-semibold">Trade Records</h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-[#23262F]">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Coin</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Opening Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Closing Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Profit Earned</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {trades.map(trade => (
                            <tr key={trade.id} className="hover:bg-[#23262F]">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium">{trade.username}</div>
                                {/* <div className="text-sm text-gray-400">{trade.user.email}</div> */}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">{trade.coin}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">{trade.amount_invested}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">${trade.open_price}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">${trade.closing_price}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  trade.trade_type === 'buy' 
                                    ? 'bg-green-900 text-green-200' 
                                    : 'bg-red-900 text-red-200'
                                }`}>
                                  {trade.trade_type}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  trade.transaction.status === 'completed' 
                                    ? 'bg-green-900 text-green-200' 
                                    : trade.transaction.status === 'cancelled'
                                      ? 'bg-red-900 text-red-200'
                                      : 'bg-yellow-900 text-yellow-200'
                                }`}>
                                  {trade.transaction.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">{trade.profit_earned} {trade.coin}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {new Date(trade.transaction.date).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <select
                                  value={trade.transaction.status}
                                  onChange={(e) => handleTradeStatusUpdate(trade.id, e.target.value as 'pending' | 'completed' | 'cancelled')}
                                  className="bg-[#23262F] border border-gray-700 rounded px-2 py-1 text-sm"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="confirmed">Confirmed</option>
                                  <option value="failed">Failed</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage; 
