import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { CryptoChart } from "./components/CryptoChart";
import { PriceOverviewChart } from "./components/PriceOverviewChart";
import { FearGreedIndex } from "./components/FearGreedIndex";
import { PortfolioDashboard } from "./components/PortfolioDashboard";
import FullScreenChat from "./components/YourAgent";
import { ThemeProvider } from "./components/theme-provider";
import { MessageCircle } from "lucide-react"; // icon

function App() {
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

        {/* Floating Chat Button */}
        <button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 z-50 p-3 bg-yellow-500 text-black rounded-full shadow-lg hover:bg-yellow-600 transition"
          aria-label="Open Chat"
        >
          <MessageCircle size={24} />
        </button>

        {/* Chat Modal */}
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
