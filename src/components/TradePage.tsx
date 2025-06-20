import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
// import "./CustomSlider.css"; // Keep if you have custom styles not covered by Tailwind
import { motion, AnimatePresence } from "framer-motion";

// --- CustomSlider Component (No changes needed, already clean and functional) ---
const marks = {
  1: "1x",
  25: "25x",
  50: "50x",
  75: "75x",
  100: "100x",
  125: "125x",
};

const CustomSlider = ({
  initialValue = 50,
  onChange,
}: {
  initialValue?: number;
  onChange?: (val: number | number[]) => void;
}) => {
  return (
    <div className="w-full relative px-0 pt-2 pb-6">
      <Slider
        min={1}
        max={125}
        marks={marks}
        step={null}
        defaultValue={initialValue}
        onChange={onChange}
        trackStyle={{ backgroundColor: "white" }}
        railStyle={{ backgroundColor: "#444" }}
        handleStyle={{ display: "none" }}
        className="rc-slider-custom"
      />
    </div>
  );
};

// --- TradePage Component ---
interface TradePageProps {
  tradePair: { ticker: string };
  onClose: () => void;
}

export const TradePage: React.FC<TradePageProps> = ({ tradePair, onClose }) => {
  const [tradeType, setTradeType] = useState("Spot Trade");
  const [orderType, setOrderType] = useState("Market");
  const [leverageValue, setLeverageValue] = useState(50);

  // Common Tailwind CSS classes for better maintainability and smaller inputs
  // Reduced padding (p-2.5 instead of p-3) and explicitly set text-xs
  const inputBaseClasses =
    "bg-[#2a2a2a] p-2.5 rounded text-gray-100 text-xs outline-none focus:ring-1 focus:ring-yellow-500 placeholder-gray-500";
  const textMutedClasses = "text-xs text-gray-400";
  const buttonBaseClasses =
    "py-3 rounded text-sm font-semibold transition-colors duration-150";

  // Framer Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  };

  return (
    <div className="w-full h-full bg-transparent text-gray-100 flex flex-col overflow-hidden px-4">
      {/* Spot/Future toggle at top */}
      <motion.div
        className="flex justify-center mt-4 mb-2 space-x-3" // Adjusted space-x
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {["Spot Trade", "Future Trade"].map((type) => (
          <motion.button
            key={type}
            onClick={() => setTradeType(type)}
            className={`px-4 py-2.5 rounded-[5px] border text-xs font-semibold transition-colors duration-150 ${ // Adjusted px/py
              tradeType === type
                ? "bg-gray-600 border-transparent text-white"
                : "bg-transparent border border-white text-white hover:border-yellow-400 hover:text-yellow-400"
            }`}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            {type}
          </motion.button>
        ))}
      </motion.div>

      {/* Arrow + BTC/USDT -0.49% */}
      <div className="flex items-center justify-between px-2 py-3 border-b border-[#333]">
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div className="flex items-center gap-2 justify-center flex-grow">
          <span className="font-semibold text-base">{tradePair.ticker}</span>
          <span className="text-red-500 text-xs">-0.49%</span>
        </div>
        <div className="w-6" /> {/* Spacer for centering */}
      </div>

      {/* Market/Limit toggle */}
      <motion.div
        className="flex justify-center mt-4 mb-4 space-x-3" // Adjusted space-x
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {["Market", "Limit"].map((type) => (
          <motion.button
            key={type}
            onClick={() => setOrderType(type)}
            className={`px-4 py-2.5 rounded-[5px] border text-xs font-semibold transition-colors duration-150 ${ // Adjusted px/py
              orderType === type
                ? "bg-gray-600 border-transparent text-white"
                : "bg-transparent border border-white text-white hover:border-yellow-400 hover:text-yellow-400"
            }`}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            {type}
          </motion.button>
        ))}
      </motion.div>

      {/* Form inputs and controls with animation */}
      {/* Changed space-y-3 from space-y-4 for tighter vertical spacing */}
      <div className="px-0 pb-6 pt-2 flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          {orderType === "Market" && (
            <motion.div
              key="market-form"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="space-y-3"
            >
              {/* Gap adjusted to gap-2 for smaller horizontal spacing */}
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Market Price"
                  readOnly
                  className={inputBaseClasses}
                />
                {/* Adjusted py-2.5 for consistency with inputBaseClasses */}
                <div className="flex items-center bg-[#2a2a2a] rounded px-2.5">
                  <input
                    type="number"
                    placeholder="Amount"
                    className={`${inputBaseClasses} flex-grow bg-transparent py-0`} 
                  />
                  <span className="text-gray-400 text-xs ml-2">USDT</span>
                </div>
              </div>

              {tradeType === "Future Trade" && (
                <motion.div variants={itemVariants}>
                  <p className={`${textMutedClasses} mb-1.5`}>Leverage</p> {/* Reduced mb */}
                  <CustomSlider
                    initialValue={leverageValue}
                    onChange={(v) => setLeverageValue(v as number)}
                  />
                </motion.div>
              )}

              {tradeType === "Future Trade" && (
                <motion.div variants={itemVariants} className="flex space-x-2 mt-2"> {/* space-x and mt adjusted */}
                  {["Take Profit", "Stop Loss"].map((label) => (
                    <button
                      key={label}
                      className={`flex-1 py-2.5 rounded-[5px] border border-white text-white bg-transparent text-xs hover:border-yellow-400 hover:text-yellow-400 transition-colors`}
                      type="button"
                    >
                      {label}
                    </button>
                  ))}
                </motion.div>
              )}

              <div className={`${textMutedClasses} space-y-1 mt-2`}> {/* mt adjusted */}
                <p>Available: 0.0015644 USDT</p>
                <p>Max Buy: 0 {tradePair.ticker.replace("/USDT", "")}</p>
                <p>Est. Fee: -- {tradePair.ticker.replace("/USDT", "")}</p>
              </div>
            </motion.div>
          )}

          {orderType === "Limit" && (
            <motion.div
              key="limit-form"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="space-y-3" // Adjusted space-y
            >
              {/* Gap adjusted to gap-2 */}
              <div className="grid grid-cols-2 gap-2">
                {/* Adjusted py-2.5 for consistency */}
                <div className="flex items-center bg-[#2a2a2a] rounded px-2.5">
                  <input
                    type="number"
                    placeholder="Price (USDT)"
                    className={`${inputBaseClasses} flex-grow bg-transparent py-0`}
                  />
                  <span className="text-gray-400 text-xs ml-2">USDT</span>
                </div>
                {/* Adjusted py-2.5 for consistency */}
                <div className="flex items-center bg-[#2a2a2a] rounded px-2.5">
                  <input
                    type="number"
                    placeholder="Amount"
                    className={`${inputBaseClasses} flex-grow bg-transparent py-0`}
                  />
                  <span className="text-gray-400 text-xs ml-2">
                    {tradePair.ticker.replace("/USDT", "")}
                  </span>
                </div>
              </div>

              {/* Adjusted py-2.5 for consistency */}
              <div className="flex items-center bg-[#2a2a2a] rounded px-2.5">
                <input
                  type="number"
                  placeholder="Total (USDT)"
                  className={`${inputBaseClasses} flex-grow bg-transparent py-0`}
                />
                <span className="text-gray-400 text-xs ml-2">USDT</span>
              </div>

              <motion.div variants={itemVariants} className="bg-[#2a2a2a] p-2.5 rounded space-y-2 mt-2"> {/* p and mt adjusted */}
                <h3 className="text-sm font-semibold">TP/SL</h3>
                <div className="grid grid-cols-3 gap-2"> {/* Gap adjusted to gap-2 */}
                  {["TP Limit", "SL Trigger", "SL Limit"].map((ph) => (
                    <input
                      key={ph}
                      type="number"
                      placeholder={`${ph} (USDT)`}
                      className={`bg-[#1a1a1a] p-2.5 rounded text-gray-100 text-xs outline-none focus:ring-1 focus:ring-yellow-500 placeholder-gray-500`} // p adjusted
                    />
                  ))}
                </div>
              </motion.div>

              <div className={`${textMutedClasses} space-y-1 mt-2`}> {/* mt adjusted */}
                <p>Available: 0.0015644 USDT</p>
                <p>Max Buy: 0 {tradePair.ticker.replace("/USDT", "")}</p>
                <p>Est. Fee: -- {tradePair.ticker.replace("/USDT", "")}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buy / Sell buttons with colored backgrounds */}
        <div className="flex gap-3 mt-4"> {/* Adjusted gap and mt */}
          {tradeType === "Spot Trade" ? (
            <>
              <button
                className={`flex-1 bg-[#10a761] hover:bg-green-600 text-white ${buttonBaseClasses}`}
              >
                Buy {tradePair.ticker.replace("/USDT", "")}
              </button>
              <button
                className={`flex-1 bg-[#dd3125] hover:bg-red-600 text-white ${buttonBaseClasses}`}
              >
                Sell {tradePair.ticker.replace("/USDT", "")}
              </button>
            </>
          ) : (
            <>
              <button
                className={`flex-1 bg-[#10a761] hover:bg-green-600 text-white ${buttonBaseClasses}`}
              >
                Buy/Long
              </button>
              <button
                className={`flex-1 bg-[#dd3125] hover:bg-red-600 text-white ${buttonBaseClasses}`}
              >
                Sell/Short
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};