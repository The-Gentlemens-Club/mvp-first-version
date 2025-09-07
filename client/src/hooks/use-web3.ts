import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useWeb3() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [gtlmBalance, setGtlmBalance] = useState<string>("0");
  const [stakedBalance, setStakedBalance] = useState<string>("0");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const { toast } = useToast();

  const checkConnection = useCallback(async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await updateBalances(accounts[0]);
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    }
  }, []);

  const updateBalances = async (userAccount: string) => {
    if (!window.ethereum) return;

    try {
      // Get ETH balance
      const ethBalance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [userAccount, 'latest'],
      });
      const ethBalanceFormatted = (parseInt(ethBalance, 16) / 1e18).toFixed(4);
      setBalance(ethBalanceFormatted);

      // For demo purposes, set mock GTLM balances
      // In production, you would query the actual token contract
      setGtlmBalance("1250");
      setStakedBalance("500");
    } catch (error) {
      console.error("Error updating balances:", error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to connect your wallet",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsConnecting(true);
      
      // Switch to Sepolia testnet
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID
        });
      } catch (switchError: any) {
        // If the chain doesn't exist, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xaa36a7',
              chainName: 'Sepolia Test Network',
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: ['https://sepolia.infura.io/v3/'],
              blockExplorerUrls: ['https://sepolia.etherscan.io/'],
            }],
          });
        }
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        await updateBalances(accounts[0]);
      }
    } catch (error: any) {
      console.error("Connection error:", error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance("0");
    setGtlmBalance("0");
    setStakedBalance("0");
    setIsEligible(false);
  };

  useEffect(() => {
    checkConnection();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          updateBalances(accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, [checkConnection]);

  return {
    account,
    balance,
    gtlmBalance,
    stakedBalance,
    isConnecting,
    isEligible,
    connectWallet,
    disconnectWallet,
    setIsEligible,
  };
}
