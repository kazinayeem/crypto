import { motion } from "framer-motion";

const buttonBaseClasses =
  "py-3 rounded text-sm font-semibold transition-colors duration-150";

export const FutureLimit = ({
  tradePair,
}: {
  tradePair: { ticker: string };
}) => {
  const inputBaseClasses =
    "bg-[#2a2a2a] p-2.5 rounded text-gray-100 text-xs outline-none focus:ring-1 focus:ring-yellow-500 placeholder-gray-500";
  const textMutedClasses = "text-xs text-gray-400";

  return (
    <motion.div
      key="future-limit"
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-3"
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center bg-[#2a2a2a] rounded px-3">
          <input
            type="number"
            placeholder="Price (USDT)"
            className={`${inputBaseClasses} flex-grow bg-transparent py-0`}
          />
          <span className="text-gray-400 text-xs ml-2">USDT</span>
        </div>
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

      <div className="flex items-center bg-[#2a2a2a] rounded px-2.5">
        <input
          type="number"
          placeholder="Total (USDT)"
          className={`${inputBaseClasses} flex-grow bg-transparent py-0`}
        />
        <span className="text-gray-400 text-xs ml-2">USDT</span>
      </div>

      <div className="bg-[#2a2a2a] p-2.5 rounded space-y-2">
        <h3 className="text-sm font-semibold">TP/SL</h3>
        <div className="grid grid-cols-3 gap-2">
          {["TP Limit", "SL Trigger", "SL Limit"].map((ph) => (
            <input
              key={ph}
              type="number"
              placeholder={`${ph} (USDT)`}
              className={`bg-[#1a1a1a] p-2.5 rounded text-gray-100 text-xs outline-none focus:ring-1 focus:ring-yellow-500 placeholder-gray-500`}
            />
          ))}
        </div>
      </div>

      <div className={`${textMutedClasses} space-y-1`}>
        <p>Available: 0.0015644 USDT</p>
        <p>Max Buy: 0 {tradePair.ticker.replace("/USDT", "")}</p>
        <p>Est. Fee: -- {tradePair.ticker.replace("/USDT", "")}</p>
      </div>

      <div className="flex gap-3 px-0 pb-0">
        <button
          className={`flex-1 bg-[#10a761] hover:bg-green-600 rounded-sm text-white ${buttonBaseClasses}`}
        >
          Buy/Long
        </button>
        <button
          className={`flex-1 bg-[#dd3125] hover:bg-red-600 rounded-sm text-white ${buttonBaseClasses}`}
        >
          Sell/Short
        </button>
      </div>
    </motion.div>
  );
};
