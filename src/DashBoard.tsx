import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { CryptoChart } from "./components/CryptoChart";
import { FearGreedIndex } from "./components/FearGreedIndex";
import { PortfolioDashboard } from "./components/PortfolioDashboard";
import FullScreenChat from "./components/YourAgent";
import { ThemeProvider } from "./components/theme-provider";
import { MessageCircle } from "lucide-react";
import PriceOverviewChart from "./components/PriceOverviewChart";

function DashBoard() {
  const [isMobile, setIsMobile] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleChat = () => setShowChat((prev) => !prev);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans relative">
        <Header />
        <PortfolioDashboard />
        <PriceOverviewChart />
        <FearGreedIndex />

        <button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 z-50 p-3 bg-yellow-500 text-black rounded-full shadow-lg hover:bg-yellow-600 transition"
          aria-label="Open Chat"
        >
          <MessageCircle size={24} />
        </button>

        {showChat && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
            <div className="relative w-full h-full p-4 bg-background">
              <FullScreenChat />
              <button
                onClick={toggleChat}
                className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 p-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
        <Header />
        {/* <LiveKitVideoCall /> */}
        <main className="flex-grow flex flex-col p-4 pt-0">
          <div className="flex flex-grow gap-4 overflow-hidden">
            {/* Left column */}
            <div className="w-1/4 flex flex-col gap-4 overflow-hidden">
              <div className="flex-1 min-h-0 overflow-auto">
                <PortfolioDashboard />
              </div>
              <div className="flex-1 min-h-0 overflow-auto">
                <PriceOverviewChart />
              </div>
            </div>

            {/* Middle column */}
            <div className="w-1/2 flex flex-col gap-4 overflow-hidden">
              <div className="flex-1 min-h-0 overflow-auto">
                <CryptoChart />
              </div>
              <div className="flex-1 min-h-0 overflow-auto">
                <FearGreedIndex />
              </div>
            </div>

            {/* Right column */}
            <div className="w-1/4 flex-1 min-h-0 overflow-auto">
              <FullScreenChat />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default DashBoard;
