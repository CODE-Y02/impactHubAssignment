import { useNavigate } from "react-router-dom";

interface InsufficientCoinsPopupProps {
  onClose: () => void;
}

export default function InsufficientCoinsPopup({
  onClose,
}: InsufficientCoinsPopupProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-red-600">
          Insufficient Coins
        </h2>
        <p className="mb-4">You don't have enough coins to join this game.</p>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Lobby
          </button>
          <button
            onClick={() => navigate("/wallet")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Recharge
          </button>
          <button
            onClick={onClose}
            className="mt-2 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
