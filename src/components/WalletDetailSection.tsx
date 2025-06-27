import { X, Search } from "lucide-react";
import React, { useState, useMemo } from "react";
import { Button } from "./ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WalletData } from "@/wallets";
import FundTransferForm from "./FundTransferForm";

const SpotAssetItem: React.FC<any> = ({ name, amount, usdValue, iconUrl }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
    <div className="flex items-center space-x-3">
      <img src={iconUrl} alt={name} className="w-6 h-6 rounded-full" />
      <p className="font-medium text-gray-900 dark:text-white truncate">
        {name}
      </p>
    </div>
    <div className="text-right min-w-[100px]">
      <p className="font-medium text-gray-900 dark:text-white">
        {amount.toFixed(4)}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        ${usdValue.toFixed(2)}
      </p>
    </div>
  </div>
);

const SpotOpenOrderItem: React.FC<any> = ({
  pair,
  type,
  amount,
  price,
  tp_sl,
  date,
}) => (
  <div className="bg-[#2a2a2a] p-3 rounded-md text-sm space-y-1">
    <p>
      <strong>Pair:</strong> {pair}
    </p>
    <p>
      <strong>Type:</strong> {type}
    </p>
    <p>
      <strong>Amount:</strong> {amount}
    </p>
    <p>
      <strong>Price:</strong> {price}
    </p>
    <p>
      <strong>TP/SL:</strong> {tp_sl}
    </p>
    <p>
      <strong>Date:</strong> {date}
    </p>
  </div>
);

const FuturesPositionItem: React.FC<any> = ({
  pair,
  pnlUsdt,
  roi,
  sizeUsdt,
  leverage,
}) => (
  <div className="bg-[#2a2a2a] p-3 rounded-md text-sm space-y-1">
    <p>
      <strong>Pair:</strong> {pair}
    </p>
    <p>
      <strong>PnL (USDT):</strong> {pnlUsdt.toFixed(2)}
    </p>
    <p>
      <strong>ROI:</strong> {roi.toFixed(2)}%
    </p>
    <p>
      <strong>Size (USDT):</strong> {sizeUsdt.toFixed(2)}
    </p>
    <p>
      <strong>Leverage:</strong> {leverage}
    </p>
  </div>
);

const TradePairItem: React.FC<any> = ({ ticker, change24hrs, onClick }) => (
  <div
    className="p-3 rounded-md text-sm flex items-center space-x-2 cursor-pointer"
    onClick={onClick}
  >
    <div>
      <div className="flex items-center space-x-2 mb-1">
        <strong>{ticker}:</strong>
      </div>

      <p className="truncate">{change24hrs.toFixed(2)}% (24h Change)</p>
    </div>

    <Button className="ml-auto bg-[#454545] hover:bg-gray-600 text-white px-3 py-1 rounded">
      Trade
    </Button>
  </div>
);
interface WalletDetailSectionProps {
  wallet: WalletData;
  onClose: () => void;
  onTradePairClick: (pair: any) => void;
}

