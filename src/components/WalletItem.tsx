import React, { useRef, useEffect, useState } from "react";
import { MoreVertical, ChevronLeft, ChevronRight, Wallet2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import type { WalletData } from "@/wallets";
import { ApiCredentialsModal } from "./ApiCredentialsModal"; // Modal for API credentials
import { AddWalletModal } from "./AddWalletModal";

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
  const activeClasses = "bg-yellow-800 text-yellow-200 border-yellow-400";
  const inactiveClasses = "text-gray-100 border-white border opacity-50";

  const baseClass = `rounded-lg cursor-pointer select-none p-3 ${
    isActive ? activeClasses : inactiveClasses
  }`;

  return isMobileView ? (
    <motion.div
      onClick={onClick}
      whileHover={{
        backgroundColor: isActive ? "#78350f" : "#2a2a2a",
        borderColor: isActive ? "#F59E0B" : "#FFFFFF", // Hover border color
      }}
      whileTap={{ scale: 0.97 }}
      className={`relative flex flex-col items-center justify-center min-w-[140px] min-h-[100px] mx-2 ${baseClass}`}
    >
      <div className="absolute top-2 right-2">
        <MoreVertical
          size={16}
          className="text-gray-400 hover:text-gray-300 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
          aria-label="More options"
        />
      </div>
      <div className="mb-2">{icon}</div>
      <span className="truncate text-center text-sm font-semibold">
        {name}
        {loading && " (Loading...)"}
        {error && " (Error)"}
      </span>
    </motion.div>
  ) : (
    <motion.li
      onClick={onClick}
      whileHover={{
        backgroundColor: isActive ? "#78350f" : "#2a2a2a",
        borderColor: isActive ? "#F59E0B" : "#FFFFFF", // Hover border color
      }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center justify-between space-x-3 p-3 ${baseClass}`}
    >
      <div className="flex items-center space-x-3 overflow-hidden">
        {icon}
        <span className="truncate max-w-[120px] sm:max-w-none font-semibold">
          {name}
          {loading && " (Loading...)"}
          {error && " (Error)"}
        </span>
      </div>
      <MoreVertical
        size={16}
        className="text-gray-400 hover:text-gray-300 cursor-pointer"
        aria-label="More options"
      />
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
  const [isAddWalletModalOpen, setIsAddWalletModalOpen] = useState(false);
  const [, setSelectedExchange] = useState<string | null>(null);

  // Sample exchange data for AddWalletModal
  const exchanges = [
    {
      name: "Binance",
      icon: (
        <img
          src="https://ui-avatars.com/api/?name=B&background=000&color=fff&bold=true"
          className="w-6 h-6 rounded-full"
        />
      ),
    },
    {
      name: "Bybit",
      icon: (
        <img
          src="https://ui-avatars.com/api/?name=BY&background=111&color=fff&bold=true"
          className="w-6 h-6 rounded-full"
        />
      ),
    },
    {
      name: "Coinbase",
      icon: (
        <img
          src="https://ui-avatars.com/api/?name=C&background=222&color=fff&bold=true"
          className="w-6 h-6 rounded-full"
        />
      ),
    },
    {
      name: "VESPR",
      icon: (
        <img
          src="https://ui-avatars.com/api/?name=V&background=333&color=fff&bold=true"
          className="w-6 h-6 rounded-full"
        />
      ),
    },
    {
      name: "Bybit",
      icon: (
        <img
          src="https://ui-avatars.com/api/?name=BY&background=444&color=fff&bold=true"
          className="w-6 h-6 rounded-full"
        />
      ),
    },
  ];

  // Replace handleConnectWalletClick with:
  const handleConnectWalletClick = () => {
    setIsAddWalletModalOpen(true);
  };

  // Called when clicking "Add" inside AddWalletModal
  const handleWalletAddClick = (walletName: string) => {
    setSelectedExchange(walletName); // Could use to customize modal message
    setIsAddWalletModalOpen(false);
    setTimeout(() => setIsModalOpen(true), 300); // slight delay for smooth transition
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [wallets]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });
  };

  // const handleConnectWalletClick = () => {
  //   setIsModalOpen(true);
  //   setApiError(null);
  // };

  const handleModalSubmit = (apiKey: string, secretKey: string) => {
    if (apiKey === "correct_api_key" && secretKey === "correct_secret_key") {
      alert("API Keys submitted successfully!");
      setIsModalOpen(false);
      setApiError(null);
    } else {
      setApiError("Your API is wrong, please check again");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Desktop/Tablet vertical wallet list */}
      {!isMobileView && (
        <ul className="flex flex-col space-y-2 overflow-y-auto custom-scrollbar-hidden max-h-[70vh]">
          {wallets.map((wallet) => (
            <WalletItem
              key={wallet.id}
              icon={wallet.icon()}
              name={wallet.name}
              isActive={selectedWallet?.id === wallet.id}
              onClick={() => handleWalletClick(wallet)}
              loading={wallet.loading}
              error={wallet.error}
            />
          ))}
        </ul>
      )}

      {/* Mobile horizontal scroll wallet list */}
      {isMobileView && (
        <div className="relative w-full mt-4">
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white text-black rounded-full shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex space-x-2 overflow-x-auto px-10 scroll-smooth custom-scrollbar-hidden"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {wallets.map((wallet) => (
              <WalletItem
                key={wallet.id}
                icon={wallet.icon()}
                name={wallet.name}
                isActive={selectedWallet?.id === wallet.id}
                onClick={() => handleWalletClick(wallet)}
                isMobileView
                loading={wallet.loading}
                error={wallet.error}
              />
            ))}

            {/* + Connect Wallet Button styled as a WalletItem for mobile */}
            <motion.div
              onClick={handleConnectWalletClick}
              whileHover={{
                backgroundColor: "#2a2a2a",
              }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center justify-center min-w-[140px] min-h-[100px] mx-2 rounded-lg cursor-pointer select-none p-3 text-gray-100 border border-white opacity-50" // Added border-white and opacity
            >
              <div className="mb-2 text-3xl">+</div>
              <span className="truncate text-center text-sm font-semibold">
                Connect Wallet
              </span>
            </motion.div>
          </div>

          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white text-black rounded-full shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      )}

      {/* Connect Wallet button for Desktop/Tablet */}
      {!isMobileView && (
        <Button
          variant="outline"
          className="mt-6 w-full bg-transparent  transition-colors"
          onClick={handleConnectWalletClick}
        >
          <Wallet2 size={16} className="mr-2" />
          Connect Wallet
        </Button>
      )}

      <AddWalletModal
        isOpen={isAddWalletModalOpen}
        onClose={() => setIsAddWalletModalOpen(false)}
        wallets={exchanges}
        onWalletAddClick={handleWalletAddClick}
      />

      <ApiCredentialsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        error={apiError}
      />
    </div>
  );
};
