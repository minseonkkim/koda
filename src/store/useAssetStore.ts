import { create } from "zustand";
import { persist } from "zustand/middleware";

type UsdtState = {
  usdtEnabled: boolean;
  setUsdtEnabled: (enabled: boolean) => void;
};

export const useUsdtStore = create<UsdtState>()(
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

type EthState = {
  ethEnabled: boolean;
  setEthEnabled: (enabled: boolean) => void;
};

export const useEthStore = create<EthState>()(
  persist(
    (set) => ({
      ethEnabled: true,
      setEthEnabled: (enabled) => set({ ethEnabled: enabled }),
    }),
    {
      name: "eth_enabled",
    }
  )
);
