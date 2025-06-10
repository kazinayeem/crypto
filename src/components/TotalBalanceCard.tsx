// src/components/TotalBalanceCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface TotalBalanceCardProps {
  totalBalance: number;
  todayChange: number;
  last7DaysChange: number;
}

export function TotalBalanceCard({ totalBalance, todayChange, last7DaysChange }: TotalBalanceCardProps) {
  const todayChangeColor = todayChange >= 0 ? "text-green-500" : "text-red-500";
  const last7DaysChangeColor = last7DaysChange >= 0 ? "text-green-500" : "text-red-500";

  return (
    <Card className="bg-gray-800 text-gray-200 border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-md text-gray-400">TOTAL BALANCE</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold text-white mb-2">${totalBalance.toLocaleString()}</p>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <span className="mr-1">Today</span>
            <span className={`${todayChangeColor}`}>{todayChange >= 0 ? "+" : ""}{todayChange}%</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">last 7 days</span>
            <span className={`${last7DaysChangeColor}`}>{last7DaysChange >= 0 ? "+" : ""}{last7DaysChange}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}