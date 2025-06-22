import React, { useEffect, useState } from "react";

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`rounded-2xl ${className}`}>{children}</div>;

const CardHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`p-4 ${className}`}>{children}</div>;

const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>;

const CardContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`p-4 ${className}`}>{children}</div>;

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleRad = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.sin(angleRad),
    y: centerY - radius * Math.cos(angleRad),
  };
};

const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const adjustedStart = polarToCartesian(x, y, radius, startAngle);
  const adjustedEnd = polarToCartesian(x, y, radius, endAngle);
  const largeArcFlag = Math.abs(endAngle - startAngle) >= 180 ? 1 : 0;
  const sweepFlag = 1;

  return [
    "M",
    adjustedStart.x,
    adjustedStart.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    sweepFlag,
    adjustedEnd.x,
    adjustedEnd.y,
  ].join(" ");
};

interface SvgGaugeProps {
  value: number;
  valueMax: number;
  width: number;
  height: number;
  startAngle: number;
  endAngle: number;
  classification: string;
}

const SvgGauge: React.FC<SvgGaugeProps> = ({
  value,
  valueMax,
  width,
  height,
  startAngle,
  endAngle,
}) => {
  const centerX = width / 2;
  const centerY = height * 0.7;
  const radius = Math.min(width / 2, height * 0.5) - 20;
  const valueCurrentAngle =
    (value / valueMax) * (endAngle - startAngle) + startAngle;

  const referenceArcPath = describeArc(
    centerX,
    centerY,
    radius,
    startAngle,
    endAngle
  );
  const valueArcPath = describeArc(
    centerX,
    centerY,
    radius,
    startAngle,
    valueCurrentAngle
  );
  const pointerTarget = polarToCartesian(
    centerX,
    centerY,
    radius,
    valueCurrentAngle
  );

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="valueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="50%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#F44336" />
        </linearGradient>
      </defs>

      <path
        d={referenceArcPath}
        fill="none"
        stroke="rgba(50, 50, 50, 0.7)"
        strokeWidth={20}
        strokeLinecap="round"
      />

      <path
        d={valueArcPath}
        fill="none"
        stroke="url(#valueGradient)"
        strokeWidth={20}
        strokeLinecap="round"
      />

      <line
        x1={centerX}
        y1={centerY}
        x2={pointerTarget.x}
        y2={pointerTarget.y}
        stroke="red"
        strokeWidth={3}
        strokeLinecap="round"
      />

      <circle cx={centerX} cy={centerY} r={5} fill="red" />

      <text
        x={centerX}
        y={centerY - radius - 30}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#FFFFFF"
        fontSize="20"
        fontWeight="bold"
        className="font-inter"
      >
        {value}
      </text>
    </svg>
  );
};

export default function FearGreedIndex() {
  const [value, setValue] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://api.alternative.me/fng/?limit=1");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        const fg = json.data?.[0];

        if (fg) {
          setValue(parseInt(fg.value, 10));
        } else {
          console.warn(
            "No data found in FNG API response or unexpected format."
          );

          setValue(0);
        }
      } catch (error) {
        console.error("Error fetching FNG index:", error);
        setValue(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full max-w-full border border-white shadow-xl rounded-2xl bg-transparent p-4 flex flex-col overflow-hidden">
      <CardHeader className="pb-2 border-b border-gray-700 bg-transparent">
        <CardTitle className="text-lg font-semibold text-white text-center">
          Fear and Greed Index
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center min-h-[265px] bg-transparent">
        {loading ? (
          <div className="text-sm text-gray-400">Loading...</div>
        ) : (
          <SvgGauge
            width={450}
            height={200}
            startAngle={-110}
            endAngle={110}
            value={value}
            valueMax={100}
            classification="neutral"
          />
        )}
      </CardContent>
    </Card>
  );
}
