import React from "react";
import { Button } from "@/components/ui/button";

interface TradePairItemProps {
  ticker: string;
  change24hrs: number;
  iconUrl: string;
}

export const TradePairItem: React.FC<TradePairItemProps> = ({ ticker, change24hrs, iconUrl }) => {
  const changeColor = change24hrs >= 0 ? "text-green-500" : "text-red-500";
  const arrowIcon = change24hrs >= 0 ? "▲" : "▼";

  return (
    <div className="flex items-center justify-between py-3 border-b border-[#2a2a2a] last:border-b-0">
      <div className="flex items-center space-x-3">
        <img src={iconUrl} alt={ticker} className="w-6 h-6 rounded-full" />
        <div>
          <p className="font-medium text-gray-100">{ticker.toUpperCase()}</p>
          <p className="text-sm text-gray-400">last 24 hrs</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className={`${changeColor} flex items-center text-sm`}>
          {change24hrs}%
          <span className="ml-1 text-xs">{arrowIcon}</span>
        </span>
        <Button
          variant="outline"
          className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#1a1a1a] px-4 py-1 h-auto text-sm rounded-md"
        >
          Trade
        </Button>
      </div>
    </div>
  );
};
