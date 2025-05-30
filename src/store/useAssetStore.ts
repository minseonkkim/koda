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

type WalletState = {
  walletAddress: string;
  setWalletAddress: (addr: string) => void;
};

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      walletAddress: "0x128692A587c09DCc1F9306530E64E1302b5E83FF",
      setWalletAddress: (addr) => set({ walletAddress: addr }),
    }),
    {
      name: "wallet_address",
    }
  )
);
