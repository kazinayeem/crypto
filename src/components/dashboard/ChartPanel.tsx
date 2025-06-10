// src/components/dashboard/ChartPanel.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
];

const ChartPanel: React.FC = () => {
  return (
    <Card className="bg-gray-800 border-none rounded-lg p-4 h-full">
      <CardHeader className="flex flex-row justify-between items-center p-0 pb-2">
        <CardTitle className="text-sm text-gray-400">Chart</CardTitle>
        <div className="flex space-x-2 text-sm text-gray-400">
          <select className="bg-gray-700 rounded px-2 py-1">
            <option>Bitcoin/BTC</option>
          </select>
          <button className="bg-gray-700 rounded px-2 py-1">1W</button>
          <button className="bg-gray-700 rounded px-2 py-1">1M</button>
          <button className="bg-gray-700 rounded px-2 py-1">3M</button>
          <button className="bg-gray-700 rounded px-2 py-1">1Y</button>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-4 h-[calc(100%-40px)]">
        {" "}
        {/* Adjust height as needed */}
        <div className="text-3xl font-bold mb-4">$80,291</div>
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#FFD700"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
export default ChartPanel;
