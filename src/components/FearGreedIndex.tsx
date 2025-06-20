import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ApiData {
  name: string;
  data: {
    value: string;
    value_classification: string;
    timestamp: string;
    time_until_update: string;
  }[];
  metadata: {
    error: string | null;
  };
}

export function FearGreedIndex() {
  const [value, setValue] = useState<number | null>(null);
  const [classification, setClassification] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://api.alternative.me/fng/?limit=1");
        const json: ApiData = await res.json();
        const fg = json.data?.[0];
        if (!fg) throw new Error("No data returned.");
        setValue(parseInt(fg.value, 10));
        setClassification(fg.value_classification);
      } catch (e: any) {
        setError(e.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const id = setInterval(fetchData, 1000 * 60 * 60); // hourly
    return () => clearInterval(id);
  }, []);

  const angle = value !== null ? (value / 100) * 180 : 0;
  const getColor = (v: number) => {
    if (v >= 75) return "#00cc00";
    if (v >= 50) return "#ffff55";
    if (v >= 25) return "#ffa500";
    return "#ff4d00";
  };

  return (
    <Card className="bg-[#13131a] text-white border border-border w-full h-full">
      <CardHeader className="pb-1 px-4">
        <CardTitle className="text-sm text-muted-foreground">
          Fear and Greed Index
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex items-center justify-center h-full">
        {loading || error ? (
          <p className="text-sm text-muted-foreground py-8">
            {error || "Loading..."}
          </p>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Gauge SVG */}
            <svg viewBox="0 0 200 100" className="w-full h-full max-h-[150px]">
              <defs>
                <linearGradient
                  id="gauge-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#ff4d00" />
                  <stop offset="50%" stopColor="#ffff55" />
                  <stop offset="100%" stopColor="#00cc00" />
                </linearGradient>
              </defs>
              <path
                d="M 10 100 A 90 90 0 0 1 190 100"
                stroke="url(#gauge-gradient)"
                strokeWidth="14"
                fill="none"
              />
            </svg>

            {/* Needle */}
            <motion.div
              className="absolute w-[3px] h-[60px] bg-white rounded origin-bottom"
              initial={{ rotate: 0 }}
              animate={{ rotate: angle - 90 }}
              transition={{ duration: 0.8 }}
              style={{
                left: "50%",
                bottom: "20px",
                transform: "translateX(-50%)",
                transformOrigin: "bottom center",
              }}
            />

            {/* Needle Center */}
            <div className="absolute left-1/2 bottom-[20px] w-4 h-4 bg-white rounded-full transform -translate-x-1/2 translate-y-1/2 z-10" />

            {/* Value Bubble */}
            <motion.div
              className="absolute px-3 py-1 text-xs font-bold rounded-full text-black text-center"
              style={{
                backgroundColor: getColor(value!),
                left: `${50 + 40 * Math.cos((angle - 90) * (Math.PI / 180))}%`,
                bottom: `${
                  40 + 40 * Math.sin((angle - 90) * (Math.PI / 180))
                }%`,
                transform: "translate(-50%, 50%)",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-base">{value}</div>
              <div className="text-[10px] capitalize">{classification}</div>
            </motion.div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
