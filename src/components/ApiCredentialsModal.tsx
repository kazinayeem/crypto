import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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

  const handleSubmit = () => {
    onSubmit(apiKey, secretKey);
  };

  const isDisabled = !apiKey || !secretKey;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-[#111111] rounded-xl p-8 text-white border border-gray-700">
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
      </DialogContent>
    </Dialog>
  );
};
