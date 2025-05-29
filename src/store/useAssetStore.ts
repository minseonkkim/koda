import { create } from "zustand";
import { persist } from "zustand/middleware";

type AssetState = {
  usdtEnabled: boolean;
  setUsdtEnabled: (enabled: boolean) => void;
};

export const useAssetStore = create<AssetState>()(
  persist(
    (set) => ({
      usdtEnabled: true,
      setUsdtEnabled: (enabled) => set({ usdtEnabled: enabled }),
    }),
    {
      name: "usdt_enabled",
    }
  )
);
