import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

export const SportLimit = ({
  tradePair,
}: {
  tradePair: { ticker: string };
}) => {
  const buttonBaseClasses =
    "py-3 rounded text-sm font-semibold transition-colors duration-150";

  const inputBaseClasses =
    "bg-[#2a2a2a] px-2 py-2 rounded text-gray-100 text-xs outline-none focus:ring-1 focus:ring-yellow-500 placeholder-gray-500 w-full";
  const textMutedClasses = "text-xs text-gray-400";

  return (
    <motion.div
      key="sport-limit"
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-4"
    >
      <div className="space-y-2">
        <p className="text-sm font-semibold text-white">TP / SL Type</p>
        <RadioGroup defaultValue="tpsl" className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tpsl" id="tpsl" />
            <Label htmlFor="tpsl">TP / SL</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-wrap gap-3">
        {["TP (USDT)", "SL Trigger", "SL Limit"].map((placeholder) => (
          <div
            key={placeholder}
            className="flex items-center w-[30%] bg-[#2a2a2a] rounded px-2"
          >
            <button
              type="button"
              className="text-gray-300 px-2 hover:text-white"
            >
              -
            </button>
            <input
              type="number"
              placeholder={placeholder}
              className={`${inputBaseClasses} bg-transparent text-center`}
            />
            <button
              type="button"
              className="text-gray-300 px-2 hover:text-white"
            >
              +
            </button>
          </div>
        ))}
      </div>

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
