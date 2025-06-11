import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { CryptoChart } from "./components/CryptoChart";
import { PriceOverviewChart } from "./components/PriceOverviewChart";
import { FearGreedIndex } from "./components/FearGreedIndex";
import { BinanceBalanceScreen } from "./components/BinanceBalanceScreen";
import { PortfolioDashboard } from "./components/PortfolioDashboard";
import FullScreenChat from "./components/YourAgent";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Header />
        <BinanceBalanceScreen />
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="flex flex-col min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
        <Header />
        <div className="flex-grow p-4 pt-0">
          <div className="grid grid-cols-12 gap-4 h-full">
            <div className="col-span-3 grid grid-rows-2 gap-4 h-full">
              <PortfolioDashboard />
              <PriceOverviewChart />
            </div>
            <div className="col-span-6 grid grid-rows-2 gap-4 h-full">
              <CryptoChart />
              <FearGreedIndex />
            </div>
            <div className="col-span-3 h-full">
              <FullScreenChat />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
