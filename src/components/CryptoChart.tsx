import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store"; // Adjust if needed
import { fetchBybitWalletData } from "@/features/wallets/walletsSlice"; // Adjust if needed


export function CryptoChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  const [symbol, setSymbol] = useState("BINANCE:BTCUSDT");
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
    if (bybitWallet?.tradePairs && bybitWallet.tradePairs.length > 0) {
      const options = bybitWallet.tradePairs.map((pair) => ({
        label: pair.ticker,
        value: `BINANCE:${pair.ticker.replace("/", "")}`,
      }));
      setDynamicSymbolOptions(options);

      if (!options.some((opt) => opt.value === symbol)) {
        setSymbol(options[0].value);
      }
    }
  }, [bybitWallet?.tradePairs, symbol]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !symbol) return;

    if (scriptRef.current && container.contains(scriptRef.current)) {
      container.removeChild(scriptRef.current);
      scriptRef.current = null;
    }

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
      isTransparent: false, // Set to true to remove background & border
      autosize: true,
      chartOnly: false,
      borderVisible: false, // Make sure this is false to hide widget border
      showVolume: false,
      hideDateRanges: true,
      scalePosition: "none",
    };

    script.innerHTML = JSON.stringify(config);

    container.appendChild(script);
    scriptRef.current = script;

    return () => {
      if (scriptRef.current && container.contains(scriptRef.current)) {
        container.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, [symbol]);

  const currencyOptions = ["USD", "EUR", "GBP", "JPY"];

  const displayedBalance =
    bybitWallet?.balance?.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) || "0.00";

  const isTradePairsLoading =
    walletLoading && dynamicSymbolOptions.length === 0;

  return (
    <Card
      className="w-full h-full text-white rounded-2xl shadow-xl border border-white/10"
      style={{
        background:
          "linear-gradient(to bottom, #191919 0%, #191919 80%, #27274b 100%)",
      }}
    >
      <CardHeader className="px-4 pt-6 pb-0">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="text-lg font-semibold">Chart</CardTitle>

          {/* Currency Dropdown */}
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

      <hr
        className="my-2"
        style={{
          background:
            "linear-gradient(to right, transparent, #27274b, transparent)",
          height: "2px",
          border: "none",
        }}
      />

      <CardContent className="px-4 pt-2">
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
            {["1 hr", "3 hr", "1 d", "1 wk"].map((time) => (
              <button
                key={time}
                className="px-3 py-1 rounded-full text-xs border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </CardContent>

      {/* Chart area - no border */}
      <CardContent className="pt-4 px-4 pb-6 flex-1 overflow-hidden">
        <div
          ref={containerRef}
          className="w-full h-[250px] sm:h-[300px] lg:h-[100%]"
          style={{ border: "none" }}
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
          {/* TradingView widget is injected here */}
        </div>
      </CardContent>
    </Card>
  );
}
