// src/components/dashboard/PriceChart.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const priceData = [
  { name: "1", price: 10400, volume: 2000 },
  { name: "2", price: 10450, volume: 2500 },
  // ... more data
];

const PriceChart: React.FC = () => {
  return (
    <Card className="bg-gray-800 border-none rounded-lg p-4 h-full">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-sm text-gray-400">Price 10404.99</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-4 h-[calc(100%-40px)]">
        <ResponsiveContainer width="100%" height="50%">
          <BarChart data={priceData}>
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="volume" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        {/* Add your line chart for price here */}
        <ResponsiveContainer width="100%" height="50%">
          <LineChart data={priceData}>
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
export default PriceChart;
