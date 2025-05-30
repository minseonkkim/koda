"use client";

import { useEffect, useState } from "react";
import { useUsdtStore } from "@/store/useAssetStore";
import { fetchUSDTBalance, fetchUSDTTransactions } from "@/lib/api";
import { WALLET_ADDRESS, USDT_CONTRACT } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import { TbFaceIdError } from "react-icons/tb";

type Transaction = {
  from: string;
  to: string;
  value: string;
  timeStamp: string;
};

export default function Page() {
  const { usdtEnabled } = useUsdtStore();
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!usdtEnabled) return;

    async function loadData() {
      try {
        setLoading(true);
        const [bal, tx] = await Promise.all([
          fetchUSDTBalance(WALLET_ADDRESS, USDT_CONTRACT),
          fetchUSDTTransactions(WALLET_ADDRESS, USDT_CONTRACT),
        ]);
        setBalance(bal);
        setTransactions(tx);
        setError(false);
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [usdtEnabled]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="flex flex-row justify-between gap-4">
          <div className="p-4 border border-[#e9ecef] rounded-2xl bg-white shadow-xs w-[70%]">
            <div className="h-5 bg-gray-300 rounded w-24 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
          <div className="p-4 border border-[#e9ecef] rounded-2xl bg-white shadow-xs flex-grow">
            <div className="h-5 bg-gray-300 rounded w-20 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <div className="p-4 border border-[#e9ecef] rounded-2xl bg-white shadow-xs w-full">
          <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b border-gray-100 py-2"
              >
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[500px] flex flex-col items-center justify-center">
        <TbFaceIdError className="size-30 mb-2" />
        <div className="text-gray-900 font-semibold text-2xl mb-4">
          잠시 후 다시 시도해주세요.
        </div>
        <div className="text-gray-800 text-md mb-4 text-center">
          요청사항을 처리하는 데 실패했습니다. <br />
          네트워크 상태를 확인하거나, 다시 시도해 주세요.
        </div>
        <button
          onClick={() => location.reload()}
          className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900 transition"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between gap-4">
        <div className="p-4 border border-[#e9ecef] rounded-2xl bg-white shadow-xs w-[70%]">
          <div className="font-bold text-xl mb-3">지갑 주소</div>
          <div className="text-md text-gray-700 truncate">{WALLET_ADDRESS}</div>
        </div>
        <div className="p-4 border border-[#e9ecef] rounded-2xl bg-white shadow-xs flex-grow">
          <div className="font-bold text-xl mb-2">잔고</div>
          {usdtEnabled ? (
            <div className="text-gray-700 flex flex-row items-end">
              <div className="font-semibold text-lg">
                {balance!.toFixed(2)}&nbsp;
              </div>
              <div className="text-md">USDT</div>
            </div>
          ) : (
            <div>잔액 숨김</div>
          )}
        </div>
      </div>
      <div className="p-4 border border-[#e9ecef] rounded-2xl bg-white shadow-xs w-full">
        <div className="text-xl font-semibold text-gray-900 mb-4">
          최근 거래 내역
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-md table-auto">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase text-center">
                <th className="p-2">구분</th>
                <th className="p-2">시각</th>
                <th className="p-2">상대 주소</th>
                <th className="p-2">수량</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => {
                const isSend =
                  tx.from.toLowerCase() === WALLET_ADDRESS.toLowerCase();
                const amount = Number(tx.value) / 10 ** 6;
                const formatted = formatDate(tx.timeStamp);

                return (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 transition-colors text-center"
                  >
                    <td className="p-2 font-medium">
                      <span
                        className={`inline-flex items-center font-semibold gap-1 ${
                          isSend ? "text-red-500" : "text-green-600"
                        }`}
                      >
                        {isSend ? "📤 출금" : "📥 입금"}
                      </span>
                    </td>
                    <td className="p-2 text-gray-700">{formatted}</td>
                    <td className="p-2 max-w-[160px] truncate text-gray-600">
                      {isSend ? tx.to : tx.from}
                    </td>
                    <td
                      className={`p-2 font-semibold ${
                        isSend ? "text-red-500" : "text-green-600"
                      }`}
                    >
                      {isSend ? "-" : "+"}
                      {amount.toFixed(5)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
