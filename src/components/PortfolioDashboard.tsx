import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TotalBalanceSection } from "./TotalBalanceSection";
import { WalletDetailSection } from "./WalletDetailSection";
import { WalletList } from "./WalletItem";
import { useSelector, useDispatch } from "react-redux";
import type { WalletData } from "@/wallets";
import type { AppDispatch, RootState } from "@/store";
import { fetchBybitWalletData } from "@/features/wallets/walletsSlice";
import { TradePage } from "./TradePage";
import { useActiveWalletName } from "@/hooks/useActiveWalletName";

export function PortfolioDashboard() {
  const [activeView, setActiveView] = useState<"list" | "detail" | "tradePage">(
    "list"
  );
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [selectedTradePair, setSelectedTradePair] = useState<any | null>(null);

  const wallets = useSelector((state: RootState) => state.wallets.wallets);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchBybitWalletData());
  }, [dispatch]);

  const totalBalance = wallets.reduce((acc, wallet) => acc + wallet.balance, 0);
  const bybitWallet = wallets.find((wallet) => wallet.id === "bybit");
  const todayChange = bybitWallet?.todayChange ?? 0;
  const last7DaysChange = bybitWallet?.last7DaysChange ?? 0;
  const activeWalletName = useActiveWalletName(selectedWallet);
  useEffect(() => {
    if (activeWalletName) {
      console.log("Active wallet name:", activeWalletName);
    }
  }, [activeWalletName]);
  const handleWalletClick = (wallet: WalletData) => {
    setSelectedWallet(wallet);
    setActiveView("detail");
  };
  const handleTradePairClick = (pair: any) => {
    setSelectedTradePair(pair);
    setActiveView("tradePage");
  };

  const handleCloseTradePage = () => {
    setActiveView("detail");
    setSelectedTradePair(null);
  };

  const handleCloseDetail = () => {
    setActiveView("list");
    setSelectedWallet(null);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute" as const,
      width: "100%",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative" as const,
      width: "100%",
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      position: "absolute" as const,
      width: "100%",
    }),
  };

  const direction = activeView === "detail" ? 1 : -1;

  return (
    <div className="flex items-center justify-center w-full h-full font-sans rounded-2xl shadow-xl border border-white">
      <div className="w-full h-full text-gray-100  border-white  p-4 flex flex-col relative overflow-hidden custom-scrollbar bg-transparent">
        <AnimatePresence initial={false} custom={direction}>
          {activeView === "list" && (
            <motion.div
              key="walletViews"
              custom={direction}
              initial="enter"
              animate="center"
              variants={variants}
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col h-full overflow-auto"
            >
              <TotalBalanceSection
                totalBalance={totalBalance}
                todayChange={todayChange}
                last7DaysChange={last7DaysChange}
                isMobileView={isMobileView}
              />
              <nav className="flex-grow pt-4 overflow-auto">
                <WalletList
                  wallets={wallets}
                  selectedWallet={selectedWallet}
                  handleWalletClick={handleWalletClick}
                  isMobileView={isMobileView}
                />
              </nav>
            </motion.div>
          )}

          {activeView === "detail" && selectedWallet && (
            <motion.div
              key="detail"
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col h-full overflow-auto"
            >
              <WalletDetailSection
                wallet={selectedWallet}
                onClose={handleCloseDetail}
                onTradePairClick={handleTradePairClick}
              />
            </motion.div>
          )}
          {activeView === "tradePage" && selectedTradePair && (
            <motion.div
              key="trade"
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col h-full overflow-auto"
            >
              <TradePage
                tradePair={selectedTradePair}
                onClose={handleCloseTradePage}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 0px;
            height: 0px;
          }
          .custom-scrollbar {
            scrollbar-width: none;
          }
          @media (hover: hover) and (pointer: fine) {
            .custom-scrollbar:hover::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }
            .custom-scrollbar:hover::-webkit-scrollbar-thumb {
              background: #555;
              border-radius: 10px;
            }
            .custom-scrollbar:hover::-webkit-scrollbar-track {
              background: #292a55;
              border-radius: 10px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
