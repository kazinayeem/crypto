// src/components/dashboard/WalletList.tsx
import React from 'react';
import { Card, CardContent } from '../../components/ui/card';

const WalletItem: React.FC<{ icon: string; name: string }> = ({ icon, name }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
    <div className="flex items-center space-x-2">
      <img src={icon} alt={name} className="h-6 w-6" />
      <span>{name}</span>
    </div>
    {name !== 'Connect Wallet' && (
      <button className="text-gray-400 hover:text-white">...</button>
    )}
  </div>
);

const WalletList: React.FC = () => {
  return (
    <Card className="bg-gray-800 border-none rounded-lg p-4">
      <CardContent className="p-0">
        <WalletItem icon="/path/to/bee-wallet-icon.png" name="Bee Wallet" />
        <WalletItem icon="/path/to/binance-icon.png" name="Binance" />
        <WalletItem icon="/path/to/bybit-icon.png" name="Bybit" />
        <WalletItem icon="/path/to/coinbase-icon.png" name="Coinbase" />
        <WalletItem icon="/path/to/plus-icon.png" name="Connect Wallet" />
      </CardContent>
    </Card>
  );
};
export default WalletList;