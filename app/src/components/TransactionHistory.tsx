import type { Transaction } from "@/types";

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({
  transactions,
}: TransactionHistoryProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md m-2 flex flex-col h-full ">
      <h2 className="text-xl font-bold">Transaction History</h2>
      <ul className="overflow-y-scroll flex-1 custom-scrollbar p-3">
        {transactions.map((tx) => (
          <li key={tx.id} className="py-2">
            {tx.description} - {tx.amount} coins ({tx.date})
          </li>
        ))}
      </ul>
    </div>
  );
}
