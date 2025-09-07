import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { History, Filter, Download, ExternalLink, TrendingUp, TrendingDown, Lock, Vote } from "lucide-react";

interface Transaction {
  id: string;
  type: 'bet' | 'stake' | 'unstake' | 'proposal' | 'vote' | 'reward';
  amount: string;
  status: 'confirmed' | 'pending' | 'failed';
  txHash: string;
  time: string;
  outcome?: boolean;
  details?: string;
}

export default function TransactionHistory() {
  const [filter, setFilter] = useState<'all' | 'bet' | 'stake' | 'governance'>('all');

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'bet',
      amount: '250',
      status: 'confirmed',
      txHash: '0x742d35cc6633c0532925a3b8d49dba8c8081eeaa12345678',
      time: '2 hours ago',
      outcome: true,
      details: 'Roll Over 3 - Won'
    },
    {
      id: '2',
      type: 'stake',
      amount: '1000',
      status: 'confirmed',
      txHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890',
      time: '5 hours ago',
      details: '30-day lock period'
    },
    {
      id: '3',
      type: 'reward',
      amount: '24.5',
      status: 'confirmed',
      txHash: '0x8c7d6e5f4a3b2c1d0e9f8g7h6i5j4k3l2m1n0o9p87654321',
      time: '1 day ago',
      details: 'Staking rewards distributed'
    },
    {
      id: '4',
      type: 'vote',
      amount: '0',
      status: 'confirmed',
      txHash: '0x5f3e7d8c2b1a9f4e6d5c3b2a1f9e8d7c6b5a4f3e2d1c0b9a',
      time: '2 days ago',
      details: 'Voted on Proposal #1'
    },
    {
      id: '5',
      type: 'bet',
      amount: '100',
      status: 'confirmed',
      txHash: '0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f',
      time: '2 days ago',
      outcome: false,
      details: 'Roll Under 4 - Lost'
    },
    {
      id: '6',
      type: 'proposal',
      amount: '0',
      status: 'pending',
      txHash: '0x2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d',
      time: '3 days ago',
      details: 'Created Proposal: Increase bet limits'
    }
  ];

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    if (filter === 'bet') return tx.type === 'bet';
    if (filter === 'stake') return ['stake', 'unstake', 'reward'].includes(tx.type);
    if (filter === 'governance') return ['proposal', 'vote'].includes(tx.type);
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bet':
        return <TrendingUp className="w-4 h-4" />;
      case 'stake':
        return <Lock className="w-4 h-4" />;
      case 'unstake':
        return <TrendingDown className="w-4 h-4" />;
      case 'proposal':
      case 'vote':
        return <Vote className="w-4 h-4" />;
      case 'reward':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <History className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string, outcome?: boolean) => {
    switch (type) {
      case 'bet':
        return outcome ? 'text-green-400' : 'text-red-400';
      case 'stake':
      case 'reward':
        return 'text-yellow-400';
      case 'unstake':
        return 'text-orange-400';
      case 'proposal':
      case 'vote':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-900 text-green-400">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-900 text-yellow-400">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-900 text-red-400">Failed</Badge>;
      default:
        return <Badge className="bg-gray-800 text-gray-400">Unknown</Badge>;
    }
  };

  const formatTxHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  return (
    <div className="gentlemen-primary rounded-xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          <History className="inline-block mr-3" />
          Transaction History
        </h2>
        <div className="flex items-center space-x-4">
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="Filter transactions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="bet">Betting</SelectItem>
              <SelectItem value="stake">Staking</SelectItem>
              <SelectItem value="governance">Governance</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-gray-600 text-gray-400 hover:text-white">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Details</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Tx Hash</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className={`${getTypeColor(tx.type, tx.outcome)}`}>
                        {getTypeIcon(tx.type)}
                      </div>
                      <span className="text-white capitalize font-medium">{tx.type}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {tx.amount !== '0' ? (
                      <div>
                        <span className={`font-bold ${
                          tx.type === 'bet' && tx.outcome !== undefined
                            ? tx.outcome ? 'text-green-400' : 'text-red-400'
                            : 'text-white'
                        }`}>
                          {tx.type === 'bet' && tx.outcome !== undefined && tx.outcome ? '+' : ''}
                          {tx.amount} GTLM
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(tx.status)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-300 text-sm">{tx.details}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400 font-mono text-sm">{formatTxHash(tx.txHash)}</span>
                      <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-400 text-sm">{tx.time}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-8">
                  No transactions found for the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Transaction Summary */}
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Total Transactions</p>
            <p className="text-white font-bold text-lg">{transactions.length}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Total Wagered</p>
            <p className="text-white font-bold text-lg">350 GTLM</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Net Profit</p>
            <p className="text-green-400 font-bold text-lg">+174.5 GTLM</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Success Rate</p>
            <p className="text-yellow-400 font-bold text-lg">50%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
