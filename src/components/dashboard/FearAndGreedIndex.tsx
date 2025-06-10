// src/components/dashboard/FearAndGreedIndex.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const FearAndGreedIndex: React.FC = () => {
  const indexValue = 70; // Example value

  const getDialRotation = (value: number) => {
    // Map 0-100 to 0-180 degrees (or adjust for your specific dial)
    return (value / 100) * 180 - 90; // -90 to 90 degrees for a semicircle
  };

  return (
    <Card className="bg-gray-800 border-none rounded-lg p-4 text-center">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-sm text-gray-400">Fear and Greed Index</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col items-center justify-center h-full">
        <div className="relative w-48 h-24 overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-12 rounded-t-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
          <div
            className="absolute bottom-0 left-1/2 w-1 h-12 bg-white origin-bottom-center"
            style={{
              transform: `translateX(-50%) rotate(${getDialRotation(indexValue)}deg)`,
              transformOrigin: 'bottom center',
              transition: 'transform 0.5s ease-in-out',
            }}
          ></div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-gray-800"></div>
        </div>
        <span className="mt-4 text-xl font-bold">{indexValue}</span>
      </CardContent>
    </Card>
  );
};
export default FearAndGreedIndex;