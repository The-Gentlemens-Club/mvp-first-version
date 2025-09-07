import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Vote, Plus, ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";
import { useContract } from "@/hooks/use-contract";
import { useWeb3 } from "@/hooks/use-web3";
import { useToast } from "@/hooks/use-toast";

export default function GovernancePanel() {
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [isCreatingProposal, setIsCreatingProposal] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { contract } = useContract();
  const { account, stakedBalance } = useWeb3();
  const { toast } = useToast();

  const createProposal = async () => {
    if (!contract || !account || !proposalTitle || !proposalDescription) {
      toast({
        title: "Invalid Proposal",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreatingProposal(true);
      
      const proposalText = `${proposalTitle}: ${proposalDescription}`;
      const tx = await contract.createProposal(proposalText, {
        from: account,
      });

      toast({
        title: "Proposal Submitted",
        description: "Waiting for confirmation...",
      });

      await tx.wait();
      
      toast({
        title: "Proposal Created Successfully",
        description: "Your proposal has been submitted to the DAO",
      });

      setProposalTitle("");
      setProposalDescription("");
      setDialogOpen(false);
    } catch (error: any) {
      console.error("Proposal creation error:", error);
      toast({
        title: "Proposal Creation Failed",
        description: error.message || "Failed to create proposal",
        variant: "destructive",
      });
    } finally {
      setIsCreatingProposal(false);
    }
  };

  const vote = async (proposalId: number, support: boolean) => {
    if (!contract || !account) {
      toast({
        title: "Cannot Vote",
        description: "Please connect wallet",
        variant: "destructive",
      });
      return;
    }

    if (!stakedBalance || parseFloat(stakedBalance) === 0) {
      toast({
        title: "Cannot Vote",
        description: "You must have staked tokens to vote",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsVoting(true);
      
      const tx = await contract.vote(proposalId, {
        from: account,
      });

      toast({
        title: "Vote Submitted",
        description: "Waiting for confirmation...",
      });

      await tx.wait();
      
      toast({
        title: "Vote Recorded",
        description: `Your ${support ? "support" : "opposition"} vote has been recorded`,
      });
    } catch (error: any) {
      console.error("Voting error:", error);
      toast({
        title: "Voting Failed",
        description: error.message || "Failed to record vote",
        variant: "destructive",
      });
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="gentlemen-primary rounded-xl border border-gray-800 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gentlemen-gold">
          <Vote className="inline-block mr-3" />
          DAO Governance
        </h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Proposal
            </Button>
          </DialogTrigger>
          <DialogContent className="gentlemen-primary border-gray-800">
            <DialogHeader>
              <DialogTitle className="gentlemen-gold">Create New Proposal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="proposalTitle" className="text-gray-300">Proposal Title</Label>
                <Input
                  id="proposalTitle"
                  value={proposalTitle}
                  onChange={(e) => setProposalTitle(e.target.value)}
                  placeholder="Enter proposal title"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[var(--gentlemen-gold)]"
                />
              </div>
              <div>
                <Label htmlFor="proposalDescription" className="text-gray-300">Description</Label>
                <Textarea
                  id="proposalDescription"
                  value={proposalDescription}
                  onChange={(e) => setProposalDescription(e.target.value)}
                  placeholder="Describe your proposal in detail..."
                  rows={4}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[var(--gentlemen-gold)]"
                />
              </div>
              <div className="flex space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  onClick={createProposal}
                  disabled={isCreatingProposal}
                  className="flex-1 gentlemen-gradient text-gray-900 font-bold"
                >
                  {isCreatingProposal ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Proposals */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Active Proposals</h3>
          
          {/* Sample Proposal */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white mb-2">Increase Maximum Bet Limit to 1000 GTLM</h4>
                <p className="text-gray-400 text-sm mb-3">
                  Proposal to increase the maximum bet limit from 500 GTLM to 1000 GTLM to accommodate high-roller members and increase platform revenue.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>Proposed by: <span className="gentlemen-gold">0x742d...35Ac</span></span>
                  <span>Voting ends: <span>2 days</span></span>
                </div>
              </div>
              <div className="ml-4 text-right">
                <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </div>
              </div>
            </div>

            {/* Voting Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Voting Progress</span>
                <span>1,250,000 / 2,000,000 GTLM</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "62.5%" }}></div>
              </div>
            </div>

            {/* Voting Buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={() => vote(0, true)}
                disabled={isVoting || !account}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {isVoting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ThumbsUp className="w-4 h-4 mr-2" />
                )}
                Vote For
              </Button>
              <Button
                onClick={() => vote(0, false)}
                disabled={isVoting || !account}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                {isVoting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ThumbsDown className="w-4 h-4 mr-2" />
                )}
                Vote Against
              </Button>
            </div>
          </div>
        </div>

        {/* Voting Power & Stats */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Your Voting Power</h3>
            <div className="text-center">
              <p className="text-3xl font-bold gentlemen-bronze mb-2">{stakedBalance || "0"} GTLM</p>
              <p className="text-gray-400 text-sm">Based on staked tokens</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Voting Weight</span>
                <span className="text-white font-medium">
                  {stakedBalance ? ((parseFloat(stakedBalance) / 2450000) * 100).toFixed(3) : "0"}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">DAO Treasury</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Assets</span>
                <span className="text-white font-bold">4,250,000 GTLM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ETH Balance</span>
                <span className="text-white font-bold">125.5 ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly Revenue</span>
                <span className="text-green-400 font-bold">+85,000 GTLM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
