// Example of a mobile-specific screen (BinanceBalanceScreen.tsx)

import { TotalBalanceCard } from "./TotalBalanceCard"; // Reuse the component
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface AssetItemProps {
  name: string;
  balance: string;
  avgCost: string;
  todayPnl: string;
}

const AssetItem: React.FC<AssetItemProps> = ({
  name,
  balance,
  avgCost,
  todayPnl,
}) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-700 last:border-b-0">
    <div>
      <p className="text-gray-200 font-semibold">{name}</p>
      <p className="text-gray-400 text-sm">Today's PnL: {todayPnl}</p>
    </div>
    <div className="text-right">
      <p className="text-gray-200">{balance}</p>
      <p className="text-gray-400 text-sm">Avg. Cost: {avgCost}</p>
    </div>
  </div>
);

export function BinanceBalanceScreen() {
  return (
    <div className="p-4">
      <TotalBalanceCard
        totalBalance={158565}
        todayChange={-2.5}
        last7DaysChange={4.25}
      />
      <Card className="mt-4 bg-gray-800 text-gray-200 border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-md text-gray-400">
            BINANCE BALANCE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="balance" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-700">
              <TabsTrigger
                value="balance"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
              >
                Balance
              </TabsTrigger>
              <TabsTrigger
                value="open-orders"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
              >
                Open Orders (2)
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
              >
                History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="balance" className="mt-4">
              <AssetItem
                name="PEPE"
                balance="0.57"
                avgCost="0.000000000057 USDT"
                todayPnl="0.57"
              />
              <AssetItem
                name="PEPE"
                balance="0.57"
                avgCost="0.000000000057 USDT"
                todayPnl="0.57"
              />
              <AssetItem
                name="PEPE"
                balance="0.57"
                avgCost="0.000000000057 USDT"
                todayPnl="0.57"
              />
            </TabsContent>
            <TabsContent value="open-orders">
              {/* Open orders content */}
            </TabsContent>
            <TabsContent value="history">{/* History content */}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
