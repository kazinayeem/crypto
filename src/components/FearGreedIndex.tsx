import { useEffect, useState } from "react";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) return null;

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };

  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path d={`M ${cx} ${cy} L ${target.x} ${target.y}`} stroke="red" strokeWidth={3} />
    </g>
  );
}

export function FearGreedIndex() {
  const [value, setValue] = useState<number>(0);
  const [classification, setClassification] = useState<string>("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://api.alternative.me/fng/?limit=1");
        const json = await res.json();
        const fg = json.data?.[0];
        if (fg) {
          setValue(parseInt(fg.value, 10));
          setClassification(fg.value_classification);
        }
      } catch (error) {
        console.error("Error fetching FNG index:", error);
        setClassification("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3600000); // refresh hourly
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full border border-white/10 shadow-xl rounded-2xl bg-transparent p-4 flex flex-col overflow-hidden">
      <CardHeader className="pb-2 border-b border-white/10 bg-transparent">
        <CardTitle className="text-sm font-semibold text-white">Fear and Greed Index</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center h-[300px] bg-transparent">
        {loading ? (
          <div className="text-sm text-muted-foreground">Loading...</div>
        ) : (
          <>
            <GaugeContainer
              width={250}
              height={250}
              startAngle={-110}
              endAngle={110}
              value={value}
              valueMax={100}
              cornerRadius="50%"
              sx={{
                [`& .MuiGaugeArc-root`]: {
                  fill: "#393b78",
                },
              }}
            >
              <GaugeReferenceArc />
              <GaugeValueArc />
              <GaugePointer />
            </GaugeContainer>
            <div className="text-white mt-2 text-lg font-bold">{value} – {classification}</div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
