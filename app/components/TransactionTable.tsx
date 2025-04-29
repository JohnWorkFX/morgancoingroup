import React, { useState } from "react";

export interface Transaction {
  id: number;
  user: number;
  transaction_type: string;
  status: string;
  amount: string;
  created_at: string;
  date: string;
  description: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const typeIcons: Record<string, string> = {
  deposit: "⬆️",
  withdraw: "⬇️",
  investment: "💼",
  // Add more as needed
};

const statusColors: Record<string, string> = {
  completed: "text-green-500",
  pending: "text-yellow-500",
  failed: "text-red-500",
};

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, loading, error }) => {
  const [search, setSearch] = useState("");
  const filtered = transactions.filter(
    t =>
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.transaction_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Recent Transactions</h3>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-[#23262F] rounded px-3 py-1 text-white w-48"
        />
      </div>
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <div className="relative w-full overflow-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="py-2 font-normal">Type</th>
                <th className="py-2 font-normal">Status</th>
                <th className="py-2 font-normal">Amount</th>
                <th className="py-2 font-normal">Date</th>
                <th className="py-2 font-normal">Description</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-8">No transactions found.</td>
                </tr>
              )}
              {filtered.map((t) => (
                <tr key={t.id} className="border-t border-gray-800 hover:bg-[#23262F]">
                  <td className="py-3 flex items-center gap-2">
                    <span>{typeIcons[t.transaction_type.toLowerCase()] || "🔄"}</span>
                    <span className="capitalize">{t.transaction_type}</span>
                  </td>
                  <td className={`py-3 capitalize ${statusColors[t.status.toLowerCase()] || "text-gray-400"}`}>{t.status}</td>
                  <td className={`py-3 font-mono ${parseFloat(t.amount) >= 0 ? "text-green-500" : "text-red-500"}`}>{parseFloat(t.amount) >= 0 ? "+" : "-"}${Math.abs(parseFloat(t.amount)).toFixed(2)}</td>
                  <td className="py-3">{t.date || t.created_at}</td>
                  <td className="py-3">{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionTable; 