export const WalletDetailSection: React.FC<WalletDetailSectionProps> = ({
  wallet,
  onClose,
  onTradePairClick,
}) => {
  const [activeMainTab, setActiveMainTab] = useState("Spot");
  const [activeSpotSubTab, setActiveSpotSubTab] = useState("Balance");
  const [activeFuturesSubTab, setActiveFuturesSubTab] = useState("Positions");
  const [searchTerm, setSearchTerm] = useState("");

  const todayChangeColor =
    wallet.todayChange >= 0 ? "text-green-500" : "text-red-500";
  const last7DaysChangeColor =
    wallet.last7DaysChange >= 0 ? "text-green-500" : "text-red-500";

  const filteredTradePairs = useMemo(
    () =>
      wallet.tradePairs.filter((pair) =>
        pair.ticker.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [wallet.tradePairs, searchTerm]
  );

  const getHeaderValue = () => {
    switch (activeMainTab) {
      case "Spot":
        return `$${wallet.assets
          .reduce((sum, asset) => sum + asset.usdValue, 0)
          .toFixed(2)}`;
      case "Futures":
        return `$${wallet.futuresPositions
          .reduce((sum, pos) => sum + pos.sizeUsdt, 0)
          .toFixed(2)}`;
      case "Trade":
        return `$${wallet.balance.toFixed(2)}`;
      case "Fund Transfer":
      default:
        return `$${wallet.balance.toFixed(2)}`;
    }
  };

  return (
    <section className="flex flex-col h-full bg-transparent text-gray-100">
      <CardHeader className="border-b border-[#333] flex items-center justify-between px-4 py-2">
        <CardTitle className="text-lg font-bold uppercase tracking-wide truncate max-w-[75%] sm:max-w-full">
          {wallet.name.toUpperCase()} BALANCE
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close wallet detail"
          className="rounded-full border border-red-900 text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <X size={25} color="red" />
        </Button>
      </CardHeader>

      <CardContent className="p-4 flex flex-col flex-grow min-h-0 overflow-hidden">
        <p className="text-3xl font-bold text-yellow-500 mb-3 truncate min-h-10">
          {getHeaderValue()}
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm mb-6">
          <div className="flex items-center space-x-1">
            <span className="text-gray-400">Today</span>
            <span
              className={`${todayChangeColor} flex items-center font-semibold`}
            >
              {wallet.todayChange >= 0 ? "+" : ""}
              {wallet.todayChange}%
              <span className="ml-1 text-xs">
                {wallet.todayChange >= 0 ? "▲" : "▼"}
              </span>
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-gray-400">Last 7 days</span>
            <span
              className={`${last7DaysChangeColor} flex items-center font-semibold`}
            >
              {wallet.last7DaysChange >= 0 ? "+" : ""}
              {wallet.last7DaysChange}%
              <span className="ml-1 text-xs">
                {wallet.last7DaysChange >= 0 ? "▲" : "▼"}
              </span>
            </span>
          </div>
        </div>

        {/* Main Tabs */}
        <div className="flex gap-2 border-b p-1 border-[#fff] mb-3 whitespace-nowrap overflow-x-hidden min-h-[60px]">
          {["Spot", "Futures", "Fund Transfer", "Trade"].map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              onClick={() => {
                setActiveMainTab(tab);
                setActiveSpotSubTab("Balance");
                setActiveFuturesSubTab("Positions");
              }}
              className={`pb-2 rounded-[8px] whitespace-nowrap
        text-sm sm:text-xs md:text-sm
        px-2 sm:px-2 md:px-3
        border border-white 
        ${
          activeMainTab === tab
            ? "bg-white text-black"
            : "bg-transparent text-white hover:text-gray-300"
        }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        <main className="flex-grow overflow-y-auto custom-scrollbar min-h-0">
          {wallet.loading ? (
            <p className="text-yellow-400 text-center py-6">
              Loading {wallet.name} data...
            </p>
          ) : wallet.error ? (
            <p className="text-red-500 text-center py-6">
              Error loading {wallet.name} data: {wallet.error}
            </p>
          ) : (
            <>
              {/* Spot Tab */}
              {activeMainTab === "Spot" && (
                <>
                  {/* Spot Sub Tabs */}
                  <nav
                    aria-label="Spot wallet sub tabs"
                    className="flex flex-wrap border-b border-[#2a2a2a] mb-4"
                  >
                    {["Balance", "Open Orders", "History"].map((subTab) => (
                      <Button
                        key={subTab}
                        variant="ghost"
                        onClick={() => setActiveSpotSubTab(subTab)}
                        className={`pb-2 rounded-none border-b-2 text-xs px-3 whitespace-nowrap ${
                          activeSpotSubTab === subTab
                            ? "border-gray-500 text-gray-100"
                            : "border-transparent text-gray-400 hover:text-gray-200"
                        }`}
                        aria-current={
                          activeSpotSubTab === subTab ? "page" : undefined
                        }
                        type="button"
                      >
                        {subTab === "Open Orders"
                          ? `Open Orders (${wallet.spotOpenOrders.length})`
                          : subTab}
                      </Button>
                    ))}
                  </nav>

                  {/* Spot Sub Tab Content */}
                  {activeSpotSubTab === "Balance" && (
                    <div className="space-y-2">
                      {wallet.assets.length > 0 ? (
                        wallet.assets.map((asset, index) => (
                          <SpotAssetItem
                            key={asset.ticker || index}
                            {...asset}
                          />
                        ))
                      ) : (
                        <p className="text-gray-400 text-center py-4">
                          No assets found in balance.
                        </p>
                      )}
                    </div>
                  )}

                  {activeSpotSubTab === "Open Orders" && (
                    <div className="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar pr-1">
                      {wallet.spotOpenOrders.length > 0 ? (
                        wallet.spotOpenOrders.map((order, index) => (
                          <SpotOpenOrderItem
                            key={`${order.pair}-${order.date}-${index}`}
                            {...order}
                          />
                        ))
                      ) : (
                        <p className="text-gray-400 text-center py-4">
                          No open orders.
                        </p>
                      )}
                    </div>
                  )}

                  {activeSpotSubTab === "History" && (
                    <p className="text-gray-400 text-center py-4">
                      Spot History content will go here.
                    </p>
                  )}
                </>
              )}

              {/* Futures Tab */}
              {activeMainTab === "Futures" && (
                <>
                  <nav
                    aria-label="Futures wallet sub tabs"
                    className="flex flex-wrap border-b border-[#2a2a2a] mb-4"
                  >
                    {["Positions", "Open Orders", "History"].map((subTab) => (
                      <Button
                        key={subTab}
                        variant="ghost"
                        onClick={() => setActiveFuturesSubTab(subTab)}
                        className={`pb-2 rounded-none border-b-2 text-xs px-3 whitespace-nowrap ${
                          activeFuturesSubTab === subTab
                            ? "border-gray-500 text-gray-100"
                            : "border-transparent text-gray-400 hover:text-gray-200"
                        }`}
                        aria-current={
                          activeFuturesSubTab === subTab ? "page" : undefined
                        }
                        type="button"
                      >
                        {subTab === "Positions"
                          ? `Positions (${wallet.futuresPositions.length})`
                          : subTab}
                      </Button>
                    ))}
                  </nav>
                  {activeFuturesSubTab === "Positions" && (
                    <div className="space-y-2">
                      {wallet.futuresPositions.length > 0 ? (
                        wallet.futuresPositions.map((position, index) => (
                          <FuturesPositionItem
                            key={`${position.pair}-${index}`}
                            {...position}
                          />
                        ))
                      ) : (
                        <p className="text-gray-400 text-center py-4">
                          No futures positions.
                        </p>
                      )}
                    </div>
                  )}
                  {activeFuturesSubTab === "Open Orders" && (
                    <p className="text-gray-400 text-center py-4">
                      Futures Open Orders content will go here.
                    </p>
                  )}
                  {activeFuturesSubTab === "History" && (
                    <p className="text-gray-400 text-center py-4">
                      Futures History content will go here.
                    </p>
                  )}
                </>
              )}

              {/* Fund Transfer Tab */}
              {activeMainTab === "Fund Transfer" && (
                <FundTransferForm/>
              )}

              {/* Trade Tab */}
              {activeMainTab === "Trade" && (
                <div className="flex flex-col space-y-4 ">
                  <div className="mb-1 relative">
                    <input
                      type="search"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-md bg-transparent text-gray-100 border border-[#f0f0f0] focus:outline-none focus:border-yellow-500"
                      aria-label="Search trade pairs"
                    />
                    <Search
                      className="absolute left-3 top-2.5 text-gray-400 pointer-events-none"
                      size={18}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar">
                    {filteredTradePairs.length > 0 ? (
                      filteredTradePairs.map((pair, index) => (
                        <TradePairItem
                          key={`${pair.ticker}-${index}`}
                          {...pair}
                          onClick={() => onTradePairClick(pair)}
                        />
                      ))
                    ) : (
                      <p className="text-gray-400 text-center py-4">
                        No tradable pairs found.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </CardContent>
    </section>
  );
};
