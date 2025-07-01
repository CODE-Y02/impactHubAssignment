import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface InsufficientCoinsPopupProps {
  open: boolean;
}

export default function InsufficientCoinsPopup({
  open,
}: InsufficientCoinsPopupProps) {
  const navigate = useNavigate();

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insufficient Coins</DialogTitle>
          <DialogDescription>
            You don't have enough coins to join this game.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => navigate("/")}>Go to Lobby</Button>
          <Button onClick={() => navigate("/wallet")}>Recharge</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
