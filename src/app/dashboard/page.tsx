"use client";

import { useEffect, useState } from "react";
import { useUsdtStore, useWalletStore } from "@/store/useAssetStore";
import { fetchUSDTBalance, fetchUSDTTransactions } from "@/lib/api";
import { USDT_CONTRACT } from "@/lib/constants";
import { TbFaceIdError } from "react-icons/tb";
import { WalletInfoCard } from "@/components/WalletInfoCard";
import { BalanceCard } from "@/components/BalanceCard";
import { TransactionTable } from "@/components/TransactionTable";

export type Transaction = {
  from: string;
  to: string;
  value: string;
  timeStamp: string;
};

export default function Page() {
  const { usdtEnabled } = useUsdtStore();
  const { walletAddress, hasHydrated } = useWalletStore();
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!walletAddress || !hasHydrated) {
      setLoading(false);
      return;
    }

    async function loadData() {
      try {
        setLoading(true);
        const [bal, tx] = await Promise.all([
          fetchUSDTBalance(walletAddress, USDT_CONTRACT),
          fetchUSDTTransactions(walletAddress, USDT_CONTRACT),
        ]);
        setBalance(bal);
        setTransactions(tx);
        setError(false);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [walletAddress, hasHydrated]);

  if (!walletAddress) {
    return (
      <div className="text-center mt-20 text-gray-700">
        먼저 <b>설정 페이지</b>에서 지갑 주소를 입력해주세요.
      </div>
    );
  }

  if (loading || !hasHydrated) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border border-[#e9ecef] rounded-2xl bg-white shadow-xs">
            <div className="h-6 bg-gray-300 rounded w-24 mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-64"></div>
          </div>
          <div className="p-4 border border-[#e9ecef] rounded-2xl bg-white shadow-xs">
            <div className="h-6 bg-gray-300 rounded w-20 mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-32"></div>
          </div>
        </div>

        <div className="p-4 border border-[#e9ecef] rounded-2xl bg-white shadow-xs w-full">
          <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
          <div className="h-7 grid grid-cols-4 bg-gray-100 text-gray-500 text-sm font-semibold text-center py-2 border-b border-gray-200"></div>

          <div className="space-y-2 mt-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-4 items-center border-b border-gray-100 py-2"
              >
                <div className="h-5 bg-gray-200 rounded w-16 mx-auto"></div>
                <div className="h-5 bg-gray-200 rounded w-24 mx-auto"></div>
                <div className="h-5 bg-gray-200 rounded w-32 mx-auto"></div>
                <div className="h-5 bg-gray-200 rounded w-20 mx-auto"></div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <WalletInfoCard walletAddress={walletAddress} />
        <BalanceCard usdtEnabled={usdtEnabled} balance={balance} />
      </div>
      <div className="p-4 border border-[#e9ecef] rounded-2xl bg-white shadow-xs w-full">
        <div className="text-xl font-semibold text-gray-900 mb-4">
          최근 거래 내역
        </div>
        {usdtEnabled ? (
          <TransactionTable
            transactions={transactions}
            walletAddress={walletAddress}
          />
        ) : (
          <div className="text-gray-700">거래 내역 숨김</div>
        )}
      </div>
    </div>
  );
}
