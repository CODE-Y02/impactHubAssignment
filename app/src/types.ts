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

export interface Wallet {
  balance: number;
  transactions: Transaction[];
}
