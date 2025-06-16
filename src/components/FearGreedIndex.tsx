import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import GaugeChart from "react-gauge-chart";

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
  const [fearGreedValue, setFearGreedValue] = useState<number | null>(null);
  const [valueClassification, setValueClassification] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFearGreedIndex = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://api.alternative.me/fng/?limit=1");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data: ApiData = await response.json();
        if (data.data?.length > 0) {
          setFearGreedValue(parseInt(data.data[0].value, 10));
          setValueClassification(data.data[0].value_classification);
        } else {
          setError("No data found in API response.");
        }
      } catch (e: any) {
        setError(`Failed to fetch Fear and Greed Index: ${e.message}`);
        console.error("Error fetching Fear and Greed Index:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchFearGreedIndex();
    const intervalId = setInterval(fetchFearGreedIndex, 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const getValueBubbleColor = (value: number | null) => {
    if (value === null) return "bg-gray-500";
    if (value >= 75) return "bg-green-500";
    if (value >= 50) return "bg-yellow-400";
    if (value >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  const gaugeValue = fearGreedValue !== null ? fearGreedValue / 100 : 0;

  return (
    <Card className="bg-transparent dark:bg-transparent text-gray-200 border border-border shadow-md w-full h-fit">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-md text-muted-foreground">
          Fear and Greed Index
        </CardTitle>
      </CardHeader>
      <CardContent className="relative p-0 min-h-[160px] flex items-center justify-center">
        {loading ? (
          <div className="h-[160px] flex items-center justify-center w-full">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        ) : error ? (
          <div className="h-[160px] flex items-center justify-center w-full">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        ) : (
          <>
            <div className="w-full px-4">
              <GaugeChart
                id="fear-greed-gauge"
                nrOfLevels={420}
                percent={gaugeValue}
                arcWidth={0.2}
                colors={["#ff0000", "#ffa500", "#ffff00", "#00ff00"]}
                arcPadding={0}
                needleColor="gray"
                needleBaseColor="gray"
                hideText
                cornerRadius={0}
                animate={false}
                style={{ background: "transparent" }}
              />
            </div>

            {fearGreedValue !== null && (
              <div
                className={`absolute left-1/2 top-[55px] -translate-x-1/2 rounded-full flex flex-col items-center justify-center text-white font-semibold p-2 z-30`}
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: getValueBubbleColor(fearGreedValue),
                }}
              >
                <span className="text-xl font-bold leading-none">
                  {fearGreedValue}
                </span>
                <span className="text-xs leading-none mt-1 capitalize">
                  {valueClassification}
                </span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
