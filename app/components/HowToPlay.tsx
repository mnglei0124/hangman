import React from "react";

interface HowToPlayProps {
  maxAttempts: number;
  titleText?: string;
  instructionsText?: string[];
}

export default function HowToPlay({
  maxAttempts,
  titleText = "How to Play",
  instructionsText,
}: HowToPlayProps) {
  const defaultInstructions = [
    "Guess the hidden word one letter at a time",
    "Each incorrect guess adds a part to the hangman structure",
    `You have ${maxAttempts} attempts before the hangman is complete`,
    "Win points by completing words and advance to higher levels",
    "More points are awarded for using fewer incorrect guesses",
    "Use hints wisely - they cost 1 attempt!",
    "Use your physical keyboard to input letters faster",
    "Complete all levels to master the game!",
  ];

  const instructions = instructionsText || defaultInstructions;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-lg mt-4 sm:mt-6">
      <h2 className="text-lg sm:text-xl font-bold text-indigo-600 mb-2 sm:mb-3">
        {titleText}
      </h2>
      <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
    </div>
  );
}
