import { Trophy, Medal, Award, Crown } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  address: string;
  username: string;
  totalWagered: string;
  totalWon: string;
  winRate: number;
  profit: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export default function Leaderboard() {
  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      address: "0x742d35Cc6633C0532925a3b8D49dBa8C8081eEaA",
      username: "HighRoller",
      totalWagered: "125,450",
      totalWon: "68,750",
      winRate: 54.8,
      profit: "+43,300",
      level: 'platinum'
    },
    {
      rank: 2,
      address: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
      username: "DiceKing",
      totalWagered: "98,200",
      totalWon: "52,100",
      winRate: 53.1,
      profit: "+5,900",
      level: 'gold'
    },
    {
      rank: 3,
      address: "0x8c7d6e5f4a3b2c1d0e9f8g7h6i5j4k3l2m1n0o9p",
      username: "LuckyGent",
      totalWagered: "76,800",
      totalWon: "41,250",
      winRate: 53.7,
      profit: "+4,450",
      level: 'gold'
    },
    {
      rank: 4,
      address: "0x5f3e7d8c2b1a9f4e6d5c3b2a1f9e8d7c6b5a4f3e",
      username: "SteadyWin",
      totalWagered: "45,600",
      totalWon: "24,300",
      winRate: 53.3,
      profit: "+2,700",
      level: 'silver'
    },
    {
      rank: 5,
      address: "0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d",
      username: "RiskTaker",
      totalWagered: "32,100",
      totalWon: "17,050",
      winRate: 53.1,
      profit: "+1,950",
      level: 'silver'
    },
    {
      rank: 6,
      address: "0x2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b",
      username: "Conservative",
      totalWagered: "18,750",
      totalWon: "9,900",
      winRate: 52.8,
      profit: "+900",
      level: 'bronze'
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-400" />;
      case 2:
        return <Trophy className="text-gray-400" />;
      case 3:
        return <Medal className="text-orange-400" />;
      default:
        return <Award className="text-gray-500" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'platinum':
        return 'text-cyan-400 bg-cyan-900';
      case 'gold':
        return 'text-yellow-400 bg-yellow-900';
      case 'silver':
        return 'text-gray-300 bg-gray-700';
      case 'bronze':
        return 'text-orange-400 bg-orange-900';
      default:
        return 'text-gray-400 bg-gray-800';
    }
  };

  const getProfitColor = (profit: string) => {
    return profit.startsWith('+') ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="gentlemen-primary rounded-xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold gentlemen-gold">
          <Trophy className="inline-block mr-3" />
          Top Players Leaderboard
        </h2>
        <div className="text-sm text-gray-400">Last 30 days</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 px-2 text-gray-400 font-medium">Rank</th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium">Player</th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium">Level</th>
              <th className="text-right py-3 px-2 text-gray-400 font-medium">Wagered</th>
              <th className="text-right py-3 px-2 text-gray-400 font-medium">Win Rate</th>
              <th className="text-right py-3 px-2 text-gray-400 font-medium">Profit</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry) => (
              <tr key={entry.rank} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-2">
                    {getRankIcon(entry.rank)}
                    <span className="text-white font-bold">#{entry.rank}</span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div>
                    <p className="text-white font-semibold">{entry.username}</p>
                    <p className="text-gray-400 text-xs font-mono">
                      {entry.address.slice(0, 6)}...{entry.address.slice(-4)}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${getLevelColor(entry.level)}`}>
                    {entry.level}
                  </span>
                </td>
                <td className="py-4 px-2 text-right">
                  <p className="text-white font-semibold">{entry.totalWagered}</p>
                  <p className="text-gray-400 text-xs">GTLM</p>
                </td>
                <td className="py-4 px-2 text-right">
                  <p className="text-white font-semibold">{entry.winRate}%</p>
                  <div className="w-16 bg-gray-700 rounded-full h-1 ml-auto mt-1">
                    <div 
                      className="bg-blue-500 h-1 rounded-full" 
                      style={{ width: `${entry.winRate}%` }}
                    ></div>
                  </div>
                </td>
                <td className="py-4 px-2 text-right">
                  <p className={`font-semibold ${getProfitColor(entry.profit)}`}>
                    {entry.profit}
                  </p>
                  <p className="text-gray-400 text-xs">GTLM</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-center">
        <button className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors">
          View Full Rankings →
        </button>
      </div>
    </div>
  );
}