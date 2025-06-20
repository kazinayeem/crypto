import React from "react";
import { motion } from "framer-motion";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TotalBalanceSectionProps {
  totalBalance: number;
  todayChange: number;
  last7DaysChange: number;
  isMobileView?: boolean; // Optional since unused in your code
}

export const TotalBalanceSection: React.FC<TotalBalanceSectionProps> = ({
  totalBalance,
  todayChange,
  last7DaysChange,
}) => {
  // Helper: Get green/red color class based on positive/negative value
  const getColorClass = (value: number) =>
    value >= 0 ? "text-green-500" : "text-red-500";

  // Helper: Arrow symbol up/down
  const getSymbol = (value: number) => (value >= 0 ? "▲" : "▼");

  // Framer Motion variants for smooth transitions
  const changeVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  // Format large numbers into short form e.g. 12.3K, 1.2M
  const formatShortNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num.toFixed(2);
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
          className="
            font-bold 
            leading-tight 
            tracking-tight
            text-[28px] sm:text-[30px] md:text-[24px] lg:text-[28px] xl:text-[32px]
            text-[#1BCC7A]
            font-montserrat
            whitespace-nowrap
          "
        >
          {/* Short format on mobile to large laptops */}
          <span className="inline xl:hidden">
            ${formatShortNumber(totalBalance)}
          </span>

          {/* Full format on xl and larger screens */}
          <span className="hidden xl:inline">
            $
            {totalBalance.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </span>
        </p>

        <div
          className="
            text-[#e2e2e3] 
            text-xs             /* mobile */
            sm:text-[11px]      /* small tablets */
            md:text-[12px]      /* laptops */
            xl:text-sm          /* desktops */
            min-w-[130px] 
            text-right
            select-none
          "
        >
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
