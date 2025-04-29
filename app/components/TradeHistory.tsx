import React from 'react';

interface Trade {
  id: number;
  pair: string;
  type: string;
  amount: string;
  price: string;
  total: string;
  date: string;
  status: string;
}

interface TradeHistoryProps {
  trades: Trade[];
}

const TradeHistory: React.FC<TradeHistoryProps> = ({ trades }) => {
  return (
    <div className="w-full">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-slate-600 data-[state=selected]:bg-slate-300">
              <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Pair</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Price</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Total</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className="border-b transition-colors hover:bg-slate-600 data-[state=selected]:bg-slate-300"
              >
                <td className="p-4 align-middle">
                  {new Date(trade.date).toLocaleDateString()}
                </td>
                <td className="p-4 align-middle">{trade.pair}</td>
                <td className="p-4 align-middle">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      trade.type === 'buy'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {trade.type.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 align-middle">{trade.amount}</td>
                <td className="p-4 align-middle">${trade.price}</td>
                <td className="p-4 align-middle">${trade.total}</td>
                <td className="p-4 align-middle">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      trade.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : trade.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {trade.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeHistory; 