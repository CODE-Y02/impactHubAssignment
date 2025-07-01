import { useEffect, useState, useRef } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import InsufficientCoinsPopup from "../components/InsufficientCoinsPopup";
import api from "@/services/api";
import type { Game } from "@/types";

export default function GameScreen() {
  const { gameId } = useParams<{ gameId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const entryCoins = location.state?.entryCoins as number | undefined;

  const [gameName, setGameName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === true) return;

    if (!gameId || entryCoins === undefined) {
      setError("Invalid game entry. Please return to the lobby.");
      setLoading(false);
      return;
    }

    const joinAndFetchGame = async () => {
      try {
        await api.post("/game/join", {
          gameId,
          entryCoins,
        });
        setIsJoined(true);

        const game = (await api.get(`/games/${gameId}`)) as Game;
        setGameName(game.name);
      } catch (err: unknown) {
        console.error("Error joining game:", err); // Add this for debugging
        const apiError = err as { message?: string };
        if (apiError.message === "Insufficient balance") {
          setShowPopup(true);
        } else {
          setError(
            apiError.message ||
              "An unknown error occurred while joining the game."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    joinAndFetchGame();

    return () => {
      effectRan.current = true;
    };
  }, [gameId, entryCoins]);

  if (loading) {
    return <div className="p-4 text-center">Joining game...</div>;
  }

  if (showPopup) {
    return <InsufficientCoinsPopup onClose={() => navigate("/")} />;
  }

  if (error) {
    return (
      <div className="p-4 flex flex-col items-center">
        <p className="text-red-500">{error}</p>
        <Link to="/" className="mt-4 text-blue-500 hover:underline">
          Back to Lobby
        </Link>
      </div>
    );
  }

  if (!isJoined) {
    return (
      <div className="p-4 text-center">
        Could not join the game. Please try again.
        <Link to="/" className="block mt-4 text-blue-500 hover:underline">
          Back to Lobby
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">{gameName} (Placeholder)</h1>
      <p className="text-gray-600 mb-4">This is a dummy game screen.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Back to Lobby
      </Link>
    </div>
  );
}
