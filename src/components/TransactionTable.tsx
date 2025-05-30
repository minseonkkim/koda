import { formatDate } from "@/lib/format";

type Transaction = {
  from: string;
  to: string;
  value: string;
  timeStamp: string;
};

export function TransactionTable({
  transactions,
  walletAddress,
}: {
  transactions: Transaction[];
  walletAddress: string;
}) {
  return (
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
              tx.from.toLowerCase() === walletAddress.toLowerCase();
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
  );
}
