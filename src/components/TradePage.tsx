import React, { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { SportMarket } from "./tradepage/SportMarket";
import { SportLimit } from "./tradepage/SportLimit";
import { FutureMarket } from "./tradepage/FutureMarket";
import { FutureLimit } from "./tradepage/FutureLimit";

// --- TradePage Component ---
interface TradePageProps {
  tradePair: { ticker: string };
  onClose: () => void;
}

export const TradePage: React.FC<TradePageProps> = ({ tradePair, onClose }) => {
  const [tradeType, setTradeType] = useState("Spot Trade");
  const [orderType, setOrderType] = useState("Market");
  const [leverageValue, setLeverageValue] = useState(50);

  return (
    <div className="w-full h-full bg-transparent text-gray-100 flex flex-col overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center mt-4 mb-2"
      >
        <ToggleGroup
          type="single"
          value={tradeType}
          onValueChange={(value) => value && setTradeType(value)}
          className="border-[0.8] border-white rounded-md"
        >
          {["Spot Trade", "Future Trade"].map((type) => (
            <ToggleGroupItem
              key={type}
              value={type}
              className={`text-xs px-4 py-2.5 font-medium text-white transition-colors duration-150
              data-[state=on]:bg-[#454545]
              data-[state=on]:text-white
              data-[state=off]:bg-transparent
              hover:bg-[#454545]/80
            `}
              asChild
            >
              <motion.button whileTap={{ scale: 0.95 }}>{type}</motion.button>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </motion.div>

      <div className="flex self-start items-center gap-3 justify-center px-2 py-3 border-b border-[#333] bg-transparent">
        <button
          onClick={onClose}
          className="mr-2 p-1 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>

        <div className="flex flex-col items-start">
          <span className="font-semibold text-base text-white">
            {tradePair.ticker}
          </span>
          <span className="text-red-500 text-xs">-0.49%</span>
        </div>
      </div>

      {tradeType === "Future Trade" && (
        <div className="flex items-center justify-between space-x-2 mb-4 p-2 w-[50%]">
          {["10X", "25X", "50X"].map((leverage) => (
            <button
              key={leverage}
              className={`flex-1 py-1.5 px-2 rounded-md border text-xs font-medium transition-colors ${
                leverage === "50X"
                  ? "border-white text-white"
                  : "border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300"
              }`}
            >
              {leverage}
            </button>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 px-2 py-2 bg-transparent w-full border-b border-[#333] mb-4 flex-wrap"
      >
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="bg-transparent border border-white text-white text-sm rounded-md px-3 py-2 focus:outline-none appearance-none"
          style={{
            width: "28%",
            backgroundColor: "transparent",
            colorScheme: "dark",
          }}
        >
          <option className="bg-[#1e1e1e] text-white" value="Market">
            Market
          </option>
          <option className="bg-[#1e1e1e] text-white" value="Limit">
            Limit
          </option>
        </select>

        <input
          type="number"
          placeholder="Market Price"
          className="bg-transparent border border-white text-white placeholder-gray-400 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-0"
          style={{ width: "28%" }}
        />

        <button
          className="flex items-center gap-1 px-3 py-2 text-sm border border-white rounded-md text-white hover:border-yellow-400 hover:text-yellow-400 transition-colors select-none justify-center"
          style={{ width: "35%" }}
        >
          Total USDT <ChevronDown size={14} />
        </button>
      </motion.div>

      <div className="flex-1 min-h-0 px-2 pb-4 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          {tradeType === "Spot Trade" && orderType === "Market" && (
            <SportMarket tradePair={tradePair} />
          )}
          {tradeType === "Spot Trade" && orderType === "Limit" && (
            <SportLimit tradePair={tradePair} />
          )}
          {tradeType === "Future Trade" && orderType === "Market" && (
            <FutureMarket
              tradePair={tradePair}
              leverageValue={leverageValue}
              setLeverageValue={setLeverageValue}
            />
          )}
          {tradeType === "Future Trade" && orderType === "Limit" && (
            <FutureLimit tradePair={tradePair} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
