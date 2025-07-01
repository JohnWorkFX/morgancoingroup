import React from 'react';

interface Transaction {
  id: number;
  transaction_type: string;
  status: string;
  amount: string;
  created_at: string;
  date: string | null; // ISO string date
  description: string;
  coin: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div className="w-full">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-slate-600 data-[state=selected]:bg-slate-300">
              <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b transition-colors hover:bg-slate-600 data-[state=selected]:bg-slate-300"
              >
                <td className="p-4 align-middle">
                  {new Date(transaction.date ? transaction.date : transaction.created_at).toLocaleDateString()}
                </td>
                <td className="p-4 align-middle space-x-2">
                  <span>{transaction.amount}</span>
                  <span>{transaction.coin}</span>
                </td>
                <td className="p-4 align-middle">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      transaction.transaction_type === 'deposit'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.transaction_type.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 align-middle">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      transaction.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : transaction.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {transaction.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 align-middle">{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory; 