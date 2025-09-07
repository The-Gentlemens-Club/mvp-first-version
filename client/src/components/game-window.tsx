import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Maximize2, 
  Volume2, 
  VolumeX,
  Dice1,
  Spade,
  Heart,
  Diamond,
  Club,
  Crown,
  Zap,
  Gamepad2,
  ExternalLink,
  Minimize2
} from "lucide-react";

interface GameWindowProps {
  selectedGame: string;
  provider: string;
  onClose?: () => void;
}

const GameWindow: React.FC<GameWindowProps> = ({ selectedGame, provider, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gameState, setGameState] = useState<any>(null);

  // Gentlemen Dice Game Logic
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [betAmount, setBetAmount] = useState(10);
  const [prediction, setPrediction] = useState<'higher' | 'lower'>('higher');
  const [balance, setBalance] = useState(1000);
  const [lastWin, setLastWin] = useState<number | null>(null);

  const rollDice = async () => {
    if (isRolling || betAmount > balance) return;
    
    setIsRolling(true);
    setBalance(prev => prev - betAmount);
    
    // Simulate dice rolling animation
    for (let i = 0; i < 10; i++) {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const finalValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(finalValue);
    
    // Determine win/loss
    const won = (prediction === 'higher' && finalValue >= 4) || (prediction === 'lower' && finalValue <= 3);
    const winAmount = won ? betAmount * 1.8 : 0;
    
    if (won) {
      setBalance(prev => prev + winAmount);
      setLastWin(winAmount);
    } else {
      setLastWin(null);
    }
    
    setIsRolling(false);
  };

  const renderGentlemenDice = () => (
    <div className="w-full h-full bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 p-8 rounded-lg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl text-yellow-400">♠</div>
        <div className="absolute top-20 right-20 text-4xl text-yellow-400">♣</div>
        <div className="absolute bottom-20 left-20 text-5xl text-yellow-400">♦</div>
        <div className="absolute bottom-10 right-10 text-6xl text-yellow-400">♥</div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Game Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white heading-playfair mb-2">Gentlemen Dice</h2>
          <p className="text-gray-300 body-lora">Predict if the dice will roll higher (4-6) or lower (1-3)</p>
          <div className="flex justify-center items-center mt-4 space-x-6">
            <div className="text-center">
              <p className="text-sm text-gray-400">Balance</p>
              <p className="text-2xl font-bold text-green-400">${balance}</p>
            </div>
            {lastWin && (
              <div className="text-center animate-pulse">
                <p className="text-sm text-gray-400">Last Win</p>
                <p className="text-2xl font-bold text-yellow-400">+${lastWin}</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Game Area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            {/* Dice Display */}
            <div className={`inline-block p-8 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl shadow-2xl border-4 border-amber-400 mb-8 ${isRolling ? 'animate-bounce' : ''}`}>
              <div className="text-8xl font-bold text-gray-900">
                {diceValue}
              </div>
            </div>
            
            {/* Betting Controls */}
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Bet Amount</label>
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-400"
                    min="1"
                    max={balance}
                    disabled={isRolling}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Prediction</label>
                  <select
                    value={prediction}
                    onChange={(e) => setPrediction(e.target.value as 'higher' | 'lower')}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-400"
                    disabled={isRolling}
                  >
                    <option value="higher">Higher (4-6)</option>
                    <option value="lower">Lower (1-3)</option>
                  </select>
                </div>
              </div>
              
              <Button
                onClick={rollDice}
                disabled={isRolling || betAmount > balance || betAmount <= 0}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-lg"
              >
                {isRolling ? 'Rolling...' : `Roll Dice - Bet $${betAmount}`}
              </Button>
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBetAmount(10)}
                  className="text-white border-gray-600 hover:bg-gray-700"
                  disabled={isRolling}
                >
                  $10
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBetAmount(50)}
                  className="text-white border-gray-600 hover:bg-gray-700"
                  disabled={isRolling}
                >
                  $50
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBetAmount(100)}
                  className="text-white border-gray-600 hover:bg-gray-700"
                  disabled={isRolling}
                >
                  $100
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderThirdPartyGame = () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg relative overflow-hidden flex items-center justify-center">
      <div className="text-center p-8">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <ExternalLink className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white heading-playfair mb-4">{selectedGame}</h3>
        <p className="text-gray-300 body-lora mb-6">
          This game requires integration with {provider}. 
          <br />
          Click below to launch in external window.
        </p>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3">
          <ExternalLink className="w-5 h-5 mr-2" />
          Launch {selectedGame}
        </Button>
        
        <div className="mt-8 text-sm text-gray-400">
          <p>• Licensed content from {provider}</p>
          <p>• Provably fair gameplay</p>
          <p>• Real-time results</p>
        </div>
      </div>
    </div>
  );

  const isGentlemenOriginal = provider === "Gentlemen Originals";

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'w-full h-full min-h-[600px]'} luxury-card-elevated`}>
      {/* Game Header */}
      <div className={`${isFullscreen ? 'absolute top-0 left-0 right-0 z-10' : ''} p-4 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-sm border-b border-amber-400/30`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-white font-playfair text-xl flex items-center font-bold">
              <Gamepad2 className="text-amber-400 mr-3 w-6 h-6" />
              {selectedGame}
            </h3>
            <Badge className={`${
              provider === "Gentlemen Originals" ? "bg-amber-600" :
              provider === "Evolution Gaming" ? "bg-emerald-600" :
              provider === "NetEnt" ? "bg-sapphire-600" : "bg-amethyst-600"
            } text-white font-inter`}>
              {provider}
            </Badge>
          </div>
          
          {/* Game Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="btn-luxury-outline"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="btn-luxury-outline"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="btn-luxury-outline"
            >
              <Settings className="w-4 h-4" />
            </Button>
            {(onClose || isFullscreen) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (isFullscreen) {
                    setIsFullscreen(false);
                  } else if (onClose) {
                    onClose();
                  }
                }}
                className="text-red-400 border-red-600 hover:bg-red-700/20 hover:border-red-400"
              >
                {isFullscreen ? '← Back' : '✕'}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Game Content */}
      <div className={`${isFullscreen ? 'absolute inset-0 pt-16' : 'h-[500px]'} bg-gradient-to-br from-gray-900 to-gray-800`}>
        {isGentlemenOriginal ? renderGentlemenDice() : renderThirdPartyGame()}
      </div>
    </div>
  );
};

export default GameWindow;