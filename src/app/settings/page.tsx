"use client";

import { isValidEthereumAddress } from "@/lib/validate";
import {
  useEthStore,
  useUsdtStore,
  useWalletStore,
} from "@/store/useAssetStore";
import { useState } from "react";

export default function SettingsPage() {
  const { setWalletAddress } = useWalletStore();
  const [inputAddress, setInputAddress] = useState("");

  const { ethEnabled, setEthEnabled } = useEthStore();
  const { usdtEnabled, setUsdtEnabled } = useUsdtStore();

  const isValid = isValidEthereumAddress(inputAddress);

  const handleSave = () => {
    if (!isValid) return;
    setWalletAddress(inputAddress.trim());
    alert("지갑 주소가 저장되었습니다.");
  };

  return (
    <div className="w-full mx-auto px-6 py-8 bg-white border border-gray-200 rounded-2xl shadow-xs">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        설정
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
              onChange={(e) => setEthEnabled(e.target.checked)}
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
              onChange={(e) => setUsdtEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-300 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
          </label>
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-gray-700 mb-1">지갑 주소 변경</label>
        <div className="flex flex-row items-center gap-1">
          <input
            type="text"
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
            className="h-[45px] border border-gray-700 rounded px-3 py-2 w-full text-sm"
            placeholder="0x로 시작하는 42자리 주소"
          />
          <button
            onClick={handleSave}
            disabled={!isValid}
            className={`text-sm cursor-pointer w-[72px] h-[45px] px-4 py-2 text-white rounded transition ${
              isValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            저장
          </button>
        </div>
        {!isValid && inputAddress && (
          <p className="text-sm text-red-500 mt-1">
            유효한 지갑 주소가 아닙니다.
          </p>
        )}
      </div>
    </div>
  );
}
