import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { fakeWallets, type WalletData } from "./fakeData";
import { TotalBalanceSection } from "./TotalBalanceSection";
import { WalletItem } from "./WalletItem";
import { WalletDetailSection } from "./WalletDetailSection";

export function PortfolioDashboard() {
  const [activeView, setActiveView] = useState<"list" | "detail">("list");
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null);

  const totalBalance = fakeWallets.reduce(
    (acc, wallet) => acc + wallet.balance,
    0
  );
  const todayChange = -2.5;
  const last7DaysChange = 4.25;

  const handleWalletClick = (wallet: WalletData) => {
    setSelectedWallet(wallet);
    setActiveView("detail");
  };

  const handleCloseDetail = () => {
    setActiveView("list");
    setSelectedWallet(null);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
      width: "100%",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
      width: "100%",
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
      width: "100%",
    }),
  };

  const direction = activeView === "detail" ? 1 : -1;

  return (
    <div
      className="flex items-center justify-center p-4 font-sans"
      style={{
        background: `linear-gradient(to bottom, #191919 0%, #191919 75%, #292a55 75%, #292a55 100%)`,
      }}
    >
      <Card className="w-full max-w-md h-[600px] text-gray-100 border border-[#333] shadow-lg rounded-lg p-4 flex flex-col relative overflow-hidden bg-[#191919]">
        <AnimatePresence initial={false} custom={direction}>
          {activeView === "list" && (
            <motion.div
              key="list"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col h-full"
            >
              <TotalBalanceSection
                totalBalance={totalBalance}
                todayChange={todayChange}
                last7DaysChange={last7DaysChange}
              />
              <nav className="flex-grow overflow-y-auto custom-scrollbar pt-4">
                <ul>
                  {fakeWallets.map((wallet) => (
                    <WalletItem
                      key={wallet.id}
                      icon={wallet.icon}
                      name={wallet.name}
                      isActive={
                        selectedWallet?.id === wallet.id &&
                        activeView === "detail"
                      }
                      onClick={() => handleWalletClick(wallet)}
                    />
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="mt-6 w-full border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#191919]"
                >
                  + Connect Wallet
                </Button>
              </nav>
            </motion.div>
          )}

          {activeView === "detail" && selectedWallet && (
            <motion.div
              key="detail"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col h-full"
            >
              <WalletDetailSection
                wallet={selectedWallet}
                onClose={handleCloseDetail}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #292a55;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #555;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #777;
          }
          @media (max-width: 640px) {
            .max-w-md {
              max-width: 100%;
              height: auto;
            }
          }
        `}</style>
      </Card>
    </div>
  );
}
