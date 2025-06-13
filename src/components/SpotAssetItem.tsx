import React from "react";

export const SpotAssetItem: React.FC<any> = ({
  name,
  amount,
  usdValue,
  iconUrl,
}) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
    <div className="flex items-center space-x-3">
      <img src={iconUrl} alt={name} className="w-6 h-6 rounded-full" />
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{name}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-medium text-gray-900 dark:text-white">
        {amount.toFixed(4)}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        ${usdValue.toFixed(2)}
      </p>
    </div>
  </div>
);
