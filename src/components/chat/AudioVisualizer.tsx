// components/chat/AudioVisualizer.tsx
import { useEffect, useRef } from "react";
// Use the built-in AnalyserNode type from the DOM
// import type { AnalyserNode } from "standardized-audio-context"; // Ensure correct import for types

interface AudioVisualizerProps {
  analyser: AnalyserNode;
  width?: number;
  height?: number;
}

export function AudioVisualizer({ analyser, width = 40, height = 40 }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use frequencyBinCount as it's typically half of fftSize
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray); // Get frequency data

      ctx.clearRect(0, 0, width, height); // Clear previous frame
      ctx.fillStyle = 'rgb(74, 222, 128)'; // Green color for visualization

      const barWidth = (width / bufferLength) * 2; // Adjusted bar width for better visuals
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        // Scale bar height based on max height and data value
        const barHeight = (dataArray[i] / 255) * height;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight); // Draw from bottom up
        x += barWidth + 1; // Add padding between bars
      }
    };

    draw(); // Start the drawing loop

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current); // Stop animation on unmount
      }
    };
  }, [analyser, width, height]);

  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height}
      className="absolute inset-0 opacity-70"
    />
  );
}