import process from 'node:process';

export function getRpcUrl(chainId: number | undefined) {
  if (chainId === 1) {
    return process.env.MAINNET_RPC_URL;
  } else if (chainId === 11155111) {
    return process.env.SEPOLIA_RPC_URL;
  } else {
    return null;
  }
}

export function getPrivateKey(addr: string | undefined) {
  if (!addr) return null;
  const address = addr.toLowerCase();
  if (
    address && process.env.WALLET_ADDRESS &&
    address.toLowerCase() === `${process.env.WALLET_ADDRESS}`.toLowerCase()
  ) {
    return process.env.WALLET_PRIVATE_KEY;
  } else {
    return null;
  }
}
