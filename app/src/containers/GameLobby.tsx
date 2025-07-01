import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Game } from "@/types";
import { CoinsIcon } from "lucide-react";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GameLobby() {
  const [games, setGames] = useState<Game[]>([]);
  const navigate = useNavigate();

  const fetchGames = async () => {
    try {
      const data = (await api.get("/games")) as Game[];
      setGames(data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="h-screen flex flex-col w-screen gap-3">
      <div className="flex p-2 items-center justify-between border-b-2">
        <div className="text-lg font-semibold underline">Game Lobby</div>
        <div className="flex gap-2">
          <Button onClick={() => navigate(`/wallet`)} variant="destructive">
            <CoinsIcon className="text-yellow-400 fill-amber-800" />
            Wallet
          </Button>
        </div>
      </div>
      <div className="overflow-y-scroll flex-1 p-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
          {games?.map((game) => (
            <Card key={game.id} className="min-w-fit">
              <CardContent>
                <div className="text-lg font-semibold mb-3">{game.name}</div>
                <p>Coins Required: {game.entryCoins}</p>
                <Button
                  onClick={() =>
                    navigate(`/game/${game.id}`, {
                      state: { entryCoins: game.entryCoins },
                    })
                  }
                >
                  Play
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameLobby;
