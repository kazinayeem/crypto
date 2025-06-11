import React, { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Search } from "lucide-react";

import { SpotAssetItem } from "./SpotAssetItem";
import { SpotOpenOrderItem } from "./SpotOpenOrderItem";
import { FuturesPositionItem } from "./FuturesPositionItem";
import { TradePairItem } from "./TradePairItem";
import type { WalletData } from "./fakeData";

interface WalletDetailSectionProps {
  wallet: WalletData;
  onClose: () => void;
}

export const WalletDetailSection: React.FC<WalletDetailSectionProps> = ({
  wallet,
  onClose,
}) => {
  const [activeMainTab, setActiveMainTab] = useState("Spot");
  const [activeSpotSubTab, setActiveSpotSubTab] = useState("Balance");
  const [activeFuturesSubTab, setActiveFuturesSubTab] = useState("Positions");
  const [searchTerm, setSearchTerm] = useState("");

  const todayChangeColor = wallet.todayChange >= 0 ? "text-green-500" : "text-red-500";
  const last7DaysChangeColor = wallet.last7DaysChange >= 0 ? "text-green-500" : "text-red-500";

  const filteredTradePairs = wallet.tradePairs.filter((pair) =>
    pair.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getHeaderValue = () => {
    switch (activeMainTab) {
      case "Spot":
        return "$20,000";
      case "Futures":
        return "$17,650";
      case "Trade":
        return "$17,650";
      default:
        return "$" + wallet.balance.toLocaleString();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] text-gray-100">
      <CardHeader className="p-0 pb-4 border-b border-[#333] flex items-center justify-between">
        <CardTitle className="text-lg font-bold text-gray-100 uppercase tracking-wide">
          {wallet.name.toUpperCase()} BALANCE
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close wallet detail"
          className="rounded-full text-gray-400 hover:text-gray-200"
        >
          <X size={20} />
        </Button>
      </CardHeader>

      <CardContent className="p-0 pt-4 flex flex-col flex-grow">
        <p className="text-3xl font-bold text-yellow-500 mb-2">
          ${wallet.balance.toLocaleString()}
        </p>

        <div className="flex items-center space-x-4 text-sm mb-4">
          <div className="flex items-center">
            <span className="mr-1 text-gray-400">Today</span>
            <span className={`${todayChangeColor} flex items-center`}>
              {wallet.todayChange >= 0 ? "+" : ""}
              {wallet.todayChange}%
              <span className="ml-1 text-xs">{wallet.todayChange >= 0 ? "▲" : "▼"}</span>
            </span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 text-gray-400">Last 7 days</span>
            <span className={`${last7DaysChangeColor} flex items-center`}>
              {wallet.last7DaysChange >= 0 ? "+" : ""}
              {wallet.last7DaysChange}%
              <span className="ml-1 text-xs">{wallet.last7DaysChange >= 0 ? "▲" : "▼"}</span>
            </span>
          </div>
        </div>

        <div className="flex border-b border-[#333] mb-4 relative">
          {["Spot", "Futures", "Fund Transfer", "Trade"].map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              onClick={() => {
                setActiveMainTab(tab);
                setActiveSpotSubTab("Balance");
                setActiveFuturesSubTab("Positions");
              }}
              className={`pb-2 rounded-none border-b-2 text-sm px-2 sm:px-4 ${
                activeMainTab === tab
                  ? "border-yellow-500 text-yellow-500"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab}
            </Button>
          ))}
          <div className="ml-auto text-xl font-bold text-green-500 flex items-center absolute right-0 top-1">
            {getHeaderValue()}
          </div>
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
          {activeMainTab === "Spot" && (
            <>
              <div className="flex border-b border-[#2a2a2a] mb-4">
                {["Balance", "Open Orders", "History"].map((subTab) => (
                  <Button
                    key={subTab}
                    variant="ghost"
                    onClick={() => setActiveSpotSubTab(subTab)}
                    className={`pb-2 rounded-none border-b-2 text-xs px-2 ${
                      activeSpotSubTab === subTab
                        ? "border-gray-500 text-gray-100"
                        : "border-transparent text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {subTab === "Open Orders"
                      ? `Open Orders (${wallet.spotOpenOrders.length})`
                      : subTab}
                  </Button>
                ))}
              </div>
              {activeSpotSubTab === "Balance" && (
                <div>
                  {wallet.assets.length > 0 ? (
                    wallet.assets.map((asset) => <SpotAssetItem key={asset.ticker} {...asset} />)
                  ) : (
                    <p className="text-gray-400 text-center py-4">No assets found in balance.</p>
                  )}
                </div>
              )}
              {activeSpotSubTab === "Open Orders" && (
                <div>
                  {wallet.spotOpenOrders.length > 0 ? (
                    wallet.spotOpenOrders.map((order) => (
                      <SpotOpenOrderItem key={`${order.pair}-${order.date}`} {...order} />
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">No open orders.</p>
                  )}
                </div>
              )}
              {activeSpotSubTab === "History" && (
                <p className="text-gray-400 text-center py-4">Spot History content will go here.</p>
              )}
            </>
          )}

          {activeMainTab === "Futures" && (
            <>
              <div className="flex border-b border-[#2a2a2a] mb-4">
                {["Positions", "Open Orders", "History"].map((subTab) => (
                  <Button
                    key={subTab}
                    variant="ghost"
                    onClick={() => setActiveFuturesSubTab(subTab)}
                    className={`pb-2 rounded-none border-b-2 text-xs px-2 ${
                      activeFuturesSubTab === subTab
                        ? "border-gray-500 text-gray-100"
                        : "border-transparent text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {subTab}
                  </Button>
                ))}
              </div>
              {activeFuturesSubTab === "Positions" && (
                <div>
                  {wallet.futuresPositions.length > 0 ? (
                    wallet.futuresPositions.map((position) => (
                      <FuturesPositionItem key={`${position.ticker}-${position.date}`} {...position} />
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">No futures positions.</p>
                  )}
                </div>
              )}
              {activeFuturesSubTab === "Open Orders" && (
                <p className="text-gray-400 text-center py-4">Futures Open Orders content will go here.</p>
              )}
              {activeFuturesSubTab === "History" && (
                <p className="text-gray-400 text-center py-4">Futures History content will go here.</p>
              )}
            </>
          )}

          {activeMainTab === "Fund Transfer" && (
            <p className="text-gray-400 text-center py-4">Fund Transfer content will go here.</p>
          )}

          {activeMainTab === "Trade" && (
            <>
              <div className="mb-4 relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-[#2a2a2a] text-gray-100 border border-[#333] focus:outline-none focus:border-yellow-500"
                />
                <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              </div>
              {filteredTradePairs.length > 0 ? (
                filteredTradePairs.map((pair) => <TradePairItem key={pair.ticker} {...pair} />)
              ) : (
                <p className="text-gray-400 text-center py-4">No tradable pairs found.</p>
              )}
            </>
          )}
        </div>
      </CardContent>
    </div>
  );
};
