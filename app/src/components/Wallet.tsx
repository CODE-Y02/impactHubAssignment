import { useState } from "react";
import api from "@/services/api";
import RechargeModal from "./RechargeModal";

interface WalletProps {
  balance: number;
  onRechargeSuccess: () => void;
}

export default function Wallet({ balance, onRechargeSuccess }: WalletProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRecharge = async (amount: number) => {
    try {
      await api.post("/wallet/recharge", { amount });
      onRechargeSuccess(); // Notify parent to refetch data
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error recharging:", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md m-2">
      <h2 className="text-xl font-bold">Wallet</h2>
      <p>Total Coins: {balance}</p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Recharge
      </button>
      {isModalOpen && (
        <RechargeModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          onRecharge={handleRecharge}
        />
      )}
    </div>
  );
}
