import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { fetchBybitWalletData } from "@/features/wallets/walletsSlice";

const intervalMap: Record<string, string> = {
  "1 hr": "60",
  "3 hr": "180",
  "1 d": "D",
  "1 wk": "W",
};

export function CryptoChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [symbol, setSymbol] = useState("NASDAQ:AAPL");
  const [interval, setInterval] = useState("D");
  const [currency, setCurrency] = useState("USD");
  const [showSymbolDropdown, setShowSymbolDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [dynamicSymbolOptions, setDynamicSymbolOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const dispatch = useDispatch();

  const bybitWallet = useSelector((state: RootState) =>
    state.wallets.wallets.find((wallet) => wallet.id === "bybit")
  );
  const walletLoading = useSelector(
    (state: RootState) => state.wallets.status === "loading"
  );
  const walletError = useSelector((state: RootState) => state.wallets.error);

  useEffect(() => {
    dispatch(fetchBybitWalletData() as any);
  }, [dispatch]);

  useEffect(() => {
    if (bybitWallet?.tradePairs?.length) {
      const options = bybitWallet.tradePairs.map((pair) => ({
        label: pair.ticker,
        value: `BINANCE:${pair.ticker.replace("/", "")}`,
      }));
      setDynamicSymbolOptions(options);

      if (!options.some((opt) => opt.value === symbol)) {
        setSymbol(options[0].value);
      }
    }
  }, [bybitWallet?.tradePairs]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !symbol || !interval) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${symbol}",
        "interval": "${interval}",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": false,
        "support_host": "https://www.tradingview.com",
        "hide_legend": true,
        "hide_side_toolbar": true,
        "hide_top_toolbar": true,
        "hide_ideas": true,
        "isTransparent": true,
        "overrides": {
            "paneProperties.backgroundGradientStartColor": "#020024",
            "paneProperties.backgroundGradientEndColor": "#4f485e"
        }
      }
    `;

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [symbol, interval]);

  const currencyOptions = ["USD", "EUR", "GBP", "JPY"];
  const displayedBalance =
    bybitWallet?.balance?.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) || "0.00";

  const isTradePairsLoading =
    walletLoading && dynamicSymbolOptions.length === 0;

  return (
    <Card className="w-full h-full text-white rounded-2xl shadow-xl border border-white/10 bg-transparent">
      <CardHeader className="px-2 pt-0 pb-0">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="text-lg font-semibold">Chart</CardTitle>

          <div className="relative">
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center text-sm px-3 py-1 rounded-md border border-white/20 bg-transparent hover:bg-white/10 transition-colors"
            >
              {currency}
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>

            {showCurrencyDropdown && (
              <div className="absolute right-0 mt-2 bg-[#1c1e25] border border-white/10 rounded-md shadow-lg z-10">
                {currencyOptions.map((cur) => (
                  <button
                    key={cur}
                    onClick={() => {
                      setCurrency(cur);
                      setShowCurrencyDropdown(false);
                    }}
                    className="block px-4 py-2 text-sm hover:bg-white/10 w-full text-left transition-colors"
                  >
                    {cur}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-4 gap-x-8">
          <div>
            <div className="text-3xl font-bold text-yellow-400">
              {walletLoading && bybitWallet?.balance === undefined
                ? "Loading..."
                : `$${displayedBalance}`}
            </div>

            <div className="relative mt-1">
              <button
                onClick={() => setShowSymbolDropdown(!showSymbolDropdown)}
                className="flex items-center text-sm text-white hover:text-yellow-300 transition-colors"
              >
                {dynamicSymbolOptions.find((opt) => opt.value === symbol)
                  ?.label || "Select Symbol"}
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              {showSymbolDropdown && (
                <div className="absolute mt-2 bg-[#1c1e25] border border-white/10 rounded-md shadow-lg z-10 max-h-64 overflow-y-auto">
                  {isTradePairsLoading ? (
                    <div className="px-4 py-2 text-sm text-gray-400">
                      Loading symbols...
                    </div>
                  ) : walletError ? (
                    <div className="px-4 py-2 text-sm text-red-400">
                      Error: {walletError}
                    </div>
                  ) : dynamicSymbolOptions.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-gray-400">
                      No symbols found.
                    </div>
                  ) : (
                    dynamicSymbolOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSymbol(opt.value);
                          setShowSymbolDropdown(false);
                        }}
                        className="block px-4 py-2 text-sm hover:bg-white/10 w-full text-left transition-colors"
                      >
                        {opt.label}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.keys(intervalMap).map((label) => (
              <button
                key={label}
                onClick={() => setInterval(intervalMap[label])}
                className={`px-3 py-1 rounded-full text-xs border ${
                  intervalMap[label] === interval
                    ? "bg-white/10 border-white/30"
                    : "border-white/20"
                } text-white hover:bg-white/10 transition-colors`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </CardContent>

      <CardContent className="px-4 pb-6 flex-1 overflow-hidden">
        <div
          ref={containerRef}
          className="w-full h-[250px] sm:h-[300px] lg:h-[100%]"
          style={{ border: "none", background: "transparent" }}
        >
          {isTradePairsLoading && (
            <div className="flex items-center justify-center h-full text-gray-400">
              Loading chart...
            </div>
          )}
          {walletError && !isTradePairsLoading && (
            <div className="flex items-center justify-center h-full text-red-400">
              Error loading chart: {walletError}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
