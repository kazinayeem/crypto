// src/components/mobile/MobileDashboard.tsx
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import TotalBalance from '../dashboard/TotalBalance';
import PriceChart from '../dashboard/PriceChart';
import FearAndGreedIndex from '../dashboard/FearAndGreedIndex';
import AgentChat from '../dashboard/AgentChat';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const MobileDashboard: React.FC = () => {
  const [, setActiveTab] = useState('dashboard');

  
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      {/* Top Header (Bee, Connected, Avatar) */}
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <img src="/path/to/bee-logo.png" alt="Bee Logo" className="h-6 w-6" />
          <span className="text-xl font-bold">Bee</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-green-400">Connected</span>
          <img src="/path/to/avatar.png" alt="User Avatar" className="h-6 w-6 rounded-full" />
        </div>
      </header>

      <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="your_agent">Your Agent</TabsTrigger>
          <TabsTrigger value="binance">Binance</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-4 space-y-4">
          <TotalBalance />
          <PriceChart />
          <FearAndGreedIndex />
        </TabsContent>

        <TabsContent value="your_agent" className="mt-4">
          <AgentChat />
        </TabsContent>

        <TabsContent value="binance" className="mt-4 space-y-4">
          <Card className="bg-gray-800 border-none rounded-lg p-4">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-sm text-gray-400">BINANCE BALANCE</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-green-400">$158,565</div>
              <div className="flex items-center text-sm mt-2">
                <span className="text-red-400 flex items-center mr-2">
                  <span className="inline-block w-2 h-2 bg-red-400 rounded-full mr-1"></span>
                  -2.5%
                </span>
                <span className="text-green-400 flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                  +4.25% <span className="ml-1 text-xs text-gray-500">last 7 days</span>
                </span>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full">
                  Buy
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full">
                  Sell
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full">
                  Convert
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full">
                  Margin
                </button>
              </div>
              <div className="mt-4 border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Balance</span>
                  <span className="text-lg font-bold text-green-400">$20,000</span>
                </div>
                <div className="flex space-x-4 text-sm text-gray-400">
                  <button className="py-1 border-b-2 border-blue-500 text-blue-500">
                    Open Orders (2)
                  </button>
                  <button className="py-1">History</button>
                </div>
                <div className="mt-4 space-y-3">
                  {/* Crypto Asset List Item */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img src="/path/to/pepe-icon.png" alt="PEPE" className="h-6 w-6" />
                      <div>
                        <div className="font-bold">PEPE</div>
                        <div className="text-xs text-gray-400">0.00000001 USDT</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">0.57</div>
                      <div className="text-xs text-red-400">Today's PNL: -1.23%</div>
                    </div>
                  </div>
                  {/* Repeat for other PEPE items */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img src="/path/to/pepe-icon.png" alt="PEPE" className="h-6 w-6" />
                      <div>
                        <div className="font-bold">PEPE</div>
                        <div className="text-xs text-gray-400">Avg Cost</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">0.57</div>
                      <div className="text-xs text-green-400">Today's PNL: +0.5%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img src="/path/to/pepe-icon.png" alt="PEPE" className="h-6 w-6" />
                      <div>
                        <div className="font-bold">PEPE</div>
                        <div className="text-xs text-gray-400">Today's PNL:</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">0.57</div>
                      <div className="text-xs text-green-400">0.57</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MobileDashboard;