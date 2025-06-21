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
      <div
        style={{
          backgroundImage: `linear-gradient(
      305deg,
      hsl(0deg 0% 10%) 0%,
      hsl(250deg 22% 17%) 7%,
      hsl(247deg 32% 25%) 15%,
      hsl(244deg 37% 32%) 23%,
      hsl(242deg 41% 41%) 31%,
      hsl(240deg 44% 49%) 40%,
      hsl(240deg 44% 49%) 49%,
      hsl(242deg 41% 41%) 58%,
      hsl(244deg 37% 32%) 67%,
      hsl(247deg 32% 25%) 78%,
      hsl(250deg 22% 17%) 88%,
      hsl(0deg 0% 10%) 100%
    )`,
        }}
        className="min-h-screen  text-foreground font-sans relative p-4 gap-4 flex flex-col bg-background"
      >
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
                className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 p-2 rounded-full shadow-md"
                aria-label="Close chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div
        style={{
          backgroundImage: `linear-gradient(
      305deg,
      hsl(0deg 0% 10%) 0%,
      hsl(250deg 22% 17%) 7%,
      hsl(247deg 32% 25%) 15%,
      hsl(244deg 37% 32%) 23%,
      hsl(242deg 41% 41%) 31%,
      hsl(240deg 44% 49%) 40%,
      hsl(240deg 44% 49%) 49%,
      hsl(242deg 41% 41%) 58%,
      hsl(244deg 37% 32%) 67%,
      hsl(247deg 32% 25%) 78%,
      hsl(250deg 22% 17%) 88%,
      hsl(0deg 0% 10%) 100%
    )`,
        }}
        className="flex flex-col min-h-screen  text-foreground font-sans"
      >
        <Header />
        {/* <LiveKitVideoCall /> */}
        <main className="flex-grow flex flex-col p-4 pt-0">
          <div className="flex flex-grow gap-4 overflow-hidden">
            <div
              className="flex flex-col gap-4 overflow-hidden"
              style={{ flexBasis: "30%" }}
            >
              <div className="flex-1 min-h-0 overflow-auto">
                <PortfolioDashboard />
              </div>
              <div className="flex-1 min-h-0 overflow-auto">
                <PriceOverviewChart />
              </div>
            </div>

            {/* Middle column - 36.78% */}
            <div
              className="flex flex-col gap-4 overflow-hidden"
              style={{ flexBasis: "45%" }}
            >
              <div className="flex-1 min-h-0 overflow-auto">
                <CryptoChart />
              </div>
              <div className="flex-1 min-h-0 overflow-auto">
                <FearGreedIndex />
              </div>
            </div>

            {/* Right column - 26.61% */}
            <div
              className="flex-1 min-h-0 overflow-auto"
              style={{ flexBasis: "26.61%" }}
            >
              <FullScreenChat />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default DashBoard;
