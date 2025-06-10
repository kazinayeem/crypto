import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import  { useEffect, useRef } from "react";

interface CryptoChartProps {
  currentPrice?: number;
}

export function CryptoChart({  }: CryptoChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const widgetContainerId = "tradingview_mini_chart_container";

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
      symbol: "BINANCE:BTCUSDT",
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
      largeChartUrl: "",
      chartOnly: false,
    };
    script.textContent = JSON.stringify(widgetConfig);

    if (chartContainerRef.current) {
      chartContainerRef.current.innerHTML = "";
      chartContainerRef.current.appendChild(script);
    }

    return () => {
      if (chartContainerRef.current) {
        chartContainerRef.current.innerHTML = "";
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <Card className="bg-gray-900 text-gray-200 border-none shadow-lg rounded-lg">
      <CardHeader className="flex flex-col space-y-0 pt-4 px-4 pb-0">
        <div className="flex items-center justify-between w-full mb-4">
          <CardTitle className="text-xl font-semibold text-gray-200">
            Chart
          </CardTitle>
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
