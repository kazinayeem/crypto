import React from "react";

interface WaveProps {
  color: string;
}

export const Wave: React.FC<WaveProps> = ({ color }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-10 h-10">
        <div
          className={`absolute inset-0 rounded-full border-2 border-${color}-500 animate-ping`}
          style={{ animationDelay: "0ms" }}
        />
        <div
          className={`absolute inset-0 rounded-full border-2 border-${color}-500 animate-ping`}
          style={{ animationDelay: "150ms" }}
        />
        <div
          className={`absolute inset-0 rounded-full border-2 border-${color}-500 animate-ping`}
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
};
