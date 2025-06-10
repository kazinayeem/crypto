import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  DollarSign,
  ArrowUpRightFromSquare,
  Database,
  MoreVertical,
} from "lucide-react";

interface TotalBalanceSectionProps {
  totalBalance: number;
  todayChange: number;
  last7DaysChange: number;
}

const TotalBalanceSection: React.FC<TotalBalanceSectionProps> = ({
  totalBalance,
  todayChange,
  last7DaysChange,
}) => {
  const todayChangeColor =
    todayChange >= 0
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";

  const last7DaysChangeColor =
    last7DaysChange >= 0
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";

  return (
    <div className="pb-4 border-b border-gray-300 dark:border-gray-700">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          TOTAL BALANCE
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ${totalBalance.toLocaleString()}
        </p>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <span className="mr-1 text-gray-700 dark:text-gray-300">Today</span>
            <span className={`${todayChangeColor} flex items-center`}>
              {todayChange >= 0 ? "+" : ""}
              {todayChange}%
              {todayChange >= 0 ? (
                <span className="ml-1 text-xs">▲</span>
              ) : (
                <span className="ml-1 text-xs">▼</span>
              )}
            </span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 text-gray-700 dark:text-gray-300">last 7 days</span>
            <span className={`${last7DaysChangeColor} flex items-center`}>
              {last7DaysChange >= 0 ? "+" : ""}
              {last7DaysChange}%
              {last7DaysChange >= 0 ? (
                <span className="ml-1 text-xs">▲</span>
              ) : (
                <span className="ml-1 text-xs">▼</span>
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

interface WalletItemProps {
  icon: React.ReactNode;
  name: string;
  isActive?: boolean;
}

const WalletItem: React.FC<WalletItemProps> = ({ icon, name, isActive }) => (
  <li
    className={`flex items-center justify-between space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
      isActive
        ? "bg-yellow-100 text-yellow-800 dark:bg-gray-700 dark:text-yellow-400"
        : "hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-800 dark:text-gray-300"
    }`}
  >
    <div className="flex items-center space-x-3">
      {icon}
      <span>{name}</span>
    </div>
    <MoreVertical size={16} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
  </li>
);

export function PortfolioDashboard({
  totalBalance,
  todayChange,
  last7DaysChange,
}: TotalBalanceSectionProps) {
  return (
    <Card className="w-full h-[530px] bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200 border border-gray-200 dark:border-none shadow-lg rounded-lg p-4 flex flex-col transition-colors">
      <TotalBalanceSection
        totalBalance={totalBalance}
        todayChange={todayChange}
        last7DaysChange={last7DaysChange}
      />
      <nav className="flex-grow overflow-y-auto custom-scrollbar">
        <ul>
          <WalletItem icon={<Wallet size={20} />} name="Bee Wallet" isActive />
          <WalletItem icon={<DollarSign size={20} />} name="Binance" />
          <WalletItem icon={<ArrowUpRightFromSquare size={20} />} name="Bybit" />
          <WalletItem icon={<Database size={20} />} name="Coinbase" />
        </ul>
        <Button
          variant="outline"
          className="mt-6 w-full border-yellow-500 text-yellow-600 dark:text-yellow-400 dark:border-yellow-400 hover:bg-yellow-500 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-gray-900"
        >
          + Connect Wallet
        </Button>
      </nav>
    </Card>
  );
}
