import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

interface CryptoChartProps {
  currentPrice?: number;
  theme?: "dark" | "light";
}

export function CryptoChart({ theme = "dark" }: CryptoChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const widgetContainerId = "tradingview_mini_chart_container";

  // State for selected symbol
  const [symbol, setSymbol] = useState("BINANCE:BTCUSDT");

  // Options for selection
  const options = [
    { label: "Bitcoin (BTC)", value: "BINANCE:BTCUSDT" },
    { label: "Ethereum (ETH)", value: "BINANCE:ETHUSDT" },
    { label: "Solana (SOL)", value: "BINANCE:SOLUSDT" },
    { label: "Cardano (ADA)", value: "BINANCE:ADAUSDT" },
  ];

  useEffect(() => {
    if (
      document.getElementById(widgetContainerId) &&
      chartContainerRef.current &&
      chartContainerRef.current.children.length > 0
    ) {
      return;
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;

    const widgetConfig = {
      symbol: symbol,
      width: "100%",
      height: "100%",
      locale: "en",
      dateRange: "12M",
      colorTheme: theme,
      trendLineColor: "#f6e05e",
      underLineColor: "rgba(246, 224, 94, 0.2)",
      underLineBottomColor: "rgba(246, 224, 94, 0)",
      isTransparent: true,
      autosize: true,
      largeChartUrl: "",
      chartOnly: false,
    };

    script.textContent = JSON.stringify(widgetConfig);

    if (chartContainerRef.current) {
      chartContainerRef.current.innerHTML = "";
      chartContainerRef.current.appendChild(script);
    }

    // Cleanup on unmount or symbol/theme change
    return () => {
      if (chartContainerRef.current) {
        chartContainerRef.current.innerHTML = "";
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [symbol, theme]); // re-run when symbol or theme changes

  return (
    <Card className="bg-gray-900 text-gray-200 border-none shadow-lg rounded-lg">
      <CardHeader className="flex flex-col space-y-2 pt-4 px-4 pb-0">
        <div className="flex items-center justify-between w-full">
          <CardTitle className="text-xl font-semibold text-gray-200">
            Chart Overview
          </CardTitle>

          {/* Symbol selector */}
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

      <CardContent className="pt-0 px-0 pb-0 h-[400px]">
        <div
          ref={chartContainerRef}
          id={widgetContainerId}
          className="w-full h-full"
        />
      </CardContent>
    </Card>
  );
}
