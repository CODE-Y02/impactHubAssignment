import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { games, wallet } from "./data";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Standardized response function
const sendResponse = (res: Response, statusCode: number, success: boolean, data: any = null, message: string | null = null, error: any = null) => {
    res.status(statusCode).json({
        success,
        message,
        data,
        error
    });
};

// GET /api/games - Get all games
app.get("/api/games", (req: Request, res: Response, next: NextFunction) => {
    try {
        sendResponse(res, 200, true, games, "Games fetched successfully");
    } catch (error) {
        next(error);
    }
});

app.get("/api/games/:id", (req: Request, res: Response, next: NextFunction) => {
    try {
        const game = games.find((g) => g.id === req.params.id);
        if (!game) {
            return sendResponse(res, 404, false, null, "Game not found");
        }
        sendResponse(res, 200, true, game, "Game fetched successfully");
    } catch (error) {
        next(error);
    }
});

// GET /api/wallet - Get wallet balance and transactions
app.get("/api/wallet", (req: Request, res: Response, next: NextFunction) => {
    try {
        sendResponse(res, 200, true, wallet, "Wallet details fetched successfully");
    } catch (error) {
        next(error);
    }
});

// POST /api/wallet/recharge - Recharge wallet
app.post("/api/wallet/recharge", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount } = req.body;
    if (typeof amount !== "number" || amount <= 0) {
      return sendResponse(res, 400, false, null, "Invalid amount", { message: "Amount must be a positive number." });
    }
    wallet.balance += amount;
    wallet.transactions.push({
      id: Date.now().toString(),
      description: `Recharge`,
      amount,
      date: new Date().toISOString().split("T")[0],
    });
    sendResponse(res, 200, true, { balance: wallet.balance }, "Recharge successful");
  } catch (error) {
    next(error);
  }
});

// POST /api/game/join - Join a game
app.post("/api/game/join", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId, entryCoins } = req.body;
    const game = games.find((g) => g.id === gameId);

    if (!game) {
      return sendResponse(res, 404, false, null, "Game not found");
    }

    if (wallet.balance < entryCoins) {
      return sendResponse(res, 400, false, null, "Insufficient balance");
    }

    wallet.balance -= entryCoins;
    wallet.transactions.push({
      id: Date.now().toString(),
      description: `Joined game: ${game.name}`,
      amount: -entryCoins,
      date: new Date().toISOString().split("T")[0],
    });

    sendResponse(res, 200, true, { balance: wallet.balance }, "Joined game successfully");
  } catch (error) {
    next(error);
  }
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  sendResponse(res, 500, false, null, "Internal Server Error", { message: err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
