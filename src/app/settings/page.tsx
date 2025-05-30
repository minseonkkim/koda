"use client";

import { useEthStore, useUsdtStore } from "@/store/useAssetStore";

export default function SettingsPage() {
  const { ethEnabled, setEthEnabled } = useEthStore();
  const { usdtEnabled, setUsdtEnabled } = useUsdtStore();

  const handleToggle1 = (checked: boolean) => {
    setEthEnabled(checked);
  };

  const handleToggle2 = (checked: boolean) => {
    setUsdtEnabled(checked);
  };

  return (
    <div className="w-full mx-auto px-6 py-8 bg-white border border-gray-200 rounded-2xl shadow-xs">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        자산 설정
      </h1>

      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-700">ETH 사용 설정</span>
        <div className="flex flex-row items-center gap-2">
          <span
            className={`font-semibold text-sm ${
              ethEnabled ? "text-blue-600" : "text-gray-600"
            }`}
          >
            {ethEnabled ? "켜짐" : "꺼짐"}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={ethEnabled}
              onChange={(e) => handleToggle1(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-300 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-700">USDT 사용 설정</span>
        <div className="flex flex-row items-center gap-2">
          <span
            className={`font-semibold text-sm ${
              usdtEnabled ? "text-blue-600" : "text-gray-600"
            }`}
          >
            {usdtEnabled ? "켜짐" : "꺼짐"}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={usdtEnabled}
              onChange={(e) => handleToggle2(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-300 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
