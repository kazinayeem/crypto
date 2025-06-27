import React, { useEffect, useRef } from "react";

const CryptoChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    containerRef.current?.replaceChildren();
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "NASDAQ:AAPL",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      withdateranges: true,
      range: "YTD",
      hide_side_toolbar: false,
      allow_symbol_change: true,
      details: false,
      hotlist: false,
      show_popup_button: false,
      popup_width: "1000",
      popup_height: "650",
      support_host: "https://www.tradingview.com",
    });

    containerRef.current?.appendChild(script);
  }, []);

  return (
    <div
      className="tradingview-widget-container min-h-[300px] md:min-h-[500px]"
      ref={containerRef}
      style={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
    >
      <div
        className="tradingview-widget-container__widget min-h-[300px] md:min-h-[500px]"
        style={{ width: "100%", backgroundColor: "transparent" }}
      />
      <div
        className="tradingview-widget-copyright"
        style={{ backgroundColor: "transparent" }}
      >
        <a
          href="https://www.tradingview.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#6ab3ff" }}
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default CryptoChart;
