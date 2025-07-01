export interface Game {
  id: string;
  name: string;
  entryCoins: number;
  playerCount: number;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
}

export const games: Game[] = [
  { id: "1", name: "Challenge & Connect", entryCoins: 10, playerCount: 50 },
  { id: "2", name: "Snake & Ladder", entryCoins: 15, playerCount: 30 },
];

export let wallet = {
  balance: 100,
  transactions: [
    { id: "1", description: "Recharge", amount: 100, date: "2025-07-01" },
    {
      id: "2",
      description: "Joined Challenge & Connect",
      amount: -10,
      date: "2025-07-01",
    },
  ],
};
