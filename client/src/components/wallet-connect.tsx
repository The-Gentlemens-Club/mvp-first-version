import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, Check } from "lucide-react";
import { useWeb3 } from "@/hooks/use-web3";
import { useToast } from "@/hooks/use-toast";

export default function WalletConnect() {
  const { account, connectWallet, disconnectWallet, isConnecting } = useWeb3();
  const { toast } = useToast();
  const [isEligible, setIsEligible] = useState(false);

  const handleConnect = async () => {
    try {
      await connectWallet();
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to MetaMask",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const checkEligibility = () => {
    const eligible = confirm('Are you in a supported jurisdiction (e.g., not USA, UK, Australia)?');
    setIsEligible(eligible);
    if (eligible) {
      toast({
        title: "Eligibility Confirmed",
        description: "You are eligible for staking and governance participation",
      });
    } else {
      toast({
        title: "Not Eligible",
        description: "Unfortunately, your jurisdiction is not supported for staking",
        variant: "destructive",
      });
    }
  };

  if (account) {
    return (
      <div className="flex items-center space-x-4">
        <Button 
          onClick={disconnectWallet}
          className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 px-6 py-2 rounded-lg font-inter font-semibold transition-colors duration-200"
        >
          <Check className="w-4 h-4 mr-2" />
          {account.slice(0, 6)}...{account.slice(-4)}
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500 px-6 py-2 rounded-lg font-inter font-semibold transition-colors duration-200"
    >
      <Wallet className="w-4 h-4 mr-2" />
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}
