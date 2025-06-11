import React from "react";
import { MoreVertical } from "lucide-react";
import { motion } from "framer-motion";

interface WalletItemProps {
  icon: React.ReactNode;
  name: string;
  isActive?: boolean;
  onClick: () => void;
}

export const WalletItem: React.FC<WalletItemProps> = ({
  icon,
  name,
  isActive,
  onClick,
}) => (
  <motion.li
    onClick={onClick}
    initial={false}
    whileHover={{ scale: 1.03, backgroundColor: isActive ? "#78350f" : "#2a2a2a" }}
    whileTap={{ scale: 0.97 }}
    className={`flex items-center justify-between space-x-3 p-3 rounded-lg cursor-pointer transition-colors select-none ${
      isActive
        ? "bg-yellow-800 text-yellow-200"
        : "text-gray-100"
    }`}
    style={{ userSelect: "none" }}
  >
    <div className="flex items-center space-x-3 overflow-hidden">
      {icon}
      <span className="truncate max-w-[120px] sm:max-w-none">{name}</span>
    </div>
    <MoreVertical size={16} className="text-gray-500 hover:text-gray-300" />
  </motion.li>
);
