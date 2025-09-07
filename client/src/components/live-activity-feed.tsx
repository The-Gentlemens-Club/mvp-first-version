import { useState, useEffect } from 'react';
import { TrendingUp, Coins, Users, Award, Zap } from 'lucide-react';

interface Activity {
  id: string;
  type: 'bet' | 'stake' | 'win' | 'join' | 'vote';
  user: string;
  amount?: string;
  game?: string;
  timestamp: Date;
}

const mockActivities: Omit<Activity, 'id' | 'timestamp'>[] = [
  { type: 'win', user: '0x7a...3f2d', amount: '2.5 ETH', game: 'Gentlemen Dice' },
  { type: 'stake', user: '0x9b...8e1c', amount: '1000 GTLM' },
  { type: 'bet', user: '0x4c...2a9f', amount: '0.5 ETH', game: 'Blackjack' },
  { type: 'join', user: '0x1d...6b3e' },
  { type: 'vote', user: '0x8f...4c2d' },
  { type: 'win', user: '0x3e...9a1b', amount: '5.0 ETH', game: 'Roulette' },
  { type: 'stake', user: '0x6a...7f4e', amount: '500 GTLM' },
  { type: 'bet', user: '0x2b...3c8d', amount: '1.0 ETH', game: 'Poker' },
];

export function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Initialize with some activities
    const initialActivities = mockActivities.slice(0, 8).map((activity, index) => ({
      ...activity,
      id: `initial-${index}`,
      timestamp: new Date(Date.now() - index * 60000),
    }));
    setActivities(initialActivities);

    // Disable automatic updates to prevent popup behavior
    // If you want to re-enable updates, increase the interval (e.g., 30000ms)
    // and ensure animations are smooth
    
    // Optional: Add new activities less frequently without disruptive animations
    // const interval = setInterval(() => {
    //   const randomActivity = mockActivities[Math.floor(Math.random() * mockActivities.length)];
    //   const newActivity: Activity = {
    //     ...randomActivity,
    //     id: `activity-${Date.now()}`,
    //     timestamp: new Date(),
    //   };
    //   
    //   setActivities(prev => [newActivity, ...prev].slice(0, 8));
    // }, 30000); // 30 seconds instead of 5

    // return () => clearInterval(interval);
  }, []);

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'win': return <Award className="w-4 h-4" style={{ color: '#d4af37' }} />;
      case 'stake': return <Coins className="w-4 h-4" style={{ color: '#50c878' }} />;
      case 'bet': return <TrendingUp className="w-4 h-4" style={{ color: '#4169e1' }} />;
      case 'join': return <Users className="w-4 h-4" style={{ color: '#d4af37' }} />;
      case 'vote': return <Zap className="w-4 h-4" style={{ color: '#cc1f1f' }} />;
    }
  };

  const getMessage = (activity: Activity) => {
    switch (activity.type) {
      case 'win':
        return `${activity.user} won ${activity.amount} in ${activity.game}`;
      case 'stake':
        return `${activity.user} staked ${activity.amount}`;
      case 'bet':
        return `${activity.user} bet ${activity.amount} on ${activity.game}`;
      case 'join':
        return `${activity.user} joined the Club`;
      case 'vote':
        return `${activity.user} voted on a proposal`;
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="live-activity-feed">
      <div className="feed-header">
        <div className="pulse-indicator"></div>
        <h4 className="text-white font-semibold">Live Activity</h4>
      </div>
      
      <div className="feed-container">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="activity-item"
            >
              <div className="activity-icon">
                {getIcon(activity.type)}
              </div>
              <div className="activity-content">
                <p className="activity-message">
                  {getMessage(activity)}
                </p>
                <span className="activity-time">
                  {getTimeAgo(activity.timestamp)}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}