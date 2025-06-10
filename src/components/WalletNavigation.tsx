// src/components/WalletNavigation.tsx
import { Button } from "./ui/button";
import { Wallet, DollarSign, ArrowUpRightFromSquare, Database } from "lucide-react"; // Example icons

interface WalletItemProps {
  icon: React.ReactNode;
  name: string;
  isActive?: boolean;
}

const WalletItem: React.FC<WalletItemProps> = ({ icon, name, isActive }) => (
  <li
    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
      isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-800 text-gray-300"
    }`}
  >
    {icon}
    <span>{name}</span>
  </li>
);

export function WalletNavigation() {
  return (
    <nav className="p-4 bg-gray-900 rounded-lg shadow-lg h-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-200">Wallet</h2>
      <ul>
        <WalletItem icon={<Wallet size={20} />} name="Bee Wallet" isActive />
        <WalletItem icon={<DollarSign size={20} />} name="Binance" />
        <WalletItem icon={<ArrowUpRightFromSquare size={20} />} name="Bybit" />
        <WalletItem icon={<Database size={20} />} name="Coinbase" />
      </ul>
      <Button variant="outline" className="mt-6 w-full text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-gray-900">
        + Connect Wallet
      </Button>
    </nav>
  );
}