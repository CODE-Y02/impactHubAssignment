interface RechargeModalProps {
  onClose: () => void;
  onRecharge: (amount: number) => void;
}

export default function RechargeModal({
  onClose,
  onRecharge,
}: RechargeModalProps) {
  const coinPacks = [10, 50, 100];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Recharge Coins</h2>
        <div className="flex flex-col gap-2">
          {coinPacks.map((amount) => (
            <button
              key={amount}
              onClick={() => onRecharge(amount)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add {amount} Coins
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
