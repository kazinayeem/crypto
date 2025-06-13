// src/WalletItem.tsx
import React, { useRef, useEffect, useState } from "react";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button"; // Import Button from shadcn/ui
import type { WalletData } from "@/wallets";

interface WalletItemProps {
  icon: React.ReactNode;
  name: string;
  isActive?: boolean;
  onClick: () => void;
  isMobileView?: boolean;
  loading?: boolean;
  error?: string | null;
}

export const WalletItem: React.FC<WalletItemProps> = ({
  icon,
  name,
  isActive,
  onClick,
  isMobileView = false,
  loading = false,
  error = null,
}) => {
  const activeClasses = "bg-yellow-800 text-yellow-200"; // Styles for active wallet
  const inactiveClasses = "text-gray-100"; // Styles for inactive wallet

  const baseClass = `rounded-lg cursor-pointer select-none p-3 ${
    isActive ? activeClasses : inactiveClasses
  }`;

  return isMobileView ? (
    <motion.div
      onClick={onClick}
      whileHover={{
        backgroundColor: isActive ? "#78350f" : "#2a2a2a",
      }}
      whileTap={{ scale: 0.97 }}
      className={`flex flex-col items-center justify-center min-w-[140px] min-h-[100px] mx-2 ${baseClass}`}
    >
      <div className="mb-2">{icon}</div>
      <span className="truncate text-center">
        {name}
        {loading && " (Loading...)"}
        {error && " (Error)"}
      </span>
      <MoreVertical
        size={16}
        className="mt-2 text-gray-400 hover:text-gray-300"
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to parent div
      />
    </motion.div>
  ) : (
    // Desktop view rendering (horizontal layout with hover/tap animations)
    <motion.li
      onClick={onClick}
      whileHover={{
        backgroundColor: isActive ? "#78350f" : "#2a2a2a",
      }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center justify-between space-x-3 p-3 ${baseClass}`}
    >
      <div className="flex items-center space-x-3 overflow-hidden">
        {icon}
        <span className="truncate max-w-[120px] sm:max-w-none">
          {name}
          {loading && " (Loading...)"}
          {error && " (Error)"}
        </span>
      </div>
      <MoreVertical size={16} className="text-gray-400 hover:text-gray-300" />
    </motion.li>
  );
};

interface WalletListProps {
  wallets: WalletData[];
  selectedWallet: WalletData | null;
  handleWalletClick: (wallet: WalletData) => void;
  isMobileView: boolean;
}

export const WalletList: React.FC<WalletListProps> = ({
  wallets,
  selectedWallet,
  handleWalletClick,
  isMobileView,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null); // Ref for the scrollable container
  const [canScrollLeft, setCanScrollLeft] = useState(false); // State to control left scroll button visibility
  const [canScrollRight, setCanScrollRight] = useState(false); // State to control right scroll button visibility

  // Function to check scrollability and update button visibility.
  const checkScroll = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    }
  };

  useEffect(() => {
    // Add event listeners for scroll and resize to update scroll buttons.
    checkScroll(); // Initial check
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    // Cleanup function to remove event listeners.
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [wallets]); // Re-run effect when wallets data changes (e.g., Bybit data loads)

  // Scrolls the container left by a fixed amount.
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  };

  // Scrolls the container right by a fixed amount.
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Desktop View: Vertical list of wallets */}
      {!isMobileView && (
        <ul className="flex flex-col space-y-2 overflow-y-auto custom-scrollbar-hidden">
          {wallets.map((wallet) => (
            <WalletItem
              key={wallet.id}
              icon={wallet.icon()}
              name={wallet.name}
              isActive={selectedWallet?.id === wallet.id}
              onClick={() => handleWalletClick(wallet)}
              loading={wallet.loading} // Pass loading state
              error={wallet.error} // Pass error state
            />
          ))}
        </ul>
      )}

      {/* Mobile View: Horizontal scrollable list with navigation buttons */}
      {isMobileView && (
        <div className="relative w-full mt-4">
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white text-black rounded-full shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex space-x-2 overflow-x-auto px-10 scroll-smooth custom-scrollbar-hidden"
            style={{
              scrollSnapType: "x mandatory", // Enables snap-to-item scrolling
              WebkitOverflowScrolling: "touch", // Improves scrolling performance on iOS
            }}
          >
            {wallets.map((wallet) => (
              <WalletItem
                key={wallet.id}
                icon={wallet.icon()}
                name={wallet.name}
                isActive={selectedWallet?.id === wallet.id}
                onClick={() => handleWalletClick(wallet)}
                isMobileView // Pass mobile view prop to WalletItem
                loading={wallet.loading}
                error={wallet.error}
              />
            ))}
          </div>

          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white text-black rounded-full shadow-md"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      )}
      <Button
        variant="outline"
        className="mt-6 w-full border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#191919]"
      >
        + Connect Wallet
      </Button>
    </div>
  );
};
