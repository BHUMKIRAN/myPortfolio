"use client";

import { useEffect, useState, useCallback } from "react";

const EMOJI_POOL = ["🚀", "💻", "🎨", "⚡", "🔥", "🧠", "🎮", "✨", "🍕", "🌈", "🎸", "👾"];

type Card = {
  id: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

type GameStatus = "idle" | "playing" | "won";

export default function ProMemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState<GameStatus>("idle");
  const [difficulty, setDifficulty] = useState(8); // Number of pairs
  const [isLocked, setIsLocked] = useState(false);

  // Initialize & Reset Game
  const startGame = useCallback(() => {
    const gameEmojis = EMOJI_POOL.slice(0, difficulty);
    const shuffled = [...gameEmojis, ...gameEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({
        id: `${emoji}-${i}`,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffled);
    setSelected([]);
    setMoves(0);
    setTime(0);
    setStatus("playing");
    setIsLocked(false);
  }, [difficulty]);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "playing") {
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  // Win Condition Check
  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.isMatched)) {
      setStatus("won");
    }
  }, [cards]);

  const handleCardClick = (index: number) => {
    // Basic guards
    if (isLocked || cards[index].isFlipped || cards[index].isMatched || status !== "playing") return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newSelected = [...selected, index];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves((m) => m + 1);
      checkMatch(newSelected, newCards);
    }
  };

  const checkMatch = (indices: number[], currentCards: Card[]) => {
    const [first, second] = indices;
    
    if (currentCards[first].emoji === currentCards[second].emoji) {
      // Match found
      setTimeout(() => {
        setCards(prev => prev.map((card, i) => 
          i === first || i === second ? { ...card, isMatched: true } : card
        ));
        setSelected([]);
      }, 300);
    } else {
      // No match
      setIsLocked(true);
      setTimeout(() => {
        setCards(prev => prev.map((card, i) => 
          i === first || i === second ? { ...card, isFlipped: false } : card
        ));
        setSelected([]);
        setIsLocked(false);
      }, 1000); // Give user time to memorize
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl border border-zinc-800 shadow-2xl">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
            Flash Memory
          </h2>
          <p className="text-zinc-500 text-sm">Find all the pairs as fast as you can.</p>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">Moves</p>
            <p className="text-xl font-mono font-bold text-pink-500">{moves}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">Time</p>
            <p className="text-xl font-mono font-bold text-pink-500">{time}s</p>
          </div>
          <button
            onClick={startGame}
            className="px-6 py-2 bg-pink-500  text-white font-bold rounded-full transition-all active:scale-95"
          >
            {status === "idle" ? "Start" : "Reset"}
          </button>
        </div>
      </div>

      {/* Difficulty Toggle (only visible when idle or won) */}
      {status !== "playing" && (
        <div className="flex justify-center gap-2 mb-6">
          {[6, 8, 12].map((num) => (
            <button
              key={num}
              onClick={() => setDifficulty(num)}
              className={`px-3 py-1 rounded text-xs transition ${
                difficulty === num ? "bg-white text-pink-600" : "bg-zinc-900 text-zinc-500"
              }`}
            >
              {num * 2} Cards
            </button>
          ))}
        </div>
      )}

      {/* Game Grid */}
      <div className={`grid gap-4 ${difficulty > 8 ? 'grid-cols-6' : 'grid-cols-4'}`}>
        {cards.map((card, i) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(i)}
            className="relative h-24 w-full cursor-pointer [perspective:1000px]"
          >
            <div
              className={`relative h-full w-full rounded-xl transition-all duration-500 [transform-style:preserve-3d] ${
                card.isFlipped || card.isMatched ? "[transform:rotateY(180deg)]" : ""
              }`}
            >
              {/* Front (Hidden Face) */}
              <div className="absolute inset-0 backface-hidden bg-white border-2 border-blue-600 rounded-xl flex items-center justify-center hover:border-yellow-500/50 transition-colors shadow-inner">
                <div className="w-8 h-8 rounded-full bg-blue-600 animate-pulse" />
              </div>

              {/* Back (The Emoji) */}
              <div className={`absolute inset-0 [transform:rotateY(180deg)] backface-hidden border-2 rounded-xl flex items-center justify-center text-3xl shadow-lg transition-colors
                ${card.isMatched ? "bg-green-500/20 border-green-500" : "bg-white border-yellow-500"}`}>
                {card.emoji}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Win Modal Overlay */}
      {status === "won" && (
        <div className="mt-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl text-center animate-bounce">
          <h3 className="text-2xl font-bold text-yellow-500">Master Mind! 🎉</h3>
          <p className="text-zinc-400">Completed in {moves} moves and {time} seconds.</p>
        </div>
      )}
    </div>
  );
}