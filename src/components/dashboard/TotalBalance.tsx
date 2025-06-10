// src/components/dashboard/TotalBalance.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"; // Shadcn Card

const TotalBalance: React.FC = () => {
  return (
    <Card className="bg-gray-800 border-none rounded-lg p-4">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-sm text-gray-400">TOTAL BALANCE</CardTitle>
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
            +4.25%{" "}
            <span className="ml-1 text-xs text-gray-500">last 7 days</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
export default TotalBalance;
