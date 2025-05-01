import React from "react";

interface StatusBarProps {
  level: number;
  score: number;
  attempts: number;
  levelText?: string;
  scoreText?: string;
  attemptsText?: string;
}

export default function StatusBar({
  level,
  score,
  attempts,
  levelText = "Level",
  scoreText = "Score",
  attemptsText = "Attempts",
}: StatusBarProps) {
  return (
    <div className="flex justify-between mb-8">
      <div className="bg-blue-100 px-4 py-2 rounded-md text-center w-1/3">
        <div className="text-sm font-semibold">{levelText}</div>
        <div className="text-xl font-bold text-indigo-600">{level}</div>
      </div>

      <div className="bg-green-100 px-4 py-2 rounded-md text-center w-1/3 mx-2">
        <div className="text-sm font-semibold">{scoreText}</div>
        <div className="text-xl font-bold text-green-600">{score}</div>
      </div>

      <div className="bg-red-100 px-4 py-2 rounded-md text-center w-1/3">
        <div className="text-sm font-semibold">{attemptsText}</div>
        <div className="text-xl font-bold text-red-600">{attempts}</div>
      </div>
    </div>
  );
}
