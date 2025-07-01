import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionHistory from "@/components/TransactionHistory";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import WalletComponent from "@/components/Wallet";
import { ArrowLeftSquareIcon, CoinsIcon } from "lucide-react";
import api from "@/services/api";
import type { Wallet } from "@/types";

function WalletScreen() {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const data = (await api.get("/wallet")) as Wallet;
      setWallet(data);
    } catch {
      setError("Failed to fetch wallet data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading wallet...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="h-screen flex flex-col w-screen gap-3 ">
      <div className="flex p-2 items-center justify-between border-b-2 gap-3">
        <Button onClick={() => navigate(`/`)}>
          <ArrowLeftSquareIcon />
          Back
        </Button>
        <Badge className="text-lg font-semibold ml-auto">
          <CoinsIcon className="text-yellow-400 fill-amber-800" />
          Wallet
        </Badge>
      </div>
      {wallet && (
        <div className="flex-1 overflow-y-scroll p-4">
          <WalletComponent
            balance={wallet.balance}
            onRechargeSuccess={fetchWalletData}
          />

          <TransactionHistory transactions={wallet.transactions} />
        </div>
      )}
    </div>
  );
}

export default WalletScreen;
