// AddWalletModal.tsx
import React from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface AddWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWalletAddClick: (walletName: string) => void;
  wallets: { name: string; icon: React.ReactNode }[];
}

export const AddWalletModal: React.FC<AddWalletModalProps> = ({
  isOpen,
  onClose,
  onWalletAddClick,
  wallets,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1f1f1f] rounded-2xl p-4 w-full max-w-sm text-white border border-gray-700">
        <DialogHeader className="flex items-center space-x-2 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white"
          >
            {/* You can use an SVG or any icon library here */}
            <span style={{ fontSize: 24 }}>←</span>
          </Button>
          <span className="text-lg font-semibold">Add Exchange</span>
        </DialogHeader>
        <ul className="space-y-4">
          {wallets.map((wallet, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                  {wallet.icon}
                </div>
                <span className="font-medium">{wallet.name}</span>
              </div>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                onClick={() => onWalletAddClick(wallet.name)}
              >
                Add
              </Button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};
