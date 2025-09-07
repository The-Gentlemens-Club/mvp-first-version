import { useState, useEffect } from "react";
import { Zap, TrendingUp, TrendingDown } from "lucide-react";

interface LiveEvent {
  id: string;
  type: 'bet' | 'stake' | 'win' | 'proposal';
  user: string;
  amount?: string;
  outcome?: boolean;
  timestamp: Date;
  description: string;
}

export default function LiveFeed() {
  const [events, setEvents] = useState<LiveEvent[]>([]);

  useEffect(() => {
    // Simulate live events
    const generateEvent = (): LiveEvent => {
      const types = ['bet', 'stake', 'win', 'proposal'] as const;
      const type = types[Math.floor(Math.random() * types.length)];
      const users = ['0x742d...35Ac', '0x1a2b...9f4e', '0x8c7d...2b1a', '0x5f3e...7d8c'];
      const amounts = ['50', '125', '250', '500', '1000'];
      
      let description = '';
      const user = users[Math.floor(Math.random() * users.length)];
      const amount = amounts[Math.floor(Math.random() * amounts.length)];
      
      switch (type) {
        case 'bet':
          description = `${user} placed a ${amount} GTLM bet`;
          break;
        case 'stake':
          description = `${user} staked ${amount} GTLM tokens`;
          break;
        case 'win':
          description = `${user} won ${amount} GTLM!`;
          break;
        case 'proposal':
          description = `${user} created a new DAO proposal`;
          break;
      }

      return {
        id: Math.random().toString(36).substring(7),
        type,
        user,
        amount: type !== 'proposal' ? amount : undefined,
        outcome: type === 'bet' ? Math.random() > 0.5 : undefined,
        timestamp: new Date(),
        description
      };
    };

    // Add initial events
    const initialEvents = Array.from({ length: 5 }, generateEvent);
    setEvents(initialEvents);

    // Add new events periodically
    const interval = setInterval(() => {
      const newEvent = generateEvent();
      setEvents(prev => [newEvent, ...prev.slice(0, 9)]); // Keep only last 10 events
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (type: string, outcome?: boolean) => {
    switch (type) {
      case 'bet':
        return outcome ? <TrendingUp className="jewel-emerald" /> : <TrendingDown className="jewel-ruby" />;
      case 'stake':
        return <Zap className="jewel-sapphire" />;
      case 'win':
        return <TrendingUp className="metal-gold" />;
      case 'proposal':
        return <Zap className="jewel-amethyst" />;
      default:
        return <Zap className="text-gray-400" />;
    }
  };

  const getEventColor = (type: string, outcome?: boolean) => {
    switch (type) {
      case 'bet':
        return outcome ? 'border-green-600' : 'border-red-600';
      case 'stake':
        return 'border-blue-600';
      case 'win':
        return 'border-green-600';
      case 'proposal':
        return 'border-purple-600';
      default:
        return 'border-gray-600';
    }
  };

  return (
    <div className="luxury-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-playfair metal-gold">
          <Zap className="inline-block mr-3" />
          Live Society Activity
        </h2>
        <div className="flex items-center space-x-2 jewel-emerald">
          <div className="w-2 h-2 bg-emerald-400 rounded-full status-online"></div>
          <span className="text-sm font-inter">Live</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {events.map((event) => (
          <div 
            key={event.id}
            className="flex items-center p-3 luxury-card-subtle rounded-lg border-l-4 border-amber-600/50"
          >
            <div className="w-8 h-8 rounded-full luxury-card-elevated flex items-center justify-center mr-3">
              {getEventIcon(event.type, event.outcome)}
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-inter">{event.description}</p>
              <p className="text-gray-400 text-xs font-inter">
                {event.timestamp.toLocaleTimeString()}
              </p>
            </div>
            {event.amount && (
              <div className="text-right">
                <p className="text-white font-semibold font-inter">{event.amount}</p>
                <p className="data-label">GTLM</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}