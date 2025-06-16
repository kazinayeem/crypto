import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

export function CryptoChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [symbol, setSymbol] = useState("BINANCE:BTCUSDT");

  const options = [
    { label: "Bitcoin (BTC)", value: "BINANCE:BTCUSDT" },
    { label: "Ethereum (ETH)", value: "BINANCE:ETHUSDT" },
    { label: "Solana (SOL)", value: "BINANCE:SOLUSDT" },
    { label: "Cardano (ADA)", value: "BINANCE:ADAUSDT" },
  ];

  useEffect(() => {
    const container = containerRef.current;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;

    const config = {
      symbol,
      width: "100%",
      height: "100%",
      locale: "en",
      dateRange: "12M",
      colorTheme: "dark",
      trendLineColor: "#f6e05e",
      underLineColor: "rgba(246, 224, 94, 0.2)",
      underLineBottomColor: "rgba(246, 224, 94, 0)",
      isTransparent: true,
      autosize: true,
      chartOnly: false,
    };

    script.innerHTML = JSON.stringify(config);

    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [symbol]);

  return (
    <div className="container mx-auto px-4">
      <Card className="bg-gray-900 text-gray-200 border-none shadow-lg rounded-2xl w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-col space-y-2 pt-4 px-4 pb-0">
          <div className="flex items-center justify-between w-full">
            <CardTitle className="text-xl font-semibold text-gray-200">
              Chart Overview
            </CardTitle>

            <select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="bg-gray-800 text-gray-200 rounded px-2 py-1 border border-gray-600"
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>

        <CardContent className="pt-0 px-0 pb-4">
          <div
            ref={containerRef}
            className="w-full aspect-[4/3] sm:aspect-[5/3] lg:aspect-[16/7]"
          />
        </CardContent>
      </Card>
    </div>
  );
}
