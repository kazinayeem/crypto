// src/wallets.ts
import React from "react";
import { ArrowUpRightFromSquare } from "lucide-react";

export interface WalletData {
  id: string;
  name: string;
  icon: () => React.ReactNode;
  balance: number;
  todayChange: number;
  last7DaysChange: number;
  assets: Array<{
    name: string;
    ticker: string;
    amount: number;
    usdValue: number;
    avgCost: number;
    pnl: number;
    pnlPercentage: number;
    iconUrl: string;
  }>;
  spotOpenOrders: Array<{
    pair: string;
    type: string;
    amount: string;
    price: number;
    tp_sl: string;
    date: string;
  }>;
  futuresPositions: Array<{
    pair: string;
    pnlUsdt: number;
    roi: number;
    sizeUsdt: number;
    marginUsdt: number;
    entryPrice: number;
    markPrice: number;
    liqPrice: string;
    tp_sl: string;
    leverage: string;
  }>;
  tradePairs: Array<{
    ticker: string;
    change24hrs: number;
    iconUrl: string;
  }>;
  loading?: boolean;
  error?: string | null;
  chartSymbol?: string;
}

// Initial placeholder for the Bybit wallet
export const initialWallets: WalletData[] = [
  {
    id: "bybit",
    name: "Bybit (Testnet)",
    icon: () => React.createElement(ArrowUpRightFromSquare, { size: 20 }),
    balance: 0,
    todayChange: 0,
    last7DaysChange: 0,
    assets: [],
    spotOpenOrders: [],
    futuresPositions: [],
    tradePairs: [],
    loading: true,
    error: null,
  },
];
