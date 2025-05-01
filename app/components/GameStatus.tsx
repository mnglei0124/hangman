import React from "react";

interface GameStatusProps {
  status: "playing" | "won" | "lost";
  word: string;
  onNextLevel: () => void;
  onRestart: () => void;
  wonText?: string;
  lostText?: string;
  nextLevelText?: string;
  playAgainText?: string;
}

export default function GameStatus({
  status,
  word,
  onNextLevel,
  onRestart,
  wonText = "You won!",
  lostText = "Game Over! The word was:",
  nextLevelText = "Next Level",
  playAgainText = "Play Again",
}: GameStatusProps) {
  if (status === "playing") return null;

  if (status === "won") {
    return (
      <div className="mt-4">
        <p className="text-green-600 font-bold mb-2">{wonText}</p>
        <button
          onClick={onNextLevel}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm sm:text-base"
        >
          {nextLevelText}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-red-600 font-bold mb-2">
        {lostText} {word}
      </p>
      <button
        onClick={onRestart}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm sm:text-base"
      >
        {playAgainText}
      </button>
    </div>
  );
}
