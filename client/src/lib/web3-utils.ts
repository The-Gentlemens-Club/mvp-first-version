export const formatAddress = (address: string, chars = 4): string => {
  if (!address) return "";
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
};

export const formatEther = (wei: string, decimals = 4): string => {
  const ether = parseFloat(wei) / 1e18;
  return ether.toFixed(decimals);
};

export const parseEther = (ether: string): string => {
  return (parseFloat(ether) * 1e18).toString();
};

export const formatTokenAmount = (amount: string, decimals = 18, displayDecimals = 2): string => {
  const value = parseFloat(amount) / Math.pow(10, decimals);
  return value.toLocaleString(undefined, {
    minimumFractionDigits: displayDecimals,
    maximumFractionDigits: displayDecimals,
  });
};

export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const getSepoliaConfig = () => ({
  chainId: '0xaa36a7',
  chainName: 'Sepolia Test Network',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://sepolia.infura.io/v3/'],
  blockExplorerUrls: ['https://sepolia.etherscan.io/'],
});
