import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Trophy, Target, TrendingUp, Calendar, Star, Award, Clock, Gamepad2, Activity, History, BarChart3 } from "lucide-react";
import { useWeb3 } from "@/hooks/use-web3";
import PlayerStats from "@/components/player-stats";
import PlayerAchievements from "@/components/player-achievements";

export default function UserProfileModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("HighRoller");
  const [bio, setBio] = useState("Professional dice roller and DAO enthusiast");
  const { account, balance, gtlmBalance, stakedBalance } = useWeb3();

  const achievements = [
    { name: "First Bet", description: "Placed your first bet", earned: true, icon: Target },
    { name: "High Roller", description: "Wagered over 10,000 GTLM", earned: true, icon: TrendingUp },
    { name: "Lucky Streak", description: "Won 5 bets in a row", earned: true, icon: Star },
    { name: "DAO Member", description: "Participated in governance", earned: true, icon: Award },
    { name: "Whale Staker", description: "Staked over 1,000 GTLM", earned: false, icon: Trophy },
    { name: "Diamond Hands", description: "Held stake for 6+ months", earned: false, icon: Clock },
    { name: "Game Master", description: "Tried all available games", earned: false, icon: Gamepad2 },
    { name: "Community Leader", description: "Created 5+ DAO proposals", earned: false, icon: Activity },
  ];

  const recentActivity = [
    { type: "bet", description: "Won 150 GTLM on Dice Game", time: "2 hours ago", amount: "+150 GTLM" },
    { type: "stake", description: "Staked 500 GTLM tokens", time: "5 hours ago", amount: "-500 GTLM" },
    { type: "governance", description: "Voted on Treasury Proposal #12", time: "1 day ago", amount: "" },
    { type: "bet", description: "Lost 75 GTLM on Dice Game", time: "2 days ago", amount: "-75 GTLM" },
    { type: "reward", description: "Earned staking rewards", time: "3 days ago", amount: "+12.5 GTLM" },
  ];

  const stats = [
    { label: "Total Wagered", value: "12,450 GTLM", icon: Target },
    { label: "Total Won", value: "6,890 GTLM", icon: Trophy },
    { label: "Win Rate", value: "55.4%", icon: TrendingUp },
    { label: "Member Since", value: "Dec 2023", icon: Calendar },
  ];

  if (!account) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="btn-luxury-outline" 
          data-testid="button-profile"
        >
          <User className="w-4 h-4 mr-2" />
          Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="luxury-card border-yellow-600/30 max-w-5xl max-h-[90vh] overflow-y-auto !fixed !top-[50%] !left-[50%] !transform !-translate-x-1/2 !-translate-y-1/2">
        <DialogHeader className="pb-4 border-b border-yellow-600/20">
          <DialogTitle className="metal-gold flex items-center font-playfair">
            <User className="mr-3" />
            Player Profile
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Profile Header */}
          <div className="flex items-center space-x-4 p-6 luxury-card-elevated rounded-lg mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-amber-600 rounded-full flex items-center justify-center">
              <User className="text-black text-3xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white heading-playfair">{username}</h3>
              <p className="text-gray-400 text-sm font-mono">
                {account.slice(0, 8)}...{account.slice(-6)}
              </p>
              <p className="text-gray-300 mt-2 body-lora">{bio}</p>
            </div>
            <div className="text-right">
              <Badge className="bg-purple-900 text-purple-400 mb-2">
                Platinum Member
              </Badge>
              <div className="text-sm text-gray-400">Level 12</div>
            </div>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 luxury-card border border-yellow-600/30">
              <TabsTrigger value="overview" className="data-[state=active]:bg-[var(--gentlemen-gold)] data-[state=active]:text-gray-900 text-gray-300">
                <User className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="stats" className="data-[state=active]:bg-[var(--gentlemen-gold)] data-[state=active]:text-gray-900 text-gray-300">
                <BarChart3 className="w-4 h-4 mr-2" />
                Statistics
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-[var(--gentlemen-gold)] data-[state=active]:text-gray-900 text-gray-300">
                <Trophy className="w-4 h-4 mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-[var(--gentlemen-gold)] data-[state=active]:text-gray-900 text-gray-300">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6" data-testid="profile-overview">
              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="luxury-card border border-yellow-600/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-300 text-sm">{stat.label}</p>
                          <p className="text-gray-100 font-bold text-lg">{stat.value}</p>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border border-yellow-600/40 rounded-full flex items-center justify-center">
                          <IconComponent className="text-yellow-400" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Current Balances */}
              <div className="luxury-card border border-yellow-600/30 rounded-lg p-4">
                <h4 className="text-gray-100 font-semibold mb-3">Current Balances</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-gray-300 text-sm">ETH</p>
                    <p className="text-gray-100 font-bold">{balance}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-300 text-sm">GTLM</p>
                    <p className="gentlemen-gold font-bold">{gtlmBalance}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-300 text-sm">Staked</p>
                    <p className="gentlemen-bronze font-bold">{stakedBalance}</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="luxury-card border border-yellow-600/30 rounded-lg p-4">
                <h4 className="text-gray-100 font-semibold mb-3 flex items-center">
                  <History className="mr-2" />
                  Recent Activity
                </h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 luxury-card-elevated border border-yellow-600/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                          activity.type === 'bet' ? 'bg-blue-600/20 border-blue-600/40' :
                          activity.type === 'stake' ? 'bg-purple-600/20 border-purple-600/40' :
                          activity.type === 'governance' ? 'bg-green-600/20 border-green-600/40' :
                          'bg-yellow-600/20 border-yellow-600/40'
                        }`}>
                          {activity.type === 'bet' && <Target className="w-4 h-4 text-white" />}
                          {activity.type === 'stake' && <TrendingUp className="w-4 h-4 text-white" />}
                          {activity.type === 'governance' && <Award className="w-4 h-4 text-white" />}
                          {activity.type === 'reward' && <Star className="w-4 h-4 text-white" />}
                        </div>
                        <div>
                          <p className="text-gray-100 text-sm font-medium">{activity.description}</p>
                          <p className="text-gray-300 text-xs">{activity.time}</p>
                        </div>
                      </div>
                      {activity.amount && (
                        <Badge className={`${
                          activity.amount.startsWith('+') ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
                        }`}>
                          {activity.amount}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="mt-6" data-testid="profile-stats">
              <PlayerStats />
            </TabsContent>

            <TabsContent value="achievements" className="mt-6" data-testid="profile-achievements">
              <PlayerAchievements />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-6" data-testid="profile-settings">
              {/* Edit Profile */}
              <div className="luxury-card border border-yellow-600/30 rounded-lg p-4">
                <h4 className="text-gray-100 font-semibold mb-3 flex items-center">
                  <Settings className="mr-2" />
                  Edit Profile
                </h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username" className="text-gray-300">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="luxury-card border-yellow-600/30 text-white bg-gray-900/50 focus:border-yellow-600/60"
                      data-testid="input-username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                    <Input
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="luxury-card border-yellow-600/30 text-white bg-gray-900/50 focus:border-yellow-600/60"
                      data-testid="input-bio"
                    />
                  </div>
                  <Button className="gentlemen-gradient text-black font-semibold" data-testid="button-save-profile">
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}