import { X, Search } from "lucide-react";
import React, { useState, useMemo } from "react";
import { Button } from "./ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WalletData } from "@/wallets";

// Placeholder components
const SpotAssetItem: React.FC<any> = ({ name, amount, usdValue, iconUrl }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
    <div className="flex items-center space-x-3">
      <img src={iconUrl} alt={name} className="w-6 h-6 rounded-full" />
      <p className="font-medium text-gray-900 dark:text-white">{name}</p>
    </div>
    <div className="text-right">
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
  <div className="bg-[#2a2a2a] p-3 rounded-md text-sm">
    <p><strong>Pair:</strong> {pair}</p>
    <p><strong>Type:</strong> {type}</p>
    <p><strong>Amount:</strong> {amount}</p>
    <p><strong>Price:</strong> {price}</p>
    <p><strong>TP/SL:</strong> {tp_sl}</p>
    <p><strong>Date:</strong> {date}</p>
  </div>
);

const FuturesPositionItem: React.FC<any> = ({
  pair,
  pnlUsdt,
  roi,
  sizeUsdt,
  leverage,
}) => (
  <div className="bg-[#2a2a2a] p-3 rounded-md text-sm">
    <p><strong>Pair:</strong> {pair}</p>
    <p><strong>PnL (USDT):</strong> {pnlUsdt.toFixed(2)}</p>
    <p><strong>ROI:</strong> {roi.toFixed(2)}%</p>
    <p><strong>Size (USDT):</strong> {sizeUsdt.toFixed(2)}</p>
    <p><strong>Leverage:</strong> {leverage}</p>
  </div>
);

const TradePairItem: React.FC<any> = ({ ticker, change24hrs, iconUrl }) => (
  <div className="bg-[#2a2a2a] p-3 rounded-md text-sm flex items-center space-x-2">
    <img src={iconUrl} alt={ticker} className="w-5 h-5 rounded-full" />
    <p>
      <strong>{ticker}:</strong> {change24hrs.toFixed(2)}% (24h Change)
    </p>
  </div>
);

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
        return `$${wallet.assets.reduce((sum, asset) => sum + asset.usdValue, 0).toFixed(2)}`;
      case "Futures":
        return `$${wallet.futuresPositions.reduce((sum, pos) => sum + pos.sizeUsdt, 0).toFixed(2)}`;
      case "Trade":
        return `$${wallet.balance.toFixed(2)}`;
      default:
        return `$${wallet.balance.toFixed(2)}`;
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent text-gray-100">
      <CardHeader className="border-b border-[#333] flex items-center justify-between">
        <CardTitle className="text-lg font-bold text-gray-100 uppercase tracking-wide">
          {wallet.name.toUpperCase()} BALANCE
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close wallet detail"
          className="rounded-full border-red-900 border-3 text-gray-400 hover:text-gray-200"
        >
          <X size={25} color="red" />
        </Button>
      </CardHeader>

      <CardContent className="p-0 pt-4 flex flex-col flex-grow">
        <p className="text-3xl font-bold text-yellow-500 mb-2">
          {getHeaderValue()}
        </p>

        <div className="flex items-center space-x-4 text-sm mb-4">
          <div className="flex items-center">
            <span className="mr-1 text-gray-400">Today</span>
            <span className={`${todayChangeColor} flex items-center`}>
              {wallet.todayChange >= 0 ? "+" : ""}
              {wallet.todayChange}%
              <span className="ml-1 text-xs">
                {wallet.todayChange >= 0 ? "▲" : "▼"}
              </span>
            </span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 text-gray-400">Last 7 days</span>
            <span className={`${last7DaysChangeColor} flex items-center`}>
              {wallet.last7DaysChange >= 0 ? "+" : ""}
              {wallet.last7DaysChange}%
              <span className="ml-1 text-xs">
                {wallet.last7DaysChange >= 0 ? "▲" : "▼"}
              </span>
            </span>
          </div>
        </div>

        <div className="flex border-b border-[#333] mb-4">
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
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
          {wallet.loading && (
            <p className="text-yellow-400 text-center py-4">
              Loading {wallet.name} data...
            </p>
          )}
          {wallet.error && (
            <p className="text-red-500 text-center py-4">
              Error loading {wallet.name} data: {wallet.error}
            </p>
          )}

          {!wallet.loading && !wallet.error && (
            <>
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
                        {subTab === "Positions"
                          ? `Positions (${wallet.futuresPositions.length})`
                          : subTab}
                      </Button>
                    ))}
                  </div>
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

              {activeMainTab === "Fund Transfer" && (
                <p className="text-gray-400 text-center py-4">
                  Fund Transfer content will go here.
                </p>
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
                    <Search
                      className="absolute left-3 top-3 text-gray-400"
                      size={16}
                    />
                  </div>
                  <div className="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar">
                    {filteredTradePairs.length > 0 ? (
                      filteredTradePairs.map((pair, index) => (
                        <TradePairItem
                          key={`${pair.ticker}-${index}`}
                          {...pair}
                        />
                      ))
                    ) : (
                      <p className="text-gray-400 text-center py-4">
                        No tradable pairs found.
                      </p>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </CardContent>
    </div>
  );
};
