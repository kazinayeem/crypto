import React from "react";
import { motion } from "framer-motion";

interface AssetItemProps {
  name: string;
  ticker: string;
  amount: number;
  usdValue: number;
  avgCost: number;
  pnl: number;
  pnlPercentage: number;
  iconUrl: string;
}

export const AssetItem: React.FC<AssetItemProps> = ({
  name,
  ticker,
  amount,
  usdValue,
  avgCost,
  pnl,
  pnlPercentage,
  iconUrl,
}) => {
  const pnlColor = pnl >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
    >
      <div className="flex items-center space-x-3">
        <img src={iconUrl} alt={name} className="w-6 h-6 rounded-full" />
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{ticker.toUpperCase()}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium text-gray-900 dark:text-white">{amount.toFixed(2)}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">${(amount * usdValue).toFixed(2)} USDT</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Cost ${avgCost.toFixed(6)}</p>
        <p className={`${pnlColor} text-sm`}>
          {pnl >= 0 ? "+" : ""}${pnl.toFixed(2)} ({pnlPercentage >= 0 ? "+" : ""}{pnlPercentage.toFixed(2)}%)
        </p>
      </div>
    </motion.div>
  );
};
