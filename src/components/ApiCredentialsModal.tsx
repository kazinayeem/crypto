import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react"; // replace with your icon lib or your own icon

interface ApiCredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (apiKey: string, secretKey: string) => void;
  error?: string | null;
}

export const ApiCredentialsModal: React.FC<ApiCredentialsModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  error,
}) => {
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // tailwind sm breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = () => {
    onSubmit(apiKey, secretKey);
  };

  const isDisabled = !apiKey || !secretKey;

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  if (!isOpen) return null;

  if (isMobile) {
    return (
      <div className="fixed  inset-0 bg-[#111111] text-white p-4 flex flex-col">
        <div className="flex items-center mb-6">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-800 transition"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="ml-4 text-lg font-semibold">API Credentials</h2>
        </div>

        <div className="flex-grow overflow-auto">
          <p className="text-gray-400 mb-6 leading-relaxed">
            Find your{" "}
            <span className="text-yellow-500 font-semibold">
              API credentials
            </span>{" "}
            in the{" "}
            <span className="text-yellow-500 font-semibold">API settings</span>{" "}
            of your{" "}
            <span className="text-yellow-500 font-bold">Binance</span> account.
          </p>

          <div className="space-y-4">
            <Input
              id="api-key"
              type="password"
              placeholder="********************"
              className="bg-[#222222] border border-gray-600 text-white placeholder-gray-400 focus:ring-yellow-500 focus:border-yellow-500"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <Input
              id="secret-key"
              type="password"
              placeholder="********************"
              className={`bg-[#222222] ${
                error ? "border-red-500" : "border-gray-600"
              } text-white placeholder-gray-400 focus:ring-yellow-500 focus:border-yellow-500`}
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
            {error && (
              <p className="text-red-500 text-sm pl-1">
                your API is wrong, please check again
              </p>
            )}
          </div>

          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`mt-6 w-full rounded-md py-2 text-white transition-colors duration-200 ${
              isDisabled
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }

  // Desktop: modal with framer-motion animation
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[400px] bg-[#111111] rounded-xl p-8 text-white border border-gray-700"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader className="text-center">
            <DialogTitle className="text-base font-medium text-gray-200 leading-snug">
              Find your{" "}
              <span className="text-yellow-500 font-semibold">
                API credentials
              </span>{" "}
              in the{" "}
              <span className="text-yellow-500 font-semibold">API settings</span>{" "}
              of your <span className="text-yellow-500 font-bold">Binance</span>{" "}
              account.
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6 space-y-4">
            <Input
              id="api-key"
              type="password"
              placeholder="********************"
              className="bg-[#222222] border border-gray-600 text-white placeholder-gray-400 focus:ring-yellow-500 focus:border-yellow-500"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <Input
              id="secret-key"
              type="password"
              placeholder="********************"
              className={`bg-[#222222] ${
                error ? "border-red-500" : "border-gray-600"
              } text-white placeholder-gray-400 focus:ring-yellow-500 focus:border-yellow-500`}
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
            {error && (
              <p className="text-red-500 text-sm pl-1">
                your API is wrong, please check again
              </p>
            )}
          </div>

          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`mt-6 w-full rounded-md py-2 text-white transition-colors duration-200 ${
              isDisabled
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            Submit
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
