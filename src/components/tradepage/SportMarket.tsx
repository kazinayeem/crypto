import { motion } from "framer-motion";
export const SportMarket = ({
  tradePair,
}: {
  tradePair: { ticker: string };
}) => {
  const textMutedClasses = "text-xs text-gray-400";
  const buttonBaseClasses =
    "py-3 rounded text-sm font-semibold transition-colors duration-150";

  return (
    <motion.div
      key="sport-market"
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-3"
    >
      <div className={`${textMutedClasses} space-y-2`}>
        {[
          { label: "Available", value: "0.0015644 USDT" },
          {
            label: `Max Buy`,
            value: `0 ${tradePair.ticker.replace("/USDT", "")}`,
          },
          {
            label: "Est. Fee",
            value: `-- ${tradePair.ticker.replace("/USDT", "")}`,
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between text-gray-400 text-xs sm:text-sm"
          >
            <span>{label}</span>
            <span className="font-medium text-white">{value}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 px-0 pb-0">
        <button
          className={`flex-1 bg-[#10a761] hover:bg-green-600 rounded-sm text-white ${buttonBaseClasses}`}
        >
          Buy {tradePair.ticker.replace("/USDT", "")}
        </button>
        <button
          className={`flex-1 bg-[#dd3125] hover:bg-red-600 rounded-sm text-white ${buttonBaseClasses}`}
        >
          Sell {tradePair.ticker.replace("/USDT", "")}
        </button>
      </div>
    </motion.div>
  );
};
