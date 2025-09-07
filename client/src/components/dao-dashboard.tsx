import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Users, 
  Vote, 
  TrendingUp, 
  DollarSign, 
  Crown, 
  Plus,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Coins,
  ChevronDown,
  ChevronUp,
  Zap
} from "lucide-react";
import { useWeb3 } from "@/hooks/use-web3";

export default function DAODashboard() {
  const { account, stakedBalance, gtlmBalance } = useWeb3();
  const [showCreateProposal, setShowCreateProposal] = useState(false);
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [expandedProposals, setExpandedProposals] = useState<{[key: number]: boolean}>({});
  const [treasuryUpdate, setTreasuryUpdate] = useState("");
  
  // Competition-ready real-time treasury data - Slide 4: 80% NGR to DAO
  const [treasuryBalance, setTreasuryBalance] = useState("2,450,000");
  const [stakingRewards, setStakingRewards] = useState("735,000");

  // Mock real-time treasury updates with fade-in animation
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIncrease = Math.floor(Math.random() * 1000);
      setTreasuryBalance(prev => {
        const newAmount = parseInt(prev.replace(/,/g, '')) + randomIncrease;
        return newAmount.toLocaleString();
      });
      setStakingRewards(prev => {
        const newAmount = parseInt(prev.replace(/,/g, '')) + Math.floor(randomIncrease * 0.3);
        return newAmount.toLocaleString();
      });
      setTreasuryUpdate(`Treasury: ${treasuryBalance} $GTLM (+${randomIncrease})`);
      
      // Clear update message after 3 seconds
      setTimeout(() => setTreasuryUpdate(""), 3000);
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, [treasuryBalance]);
  
  // Mock governance proposals
  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: "Increase Staking Rewards to 35%",
      description: "Proposal to increase staking rewards from 30% to 35% of treasury to attract more long-term holders.",
      status: "Active",
      votesFor: 1250000,
      votesAgainst: 180000,
      totalVotes: 1430000,
      endDate: "2025-02-01",
      creator: "0x742d...3a5f"
    },
    {
      id: 2,
      title: "Add Blackjack Game Provider",
      description: "Integrate Evolution Gaming's live blackjack tables to expand our game offerings.",
      status: "Active",
      votesFor: 980000,
      votesAgainst: 420000,
      totalVotes: 1400000,
      endDate: "2025-01-28",
      creator: "0x1b4c...8d2e"
    },
    {
      id: 3,
      title: "Marketing Budget Allocation",
      description: "Allocate 5% of treasury for Q1 2025 marketing campaigns and partnerships.",
      status: "Passed",
      votesFor: 2100000,
      votesAgainst: 350000,
      totalVotes: 2450000,
      endDate: "2025-01-15",
      creator: "0x9f8e...4c1a"
    }
  ]);

  const createProposal = () => {
    if (!proposalTitle || !proposalDescription) return;
    
    const newProposal = {
      id: Date.now(),
      title: proposalTitle,
      description: proposalDescription,
      status: "Active",
      votesFor: 0,
      votesAgainst: 0,
      totalVotes: 0,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      creator: account || "0x0000...0000"
    };
    
    setProposals([newProposal, ...proposals]);
    setProposalTitle("");
    setProposalDescription("");
    setShowCreateProposal(false);
  };

  return (
    <div className="space-y-8" id="governance">
      {/* Real-time Treasury Update Alert - Competition Ready */}
      {treasuryUpdate && (
        <div className="fixed top-20 right-4 z-50 animate-in fade-in slide-in-from-right duration-500">
          <div className="luxury-card-elevated px-6 py-3 rounded-lg shadow-2xl border border-yellow-600/40">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold font-inter text-yellow-100">{treasuryUpdate}</span>
            </div>
          </div>
        </div>
      )}



      {/* Treasury Overview - Slide 4 */}
      <div className="flex gap-6" id="treasury">
        <Card className="luxury-card flex-1">
          <CardHeader>
            <CardTitle className="flex items-center font-playfair text-white">
              <DollarSign className="text-yellow-400 mr-2" />
              Treasury Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold metal-gold font-playfair mb-2">
                {treasuryBalance} $GTLM
              </p>
              <p className="text-sm text-gray-400 font-inter">80% of Net Gaming Revenue</p>
              <div className="mt-4 p-3 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
                <p className="jewel-emerald text-sm font-inter">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  +12.5% this month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>



        <Card className="luxury-card flex-1">
          <CardHeader>
            <CardTitle className="flex items-center font-playfair text-white">
              <Users className="text-yellow-400 mr-2" />
              DAO Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold metal-gold font-playfair mb-2">1,847</p>
              <p className="text-sm text-gray-400 font-inter">Active Governance Participants</p>
              <div className="mt-4">
                <p className="text-sm text-gray-300 font-inter">
                  Your Voting Power: {Math.floor((parseFloat(stakedBalance) / 5000000) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Governance Actions */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Proposals List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold font-playfair text-white">Active Proposals</h3>
            <Button 
              onClick={() => setShowCreateProposal(true)}
              className="btn-luxury-primary"
              disabled={!account || parseFloat(stakedBalance) < 1000}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Proposal
            </Button>
          </div>

          {/* Create Proposal Modal */}
          {showCreateProposal && (
            <Card className="luxury-card-elevated border-2 border-yellow-600/40">
              <CardHeader>
                <CardTitle className="font-playfair text-white">Create New Proposal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2 font-inter text-white">Title</label>
                  <Input
                    placeholder="Enter proposal title"
                    value={proposalTitle}
                    onChange={(e) => setProposalTitle(e.target.value)}
                    className="luxury-input font-inter"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2 font-inter text-white">Description</label>
                  <Textarea
                    placeholder="Describe your proposal in detail"
                    value={proposalDescription}
                    onChange={(e) => setProposalDescription(e.target.value)}
                    className="luxury-input font-inter min-h-24"
                  />
                </div>
                <div className="flex space-x-4">
                  <Button onClick={createProposal} className="btn-luxury-primary">
                    Create Proposal
                  </Button>
                  <Button 
                    onClick={() => setShowCreateProposal(false)}
                    variant="outline"
                    className="btn-luxury-outline"
                  >
                    Cancel
                  </Button>
                </div>
                <p className="text-xs text-gray-400 font-inter">
                  Minimum 1,000 $GTLM staked required to create proposals
                </p>
              </CardContent>
            </Card>
          )}

          {/* Proposals */}
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <Card key={proposal.id} className="luxury-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-playfair mb-2 text-white">
                        {proposal.title}
                      </CardTitle>
                      <p className="text-gray-300 font-inter">{proposal.description}</p>
                    </div>
                    <Badge 
                      className={`${
                        proposal.status === 'Active' ? 'bg-sapphire-600' : 
                        proposal.status === 'Passed' ? 'bg-emerald-600' : 'bg-red-600'
                      } text-white`}
                    >
                      {proposal.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Voting Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400 font-inter">
                          For: {(proposal.votesFor / 1000000).toFixed(1)}M $GTLM
                        </span>
                        <span className="text-gray-400 font-inter">
                          Against: {(proposal.votesAgainst / 1000000).toFixed(1)}M $GTLM
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Collapsible Voting Actions - Competition Ready Feature */}
                    {proposal.status === 'Active' && account && (
                      <Collapsible 
                        open={expandedProposals[proposal.id]} 
                        onOpenChange={(open) => setExpandedProposals(prev => ({...prev, [proposal.id]: open}))}
                      >
                        <CollapsibleTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="w-full bg-blue-400/70 border-blue-300/60 text-white"
                          >
                            <Vote className="w-4 h-4 mr-2" />
                            Vote on Proposal
                            {expandedProposals[proposal.id] ? 
                              <ChevronUp className="w-4 h-4 ml-2" /> : 
                              <ChevronDown className="w-4 h-4 ml-2" />
                            }
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-4 mt-4 animate-in slide-in-from-top duration-300">
                          <div className="luxury-card-subtle rounded-lg p-4">
                            <p className="font-semibold mb-3 font-inter text-white">Cast Your Vote</p>
                            <p className="text-gray-400 text-sm mb-4 font-inter">
                              Your voting power: {Math.floor((parseFloat(stakedBalance) / 5000000) * 100)}% 
                              ({Math.floor(parseFloat(stakedBalance) / 1000)}K $GTLM)
                            </p>
                            <div className="flex space-x-4">
                              <Button 
                                size="sm" 
                                className="bg-emerald-600 text-white flex-1"
                              >
                                <ThumbsUp className="w-4 h-4 mr-2" />
                                Vote For
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-red-600 text-white flex-1"
                              >
                                <ThumbsDown className="w-4 h-4 mr-2" />
                                Vote Against
                              </Button>
                            </div>
                            <div className="mt-3 text-xs text-gray-500 font-inter">
                              Voting ends: {proposal.endDate}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    )}

                    {/* Proposal Meta */}
                    <div className="flex justify-between text-xs text-gray-400">
                      <span className="font-inter">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        Ends: {proposal.endDate}
                      </span>
                      <span className="font-inter">
                        By: {proposal.creator}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Governance Stats */}
        <div className="space-y-6">
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className="font-playfair text-white">Your DAO Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Crown className="text-yellow-400 text-3xl mx-auto mb-2" />
                <p className="text-xl font-bold metal-gold font-playfair">
                  {parseFloat(stakedBalance) >= 10000 ? "Gentleman" : 
                   parseFloat(stakedBalance) >= 1000 ? "Member" : "Observer"}
                </p>
                <p className="text-sm text-gray-400 font-inter">
                  Staked: {stakedBalance} $GTLM
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300 font-inter">Voting Power</span>
                  <span className="font-semibold text-white">
                    {Math.floor((parseFloat(stakedBalance) / 5000000) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 font-inter">Proposals Created</span>
                  <span className="font-semibold text-white">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 font-inter">Votes Cast</span>
                  <span className="font-semibold text-white">15</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className="font-playfair text-white">Next Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-2xl font-bold metal-gold font-playfair mb-2">
                  {Math.floor((parseFloat(stakedBalance) / 5000000) * 735000).toLocaleString()} $GTLM
                </p>
                <p className="text-sm text-gray-400 font-inter mb-4">
                  Estimated monthly reward
                </p>
                <div className="luxury-card-subtle rounded-lg p-3">
                  <p className="text-xs text-gray-300 font-inter">
                    Based on your current stake and 30% treasury distribution
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}