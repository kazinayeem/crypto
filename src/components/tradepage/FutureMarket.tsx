const buttonBaseClasses =
  "py-3 rounded text-sm font-semibold transition-colors duration-150";
import { motion } from "framer-motion";
import { CustomSlider } from "./CustomSlider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
export const FutureMarket = ({
  tradePair,
  leverageValue,
  setLeverageValue,
}: {
  tradePair: { ticker: string };
  leverageValue: number;
  setLeverageValue: (val: number) => void;
}) => {
  const textMutedClasses = "text-xs text-gray-400";

  return (
    <motion.div
      key="future-market"
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col space-y-3"
    >
      <div>
        <p className={`${textMutedClasses} mb-1.5`}>Leverage</p>
        <CustomSlider
          initialValue={leverageValue}
          onChange={(v) => setLeverageValue(v as number)}
        />
      </div>

      <div className="flex flex-col space-y-3">
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Option One</Label>
          </div>
        </RadioGroup>

        <div className="flex space-x-2">
          {["Take Profit", "Stop Loss"].map((label) => (
            <button
              key={label}
              className="flex-1 py-2.5 rounded-[5px] border border-white text-white bg-transparent text-xs hover:border-yellow-400 hover:text-yellow-400 transition-colors"
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
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
