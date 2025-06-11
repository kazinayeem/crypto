import React from "react";
import { Wallet, DollarSign, ArrowUpRightFromSquare, Database } from "lucide-react";

// Define a type for the Wallet object to ensure consistency
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
}

export const fakeWallets: WalletData[] = [
  {
    id: 'bee-wallet',
    name: 'Bee Wallet',
    // Now a function that returns the Wallet icon component using React.createElement
    icon: () => React.createElement(Wallet, { size: 20 }),
    balance: 158565,
    todayChange: -2.5,
    last7DaysChange: 4.25,
    assets: [
      { name: 'PEPE', ticker: 'pepe', amount: 0.57, usdValue: 0.00000666, avgCost: 0.00000702, pnl: 0.00, pnlPercentage: 0.43, iconUrl: 'https://placehold.co/24x24/FFD700/FFFFFF?text=P' },
      { name: 'DOGE', ticker: 'doge', amount: 1200, usdValue: 0.08, avgCost: 0.075, pnl: 5.00, pnlPercentage: 6.67, iconUrl: 'https://placehold.co/24x24/FBC02D/FFFFFF?text=D' },
      { name: 'SHIB', ticker: 'shib', amount: 500000, usdValue: 0.00001, avgCost: 0.0000095, pnl: 2.50, pnlPercentage: 5.26, iconUrl: 'https://placehold.co/24x24/E040FB/FFFFFF?text=S' },
    ],
    spotOpenOrders: [],
    futuresPositions: [],
    tradePairs: [],
  },
  {
    id: 'binance',
    name: 'Binance',
    // Now a function that returns the DollarSign icon component using React.createElement
    icon: () => React.createElement(DollarSign, { size: 20 }),
    balance: 58565,
    todayChange: -2.5,
    last7DaysChange: 4.25,
    assets: [
      { name: 'BTC', ticker: 'btc', amount: 0.5, usdValue: 30000, avgCost: 29500, pnl: 500, pnlPercentage: 1.7, iconUrl: 'https://placehold.co/24x24/F7931A/FFFFFF?text=B' },
      { name: 'ETH', ticker: 'eth', amount: 3, usdValue: 2000, avgCost: 1900, pnl: 300, pnlPercentage: 5.0, iconUrl: 'https://placehold.co/24x24/627EEA/FFFFFF?text=E' },
    ],
    spotOpenOrders: [
      { pair: 'BNB/USDT', type: 'Limit/Sell', amount: '0.00/0.041', price: 328.00, tp_sl: '--/0.6130', date: '2025-05-19 13:19:54' },
      { pair: 'BNB/USDT', type: 'Limit/Sell', amount: '0.00/0.041', price: 328.00, tp_sl: '--/0.6130', date: '2025-05-19 13:19:54' },
    ],
    futuresPositions: [
      {
        pair: 'ADAUSDT',
        pnlUsdt: 8.81,
        roi: 86.10,
        sizeUsdt: 204.7935,
        marginUsdt: 10.24,
        entryPrice: 0.63014,
        markPrice: 0.65866,
        liqPrice: '--',
        tp_sl: '--/0.62465',
        leverage: 'Cross 20x'
      }
    ],
    tradePairs: [
      { ticker: 'BTCUSDT', change24hrs: -4.25, iconUrl: 'https://placehold.co/24x24/F7931A/FFFFFF?text=B' },
      { ticker: 'PEPE', change24hrs: -2.5, iconUrl: 'https://placehold.co/24x24/FFD700/FFFFFF?text=P' },
      { ticker: 'ADA', change24hrs: 4.25, iconUrl: 'https://placehold.co/24x24/0033AD/FFFFFF?text=A' },
      { ticker: 'BEE', change24hrs: 2.5, iconUrl: 'https://placehold.co/24x24/FBC02D/FFFFFF?text=B' },
      { ticker: 'BTCUSDT', change24hrs: 4.25, iconUrl: 'https://placehold.co/24x24/F7931A/FFFFFF?text=B' },
    ]
  },
  {
    id: 'bybit',
    name: 'Bybit',
    // Now a function that returns the ArrowUpRightFromSquare icon component using React.createElement
    icon: () => React.createElement(ArrowUpRightFromSquare, { size: 20 }),
    balance: 20000,
    todayChange: 1.0,
    last7DaysChange: -1.5,
    assets: [
      { name: 'SOL', ticker: 'sol', amount: 10, usdValue: 150, avgCost: 145, pnl: 50, pnlPercentage: 3.4, iconUrl: 'https://placehold.co/24x24/9945FF/FFFFFF?text=S' },
    ],
    spotOpenOrders: [],
    futuresPositions: [],
    tradePairs: [],
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    // Now a function that returns the Database icon component using React.createElement
    icon: () => React.createElement(Database, { size: 20 }),
    balance: 75000,
    todayChange: 0.5,
    last7DaysChange: 2.0,
    assets: [
      { name: 'ADA', ticker: 'ada', amount: 1000, usdValue: 0.4, avgCost: 0.38, pnl: 20, pnlPercentage: 5.3, iconUrl: 'https://placehold.co/24x24/0033AD/FFFFFF?text=A' },
    ],
    spotOpenOrders: [],
    futuresPositions: [],
    tradePairs: [],
  },
];
