// src/components/FearGreedIndex.tsx
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface FearGreedIndexProps {
  value: number; // Value from 0-100
}

export function FearGreedIndex({ value }: FearGreedIndexProps) {
  // Calculate rotation for the needle (0 to 180 degrees)
  const rotation = (value / 100) * 180 - 90; // Adjust for the starting position at -90 degrees

  // Determine color based on value
  let indicatorColor = "bg-red-500";
  if (value > 25 && value <= 50) indicatorColor = "bg-orange-500";
  if (value > 50 && value <= 75) indicatorColor = "bg-yellow-400";
  if (value > 75) indicatorColor = "bg-green-500";

  return (
    <Card className="bg-gray-800 text-gray-200 border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-md text-gray-400">Fear and Greed Index</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-[200px]">
        <div className="relative w-48 h-24 overflow-hidden">
          {/* Semi-circle background */}
          <div
            className="absolute inset-x-0 bottom-0 h-48 rounded-t-full"
            style={{
              background: `linear-gradient(to right, 
                hsl(0deg 80% 50%) 0%, 
                hsl(30deg 80% 50%) 25%, 
                hsl(60deg 80% 50%) 50%, 
                hsl(90deg 80% 50%) 75%, 
                hsl(120deg 80% 50%) 100%
              )`,
            }}
          ></div>
          {/* Inner semi-circle to create the arc */}
          <div className="absolute inset-x-[10px] bottom-[10px] h-44 rounded-t-full bg-gray-800"></div>

          {/* Needle */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-1/2 origin-bottom transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-50%) rotate(${rotation}deg)`,
              backgroundColor: indicatorColor,
            }}
          >
            <div className={`absolute -top-1 -left-[3px] w-2 h-2 rounded-full ${indicatorColor}`}></div>
          </div>

          {/* Center dot */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-600"></div>
        </div>
        <p className="text-4xl font-bold mt-4 text-white">{value}</p>
      </CardContent>
    </Card>
  );
}