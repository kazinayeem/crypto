import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface Order {
  pr: number;
  vol: number;
}

interface SimulatedData {
  bids: Order[];
  asks: Order[];
  imbalance: number;
  spoof_score: number;
  manipulation: number;
  priceLast: number;
}

const generateSimulatedData = (): SimulatedData => {
  const centerPrice = 50000 + (Math.random() - 0.5) * 1000;
  const bids: Order[] = [];
  const asks: Order[] = [];
  const levels = 50;
  const step = 10;

  for (let i = 0; i < levels; i++) {
    bids.push({ pr: centerPrice - i * step, vol: Math.random() * 5 + 1 });
    asks.push({ pr: centerPrice + i * step, vol: Math.random() * 5 + 1 });
  }

  const vb = bids.reduce((sum, d) => sum + d.vol, 0);
  const va = asks.reduce((sum, d) => sum + d.vol, 0);
  const imbalance = (vb - va) / (vb + va);
  const spoof_score = Math.random() * 0.1;
  const manipulation = Math.abs(imbalance) * spoof_score;

  return {
    bids,
    asks,
    imbalance,
    spoof_score,
    manipulation,
    priceLast: centerPrice,
  };
};

const PriceOverviewChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<SimulatedData>(generateSimulatedData);

  const drawChart = (
    bids: Order[],
    asks: Order[],
    price: number,
    statusColor: string
  ) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svgRef.current?.clientWidth || 400;
    const height = svgRef.current?.clientHeight || 250;
    const margin = { top: 10, right: 30, bottom: 30, left: 40 };

    let cumB: any[] = [],
      cumA: any[] = [],
      sumB = 0,
      sumA = 0;
    bids.forEach((d) => {
      sumB += d.vol;
      cumB.push({ p: d.pr, v: sumB });
    });
    asks.forEach((d) => {
      sumA += d.vol;
      cumA.push({ p: d.pr, v: sumA });
    });

    const x = d3
      .scaleLinear()
      .domain(d3.extent([...cumB, ...cumA], (d) => d.p) as [number, number])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max([...cumB, ...cumA], (d) => d.v) || 1])
      .range([height - margin.bottom, margin.top]);

    const barWidth = 2;
    const volScale = d3
      .scaleLinear()
      .domain([0, d3.max([...bids, ...asks], (d) => d.vol) || 1])
      .range([0, 40]);

    const baseline = y(0);

    svg
      .selectAll(".barB")
      .data(bids)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.pr) - barWidth / 2)
      .attr("y", (d) => baseline - volScale(d.vol))
      .attr("width", barWidth)
      .attr("height", (d) => volScale(d.vol))
      .attr("fill", "#22c55e");

    svg
      .selectAll(".barA")
      .data(asks)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.pr) - barWidth / 2)
      .attr("y", (d) => baseline - volScale(d.vol))
      .attr("width", barWidth)
      .attr("height", (d) => volScale(d.vol))
      .attr("fill", "#ef4444");

    const line = d3
      .line<any>()
      .x((d) => x(d.p))
      .y((d) => y(d.v));

    svg
      .append("path")
      .datum(cumB)
      .attr("d", line)
      .attr("stroke", "#22c55e")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    svg
      .append("path")
      .datum(cumA)
      .attr("d", line)
      .attr("stroke", "#ef4444")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    const xAxis = d3.axisBottom(x).ticks(4).tickSizeOuter(0);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .attr("fill", "#e0e6f0")
      .attr("font-size", "8px");

    const yAxis = d3.axisLeft(y).ticks(4).tickSizeOuter(0);
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis)
      .selectAll("text")
      .attr("fill", "#e0e6f0")
      .attr("font-size", "8px");

    svg
      .append("line")
      .attr("x1", x(price))
      .attr("x2", x(price))
      .attr("y1", margin.top)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "#facc15")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "4,4");

    svg
      .append("text")
      .attr("x", x(price))
      .attr("y", margin.top)
      .attr("text-anchor", "middle")
      .attr("fill", "#facc15")
      .attr("font-size", "10px")
      .text(`Price ${price.toFixed(2)}`);

    svg
      .append("circle")
      .attr("cx", x(price))
      .attr("cy", baseline)
      .attr("r", 4)
      .attr("fill", statusColor);
  };

  useEffect(() => {
    const color =
      data.manipulation > 0.2
        ? "#ef4444"
        : data.manipulation > 0.05
        ? "#facc15"
        : "#22c55e";
    drawChart(data.bids, data.asks, data.priceLast, color);
  }, [data]);

  return (
    <div className="space-y-2 text-xs bg-transparent  border border-[#f1f1f1] shadow-lg rounded-lg p-4 flex flex-col relative overflow-hidden custom-scrollbar ">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm">Bid/Ask Depth</span>
        <button
          onClick={() => setData(generateSimulatedData())}
          className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-500"
        >
          Refresh
        </button>
      </div>

      <svg
        ref={svgRef}
        className="w-full h-[250px]  rounded shadow"
      />

      <div className="grid grid-cols-2 gap-2  p-2 rounded shadow">
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>Imbalance:</span>
            <span>{data.imbalance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Spoof Score:</span>
            <span>{data.spoof_score.toFixed(2)}</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>Manipulation:</span>
            <span>{data.manipulation.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Price:</span>
            <span>{data.priceLast.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceOverviewChart;
