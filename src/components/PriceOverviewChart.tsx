// src/components/PriceOverviewChart.tsx
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Sample data format
const depthData = [
  { price: 104080, buyCumulative: 35, sellCumulative: 0, buyVolume: 8, sellVolume: 0 },
  { price: 104090, buyCumulative: 28, sellCumulative: 5, buyVolume: 6, sellVolume: 5 },
  { price: 104100, buyCumulative: 20, sellCumulative: 10, buyVolume: 4, sellVolume: 5 },
  { price: 104110, buyCumulative: 12, sellCumulative: 18, buyVolume: 4, sellVolume: 8 },
  { price: 104120, buyCumulative: 6, sellCumulative: 28, buyVolume: 2, sellVolume: 10 },
  { price: 104130, buyCumulative: 0, sellCumulative: 40, buyVolume: 0, sellVolume: 12 },
];

export function PriceOverviewChart() {
  const currentPrice = 104124.99;

  return (
    <Card className=" dark:bg-gray-900 bg-white text-gray-800 dark:text-gray-200 border-none shadow-lg rounded-lg p-4 flex flex-col">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-md text-center text-yellow-500">
          Price {currentPrice}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full p-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={depthData}>
            <XAxis
              dataKey="price"
              stroke="#9CA3AF"
              tickFormatter={(tick) => tick.toString().replace(/^104/, "104,")}
            />
            <YAxis stroke="#9CA3AF" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                borderColor: "#4B5563",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#FBBF24" }}
              labelStyle={{ color: "#FDE68A" }}
              formatter={(value: number) => Math.round(value * 100) / 100}
            />

            <ReferenceLine x={currentPrice} stroke="#facc15" strokeDasharray="3 3" />

            {/* Buy Line */}
            <Line
              type="monotone"
              dataKey="buyCumulative"
              stroke="#34D399"
              strokeWidth={3}
              dot={false}
            />
            {/* Sell Line */}
            <Line
              type="monotone"
              dataKey="sellCumulative"
              stroke="#F87171"
              strokeWidth={3}
              dot={false}
            />

            {/* Buy Vol Bars */}
            <Bar dataKey="buyVolume" fill="#10B981" barSize={4} />
            {/* Sell Vol Bars */}
            <Bar dataKey="sellVolume" fill="#EF4444" barSize={4} />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
