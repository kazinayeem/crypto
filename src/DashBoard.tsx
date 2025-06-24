import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import  CryptoChart  from "./components/CryptoChart";
import FearGreedIndex  from "./components/FearGreedIndex";
import { PortfolioDashboard } from "./components/PortfolioDashboard";
import FullScreenChat from "./components/Chat";
import { MessageCircle } from "lucide-react";
import PriceOverviewChart from "./components/PriceOverviewChart";
import { mainbgColor } from "./lib/bgcolor";

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
          backgroundImage: `${mainbgColor}`,
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
            <div
              style={{
                backgroundImage: `${mainbgColor}`,
              }}
              className="relative w-full h-full p-4"
            >
              <FullScreenChat />
              <button
                onClick={toggleChat}
                className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 p-2 rounded-full shadow-md"
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
    <div
      style={{
        backgroundImage: `${mainbgColor}`,
      }}
      className="flex flex-col  text-foreground font-sans min-h-[140vh]"
    >
      <Header />
      {/* <LiveKitVideoCall /> */}
      <main className="flex-grow flex flex-col p-4 pt-0">
        <div className="flex flex-grow gap-4 overflow-hidden">
          <div
            className="flex flex-col gap-4 overflow-hidden"
            style={{ flexBasis: "30%" }}
          >
            <div className="flex-1 min-h-0 overflow-auto ">
              <PortfolioDashboard />
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
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
            <div className="flex-1 min-h-0 overflow-hidden">
              <FearGreedIndex />
            </div>
          </div>

          <div
            className="flex-1 min-h-0 overflow-auto"
            style={{ flexBasis: "26.61%" }}
          >
            <FullScreenChat />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashBoard;
