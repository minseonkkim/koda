export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 border border-[#e9ecef] rounded-2xl bg-white shadow-xs">
      {children}
    </div>
  );
}
