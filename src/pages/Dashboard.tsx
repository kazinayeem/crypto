// src/pages/Dashboard.tsx
import React from "react";
import AppLayout from "../layout/AppLayout";
import TotalBalance from "../components/dashboard/TotalBalance";
import WalletList from "../components/dashboard/WalletList";
import ChartPanel from "../components/dashboard/ChartPanel";
import PriceChart from "../components/dashboard/PriceChart";
import AgentChat from "../components/dashboard/AgentChat";
import FearAndGreedIndex from "../components/dashboard/FearAndGreedIndex";


const Dashboard: React.FC = () => {
  return (
    <AppLayout>
      {/* Top Header (Bee, Connected, Avatar) - Can be a separate component if complex */}
      <header className="col-span-full flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <img src="/path/to/bee-logo.png" alt="Bee Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold">Bee</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-green-400">Connected</span>
          <img
            src="/path/to/avatar.png"
            alt="User Avatar"
            className="h-8 w-8 rounded-full"
          />
        </div>
      </header>

      {/* Left Column */}
      <div className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col space-y-4">
        <TotalBalance />
        <WalletList />
      </div>

      {/* Middle Column (Main Chart and Price Chart) */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col space-y-4">
        <ChartPanel />
        <PriceChart />
      </div>

      {/* Right Column (Agent Chat and Fear & Greed) */}
      <div className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col space-y-4">
        <AgentChat />
        <FearAndGreedIndex />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
