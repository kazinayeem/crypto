import React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TotalBalanceSectionProps {
  totalBalance: number;
  todayChange: number;
  last7DaysChange: number;
}

export const TotalBalanceSection: React.FC<TotalBalanceSectionProps> = ({
  totalBalance,
  todayChange,
  last7DaysChange,
}) => {
  const todayChangeColor = todayChange >= 0 ? "text-green-500" : "text-red-500";
  const last7DaysChangeColor = last7DaysChange >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="pb-4 border-b border-[#333]">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-sm text-gray-400 uppercase tracking-wide">
          Total Balance
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl md:text-4xl font-bold text-[#34A853] mb-2">
          ${totalBalance.toLocaleString()}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm">
          <div className="flex items-center">
            <span className="mr-1 text-gray-400">Today</span>
            <span className={`${todayChangeColor} flex items-center`}>
              {todayChange >= 0 ? "+" : ""}
              {todayChange}%
              <span className="ml-1 text-xs">{todayChange >= 0 ? "▲" : "▼"}</span>
            </span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 text-gray-400">Last 7 days</span>
            <span className={`${last7DaysChangeColor} flex items-center`}>
              {last7DaysChange >= 0 ? "+" : ""}
              {last7DaysChange}%
              <span className="ml-1 text-xs">{last7DaysChange >= 0 ? "▲" : "▼"}</span>
            </span>
          </div>
        </div>
      </CardContent>
    </div>
  );
};
