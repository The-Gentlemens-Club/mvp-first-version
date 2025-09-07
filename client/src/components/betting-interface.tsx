import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dice1, TrendingUp, Shield, CheckCircle, AlertTriangle, DollarSign, Zap, Coins } from "lucide-react";
import { useWeb3 } from "@/hooks/use-web3";

export default function BettingInterface() {
  const { account, gtlmBalance, stakedBalance } = useWeb3();
  const [betAmount, setBetAmount] = useState("");
  const [isKYCVerified, setIsKYCVerified] = useState(true); // Mock KYC status
  const [newBetAlert, setNewBetAlert] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentBets, setRecentBets] = useState([
    { id: 1, amount: "100", status: "Won", payout: "195", time: "2 min ago" },
    { id: 2, amount: "50", status: "Lost", payout: "0", time: "5 min ago" },
    { id: 3, amount: "200", status: "Won", payout: "390", time: "8 min ago" },
  ]);

  // Competition-ready real-time bet updates with fade-in animation
  const placeBet = () => {
    if (!betAmount || !account || isProcessing) return;
    
    setIsProcessing(true);
    setNewBetAlert(`Bet Placed: ${betAmount} $GTLM`);
    
    // Mock bet placement - Slide 5: $GTLM bets
    const newBet = {
      id: Date.now(),
      amount: betAmount,
      status: "Processing",
      payout: "...",
      time: "Just now"
    };
    
    setRecentBets([newBet, ...recentBets.slice(0, 4)]);
    
    // Simulate processing with real-time updates
    setTimeout(() => {
      const outcome = Math.random() > 0.5 ? "Won" : "Lost";
      const payout = outcome === "Won" ? (parseFloat(betAmount) * 1.95).toString() : "0";
      
      setRecentBets(prev => prev.map(bet => 
        bet.id === newBet.id 
          ? { ...bet, status: outcome, payout }
          : bet
      ));
      
      setNewBetAlert(`Bet ${outcome}: ${payout} $GTLM payout!`);
      setIsProcessing(false);
      setBetAmount("");
      
      // Clear alert after animation
      setTimeout(() => setNewBetAlert(""), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-8" id="betting">
      {/* Real-time Bet Alert - Competition Ready Feature */}
      {newBetAlert && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-right duration-500">
          <div className="luxury-card-elevated px-6 py-3 rounded-lg shadow-2xl border border-yellow-600/40">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold font-inter text-yellow-100">{newBetAlert}</span>
            </div>
          </div>
        </div>
      )}



      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Staking Interface */}
        <div className="lg:col-span-2">
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 font-playfair text-white">
                <Dice1 className="text-yellow-400 text-2xl" />
                <span>Stake Your Tokens</span>
                {/* Compliance indicator */}
                {isKYCVerified && (
                  <Badge className="bg-emerald-600 text-white">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Account Balance Display */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="luxury-card-subtle rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1 font-inter">Available Balance</p>
                  <p className="text-2xl font-bold metal-gold font-playfair">
                    {gtlmBalance} $GTLM
                  </p>
                </div>
                <div className="luxury-card-subtle rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1 font-inter">Current Staked</p>
                  <p className="text-2xl font-bold jewel-emerald font-playfair">{stakedBalance} $GTLM</p>
                </div>
              </div>

              {/* Stake Amount Input */}
              <div className="space-y-4">
                <label className="block font-semibold font-inter text-white">
                  Stake Amount ($GTLM)
                </label>
                <div className="flex space-x-4">
                  <Input
                    type="number"
                    placeholder="Enter stake amount"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    className="flex-1 luxury-input font-inter"
                  />
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBetAmount("10")}
                      className="btn-luxury-outline"
                    >
                      10
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBetAmount("50")}
                      className="btn-luxury-outline"
                    >
                      50
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBetAmount("100")}
                      className="btn-luxury-outline"
                    >
                      100
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBetAmount("500")}
                      className="btn-luxury-outline"
                    >
                      MAX
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stake Placement - Competition Ready with animations */}
              <div className="flex space-x-4">
                <Button 
                  onClick={placeBet}
                  disabled={!account || !betAmount || isProcessing}
                  className="btn-luxury-primary flex-1"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Dice1 className="w-5 h-5 mr-2" />
                      Stake: {betAmount || "0"} $GTLM
                    </>
                  )}
                </Button>
              </div>

              {/* Real-time Status - Mock implementation */}
              {betAmount && (
                <div className="bg-sapphire-900/20 border border-sapphire-500/30 rounded-lg p-4">
                  <p className="text-white font-inter">
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                    Stake Ready: {betAmount} $GTLM • Est. Annual Yield: {(parseFloat(betAmount) * 0.15).toFixed(1)} $GTLM
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Staking Rewards */}
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className="flex items-center font-playfair text-white">
                <Coins className="text-yellow-400 mr-2" />
                Staking Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold metal-gold font-playfair mb-2">
                  735,000 $GTLM
                </p>
                <p className="text-sm text-gray-400 font-inter">30% of Treasury</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-300 font-inter">Your Staked: {stakedBalance} $GTLM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staking Benefits */}
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className="font-playfair flex items-center text-white">
                <Shield className="text-yellow-400 mr-2" />
                Staking Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-inter">Profit Sharing</span>
                  <Badge className="bg-emerald-600 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-inter">Governance Rights</span>
                  <Badge className="bg-emerald-600 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-inter">Early Access</span>
                  <Badge className="bg-emerald-600 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Available
                  </Badge>
                </div>
                <div className="text-xs text-gray-400 mt-4 font-inter">
                  Staking rewards are platform profit sharing, not gambling returns
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Stakes */}
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className="font-playfair text-white">Recent Stakes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentBets.map((bet) => (
                  <div key={bet.id} className="flex items-center justify-between py-2 border-b border-yellow-700/20 last:border-b-0">
                    <div>
                      <p className="font-semibold font-inter text-white">{bet.amount} $GTLM</p>
                      <p className="text-xs text-gray-400 font-inter">{bet.time}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        className={`${
                          bet.status === 'Won' ? 'bg-emerald-600' : 
                          bet.status === 'Lost' ? 'bg-amber-600' : 'bg-sapphire-600'
                        } text-white`}
                      >
                        {bet.status === 'Won' ? 'Earned' : bet.status === 'Lost' ? 'Unstaked' : 'Active'}
                      </Badge>
                      {bet.payout !== "0" && bet.payout !== "Processing..." && (
                        <p className="text-xs jewel-emerald mt-1 font-inter">+{bet.payout} $GTLM</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}