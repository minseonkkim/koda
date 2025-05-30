import Card from "./Card";

export function BalanceCard({
  usdtEnabled,
  balance,
}: {
  usdtEnabled: boolean;
  balance: number | null;
}) {
  return (
    <Card>
      <div className="font-bold text-xl mb-2">잔고</div>
      {usdtEnabled ? (
        balance !== null ? (
          <div className="flex flex-row items-end">
            <div className="font-semibold text-lg">{balance.toFixed(2)}</div>
            &nbsp;<span>USDT</span>
          </div>
        ) : (
          <span className="text-gray-400">로딩 중...</span>
        )
      ) : (
        <div className="text-gray-700">잔액 숨김</div>
      )}
    </Card>
  );
}
