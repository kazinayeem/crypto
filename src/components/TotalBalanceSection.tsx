import React from "react";
import { motion } from "framer-motion";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TotalBalanceSectionProps {
  totalBalance: number;
  todayChange: number;
  last7DaysChange: number;
  isMobileView: boolean;
}

export const TotalBalanceSection: React.FC<TotalBalanceSectionProps> = ({
  totalBalance,
  todayChange,
  last7DaysChange,
}) => {
  const getColorClass = (value: number) =>
    value >= 0 ? "text-green-500" : "text-red-500";

  const getSymbol = (value: number) => (value >= 0 ? "▲" : "▼");

  const changeVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="pb-4 border-b border-[#333]">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-xs text-[#e2e2e3] uppercase tracking-wide">
          Total Balance
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 flex items-center justify-between">
        <p
          className="text-[28px] sm:text-[32px] font-bold leading-tight tracking-tight"
          style={{ color: "#1BCC7A", fontFamily: "Montserrat" }}
        >
          $
          {totalBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </p>

        <div className="flex flex-col text-[#e2e2e3] text-xs sm:text-sm min-w-[130px] text-right">
          <div className="flex justify-between mb-1 font-medium opacity-70">
            <span>Today</span>
            <span>7d</span>
          </div>

          <div className="flex justify-between font-semibold">
            <motion.div
              key={`today-${todayChange}`}
              className={`${getColorClass(
                todayChange
              )} flex items-center justify-end space-x-1`}
              variants={changeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <span>
                {todayChange >= 0 ? "+" : ""}
                {todayChange}%
              </span>
              <span className="text-xs">{getSymbol(todayChange)}</span>
            </motion.div>

            <motion.div
              key={`week-${last7DaysChange}`}
              className={`${getColorClass(
                last7DaysChange
              )} flex items-center justify-end space-x-1`}
              variants={changeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <span>
                {last7DaysChange >= 0 ? "+" : ""}
                {last7DaysChange}%
              </span>
              <span className="text-xs">{getSymbol(last7DaysChange)}</span>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </div>
  );
};
