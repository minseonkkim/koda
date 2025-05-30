import Card from "./Card";

export function WalletInfoCard({ walletAddress }: { walletAddress: string }) {
  return (
    <Card>
      <div className="font-bold text-xl mb-3">지갑 주소</div>
      <div className="text-md text-gray-700 truncate">{walletAddress}</div>
    </Card>
  );
}
