import React from "react";

export const SpotOpenOrderItem: React.FC<any> = ({
  pair,
  type,
  amount,
  price,
  tp_sl,
  date,
}) => (
  <div className="bg-[#2a2a2a] p-3 rounded-md text-sm">
    <p>
      <strong>Pair:</strong> {pair}
    </p>
    <p>
      <strong>Type:</strong> {type}
    </p>
    <p>
      <strong>Amount:</strong> {amount}
    </p>
    <p>
      <strong>Price:</strong> {price}
    </p>
    <p>
      <strong>TP/SL:</strong> {tp_sl}
    </p>
    <p>
      <strong>Date:</strong> {date}
    </p>
  </div>
);
