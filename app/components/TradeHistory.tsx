import React from 'react';

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
              <th className="h-12 px-4 text-left align-middle font-medium">Opening Price</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Closing Price</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Profit Earned</th>
              {/* <th className="h-12 px-4 text-left align-middle font-medium">Total</th> */}
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
                  {new Date(trade.transaction.date).toLocaleDateString()}
                </td>
                <td className="p-4 align-middle">{trade.coin}</td>
                <td className="p-4 align-middle">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      trade.trade_type === 'buy'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {trade.trade_type.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 align-middle">{trade.amount_invested} {trade.coin}</td>
                <td className="p-4 align-middle">${trade.open_price}</td>
                <td className="p-4 align-middle">${trade.closing_price}</td>
                <td className="p-4 align-middle">{trade.profit_earned} {trade.coin}</td>
                <td className="p-4 align-middle">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      trade.transaction.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : trade.transaction.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {trade.transaction.status.toUpperCase()}
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