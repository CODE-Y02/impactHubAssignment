import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface RechargeModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onRecharge: (amount: number) => void;
}

export default function RechargeModal({
  open,
  setOpen,
  onRecharge,
}: RechargeModalProps) {
  const coinPacks = [10, 50, 100];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col gap-4">
        <Button onClick={() => setOpen(false)}>Go to Lobby</Button>
        <div className="flex flex-col lg:flex-row gap-2 justify-center">
          {coinPacks.map((amount) => (
            <Button key={amount} onClick={() => onRecharge(amount)}>
              Add {amount} Coins
            </Button>
          ))}
        </div>
        <Button
          onClick={() => setOpen(false)}
          className="text-white bg-slate-400"
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
}
