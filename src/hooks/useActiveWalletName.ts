import type { WalletData } from "@/wallets";

export function useActiveWalletName(
  selectedWallet: WalletData | null
): string | null {
  return selectedWallet?.name ?? null;
}
