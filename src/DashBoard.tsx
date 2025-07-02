import { useEffect, useState, useRef } from "react";
import { Header } from "./components/Header";
import CryptoChart from "./components/CryptoChart";
import FearGreedIndex from "./components/FearGreedIndex";
import { PortfolioDashboard } from "./components/PortfolioDashboard";
import FullScreenChat from "./components/Chat";
import { MessageCircle } from "lucide-react";
import PriceOverviewChart from "./components/PriceOverviewChart";
import { mainbgColor } from "./lib/bgcolor";
import { AnimatePresence, motion } from "framer-motion";

function DashBoard() {
  const [isMobile, setIsMobile] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Ref to measure dashboard height dynamically
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [dashboardHeight, setDashboardHeight] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Update dashboard height on mount and whenever dashboard content changes
  useEffect(() => {
    function updateHeight() {
      if (dashboardRef.current) {
        setDashboardHeight(dashboardRef.current.offsetHeight);
      }
    }
    updateHeight();

    // Optionally, observe size changes (if dashboard content changes dynamically)
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [isMobile, showChat]); // Add dependencies as needed

  const toggleChat = () => setShowChat((prev) => !prev);

  if (isMobile) {
    return (
      <div
        className="min-h-screen text-foreground font-sans relative flex flex-col gap-2"
        style={{ backgroundImage: mainbgColor }}
      >
        <motion.div
          ref={dashboardRef}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed top-0 left-0 right-0 z-50 "
          style={{
            backgroundColor: "rgba(10, 20, 40, 0.5)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            padding: "1rem",
          }}
        >
          <Header />
          <PortfolioDashboard />
          <div className="mb-10"></div>
        </motion.div>
        <div
          className="flex flex-col flex-grow overflow-auto pb-20 gap-2 p-2 mt-20"
          style={{
            paddingTop: dashboardHeight,
            minHeight: 0,
            backgroundImage: mainbgColor,
          }}
        >
          <div className="flex flex-col flex-grow gap-2 min-h-0">
            <div className="flex-1 min-h-0 overflow-auto">
              <PriceOverviewChart />
            </div>
            <div className="flex-1 min-h-0 overflow-auto">
              <FearGreedIndex />
            </div>
          </div>
        </div>

        {/* Fixed Chat button */}
        <button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 z-50 p-3 bg-yellow-500 text-black rounded-full shadow-lg hover:bg-yellow-600 transition"
          aria-label="Open Chat"
        >
          <MessageCircle size={24} />
        </button>

        <AnimatePresence>
          {showChat && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="relative w-full h-full p-4"
                style={{ backgroundImage: mainbgColor }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop part unchanged
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
