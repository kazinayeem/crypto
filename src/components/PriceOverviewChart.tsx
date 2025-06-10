// src/components/PriceOverviewChart.tsx
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const priceData = [
  { name: "Mon", price: 10000, volume: 500 },
  { name: "Tue", price: 10200, volume: 600 },
  { name: "Wed", price: 9800, volume: 400 },
  { name: "Thu", price: 10500, volume: 700 },
  { name: "Fri", price: 10300, volume: 550 },
  { name: "Sat", price: 10600, volume: 800 },
  { name: "Sun", price: 10400, volume: 650 },
];

export function PriceOverviewChart() {
  return (
    <Card className="h-[550px] bg-gray-800 text-gray-200 border-none shadow-lg rounded-lg p-4 flex flex-col">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-md text-gray-400">Price 10404.99</CardTitle>
      </CardHeader>
      <CardContent className="h-full p-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={priceData}>
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis yAxisId="left" stroke="#6b7280" />
            <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#374151",
                borderColor: "#4b5563",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#e2e8f0" }}
              labelStyle={{ color: "#f6e05e" }}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="price"
              stroke="#f6e05e"
              fill="#f6e05e30"
            />
            <Bar yAxisId="right" dataKey="volume" fill="#4a5568" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
