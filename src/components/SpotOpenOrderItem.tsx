import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface SpotOpenOrderItemProps {
  pair: string;
  type: string;
  amount: string;
  price: number;
  tp_sl: string;
  date: string;
}

export const SpotOpenOrderItem: React.FC<SpotOpenOrderItemProps> = ({
  pair,
  type,
  amount,
  price,
  tp_sl,
  date,
}) => {
  return (
    <div className="flex flex-col py-3 border-b border-[#2a2a2a] last:border-b-0 text-sm">
      <div className="flex justify-between items-center mb-1">
        <span className="text-red-500 font-medium">{type}</span>
        <span className="text-gray-400 text-xs">{date}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-gray-300">
        <div>
          <span className="text-gray-400">Amount: </span>
          {amount}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Price: </span>
          {price.toFixed(2)}
          <Pencil size={12} className="ml-1 text-gray-500 cursor-pointer" />
        </div>
        <div className="col-span-2 flex justify-between items-center">
          <span className="text-gray-400">TP/SL: </span>
          {tp_sl}
          <Pencil size={12} className="ml-1 text-gray-500 cursor-pointer" />
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <Button
          variant="outline"
          className="text-red-500 border-red-500 hover:bg-red-900 hover:text-white px-4 py-1 h-auto text-xs rounded-md"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
