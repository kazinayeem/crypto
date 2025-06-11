import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface FuturesPositionItemProps {
  pair: string;
  pnlUsdt: number;
  roi: number;
  sizeUsdt: number;
  marginUsdt: number;
  entryPrice: number;
  markPrice: number;
  liqPrice: string;
  tp_sl: string;
  leverage: string;
}

export const FuturesPositionItem: React.FC<FuturesPositionItemProps> = ({
  pair,
  pnlUsdt,
  roi,
  sizeUsdt,
  marginUsdt,
  entryPrice,
  markPrice,
  liqPrice,
  tp_sl,
  leverage,
}) => {
  const pnlColor = pnlUsdt >= 0 ? "text-green-500" : "text-red-500";
  const roiColor = roi >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="flex flex-col py-4 border-b border-[#2a2a2a] last:border-b-0 text-sm">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-gray-100 font-bold">{pair}</span>
          <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded-md text-xs">Prep</span>
          <span className="bg-blue-600 text-white px-2 py-0.5 rounded-md text-xs">{leverage}</span>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-xs">ROI</p>
          <p className={`${roiColor} font-bold text-base`}>{roi.toFixed(2)}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-gray-300">
        <div>
          <p className={`${pnlColor} text-base font-medium`}>{pnlUsdt.toFixed(2)} USDT</p>
          <p className="text-gray-400 text-xs">Unrealized PNL (USDT)</p>
        </div>
        <div className="text-right">
          <p>{marginUsdt.toFixed(2)}</p>
          <p className="text-gray-400 text-xs">Margin (USDT)</p>
        </div>
        <div>
          <p>{sizeUsdt.toFixed(4)}</p>
          <p className="text-gray-400 text-xs">Size (USDT)</p>
        </div>
        <div className="text-right">
          <p>{markPrice.toFixed(5)}</p>
          <p className="text-gray-400 text-xs">Mark Price (USDT)</p>
        </div>
        <div>
          <p>{entryPrice.toFixed(5)}</p>
          <p className="text-gray-400 text-xs">Entry Price (USDT)</p>
        </div>
        <div className="text-right">
          <p>{liqPrice}</p>
          <p className="text-gray-400 text-xs">Liq. Price (USDT)</p>
        </div>
        <div className="col-span-2 flex items-center mt-2">
          <span className="text-gray-400">TP/SL: </span>
          <span className="ml-1">{tp_sl}</span>
          <Pencil size={12} className="ml-1 text-gray-500 cursor-pointer" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700 px-2 py-1 h-auto text-sm">
          Leverage
        </Button>
        <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700 px-2 py-1 h-auto text-sm">
          TP/SL
        </Button>
        <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-900 hover:text-white px-2 py-1 h-auto text-sm">
          Close
        </Button>
      </div>
    </div>
  );
};
