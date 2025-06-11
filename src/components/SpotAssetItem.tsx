import React from "react";

interface SpotAssetItemProps {
  name: string;
  ticker: string;
  amount: number;
  usdValue: number;
  avgCost: number;
  pnl: number;
  pnlPercentage: number;
  iconUrl: string;
}

export const SpotAssetItem: React.FC<SpotAssetItemProps> = ({
  name,
  ticker,
  amount,
  usdValue,
  avgCost,
  pnl,
  pnlPercentage,
  iconUrl,
}) => {
  const pnlColor = pnl >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="flex items-center justify-between py-3 border-b border-[#2a2a2a] last:border-b-0">
      <div className="flex items-center space-x-3">
        <img src={iconUrl} alt={name} className="w-6 h-6 rounded-full" />
        <div>
          <p className="font-medium text-gray-100">{name}</p>
          <p className="text-sm text-gray-400">{ticker.toUpperCase()}</p>
        </div>
      </div>
      <div className="text-right text-sm space-y-0.5">
        <p className="text-gray-100">{amount.toFixed(2)}</p>
        <p className="text-gray-400">${(amount * usdValue).toFixed(2)} USDT</p>
        <p className="text-gray-400">Avg. Cost ${avgCost.toFixed(6)}</p>
        <p className={pnlColor}>
          {pnl >= 0 ? "+" : ""}
          ${pnl.toFixed(2)} ({pnlPercentage >= 0 ? "+" : ""}
          {pnlPercentage.toFixed(2)}%)
        </p>
      </div>
    </div>
  );
};
