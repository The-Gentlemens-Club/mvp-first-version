import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, Lock, Unlock, Loader2 } from "lucide-react";
import { useContract } from "@/hooks/use-contract";
import { useWeb3 } from "@/hooks/use-web3";
import { useToast } from "@/hooks/use-toast";

export default function StakingPanel() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const { contract } = useContract();
  const { account, gtlmBalance } = useWeb3();
  const { toast } = useToast();

  const stakeTokens = async () => {
    if (!contract || !account || !stakeAmount) {
      toast({
        title: "Invalid Stake",
        description: "Please connect wallet and enter stake amount",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsStaking(true);
      
      // Convert stake amount to Wei
      const stakeAmountWei = (parseFloat(stakeAmount) * 1e18).toString();
      
      const tx = await contract.stake(stakeAmountWei, {
        from: account,
      });

      toast({
        title: "Staking Transaction Submitted",
        description: "Waiting for confirmation...",
      });

      await tx.wait();
      
      toast({
        title: "Tokens Staked Successfully",
        description: `Successfully staked ${stakeAmount} GTLM tokens`,
      });

      setStakeAmount("");
    } catch (error: any) {
      console.error("Staking error:", error);
      toast({
        title: "Staking Failed",
        description: error.message || "Failed to stake tokens. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsStaking(false);
    }
  };

  const unstakeTokens = async () => {
    if (!contract || !account) {
      toast({
        title: "Cannot Unstake",
        description: "Please connect wallet",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUnstaking(true);
      
      // This would need to be implemented in the smart contract
      toast({
        title: "Unstaking Feature",
        description: "Unstaking functionality will be available after lock period",
      });
    } catch (error: any) {
      console.error("Unstaking error:", error);
      toast({
        title: "Unstaking Failed",
        description: error.message || "Failed to unstake tokens",
        variant: "destructive",
      });
    } finally {
      setIsUnstaking(false);
    }
  };

  const setMaxAmount = () => {
    setStakeAmount(gtlmBalance || "0");
  };

  return (
    <div className="gentlemen-primary rounded-xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gentlemen-bronze">
          <Coins className="inline-block mr-3" />
          Stake $GTLM
        </h2>
        <div className="text-right">
          <p className="text-sm text-gray-400">APY</p>
          <p className="text-lg font-bold text-green-400">24.5%</p>
        </div>
      </div>

      {/* Current Staking Stats */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-1">Total Staked</p>
            <p className="text-xl font-bold gentlemen-bronze">2,450,000 GTLM</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-1">Revenue Share Pool</p>
            <p className="text-xl font-bold text-green-400">15,250 GTLM</p>
          </div>
        </div>
      </div>

      {/* Staking Form */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="stakeAmount" className="text-gray-300">Stake Amount</Label>
          <div className="relative">
            <Input
              id="stakeAmount"
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="Enter amount to stake"
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[var(--gentlemen-bronze)] pr-16"
            />
            <Button
              type="button"
              onClick={setMaxAmount}
              className="absolute right-3 top-2 h-auto p-1 text-xs gentlemen-bronze hover:text-[var(--gentlemen-gold)] bg-transparent"
            >
              MAX
            </Button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Estimated Monthly Rewards</span>
            <span className="text-green-400 font-bold">
              ~{stakeAmount ? (parseFloat(stakeAmount) * 0.245 / 12).toFixed(2) : "0"} GTLM
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Lock Period</span>
            <span className="text-white font-medium">30 Days</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={stakeTokens}
            disabled={isStaking || !account || !stakeAmount}
            className="bg-[var(--gentlemen-bronze)] hover:bg-[var(--gentlemen-gold)] text-gray-900 py-3 rounded-lg font-bold transition-colors"
          >
            {isStaking ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Staking...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Stake
              </>
            )}
          </Button>
          <Button
            onClick={unstakeTokens}
            disabled={isUnstaking || !account}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white py-3 rounded-lg font-bold transition-colors"
          >
            {isUnstaking ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Unstaking...
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4 mr-2" />
                Unstake
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Active Stakes */}
      <div className="mt-6 pt-6 border-t border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-3">Your Stakes</h3>
        <div className="space-y-3">
          {[
            { amount: "1000", rewards: "24.5", lockEnds: "28 days", status: "active" },
            { amount: "500", rewards: "12.3", lockEnds: "15 days", status: "active" },
            { amount: "750", rewards: "67.8", lockEnds: "Unlocked", status: "unlockable" },
          ].map((stake, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${stake.status === 'active' ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                  <span className="text-white font-semibold">{stake.amount} GTLM</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stake.status === 'active' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-green-900/30 text-green-400'
                }`}>
                  {stake.status === 'active' ? 'Locked' : 'Ready'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Earned: <span className="text-green-400">+{stake.rewards} GTLM</span></span>
                <span className="text-gray-400">Lock ends: <span className="text-white">{stake.lockEnds}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
