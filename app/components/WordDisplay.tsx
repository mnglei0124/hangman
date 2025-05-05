import React from "react";

interface WordDisplayProps {
  word: string;
  guessedLetters: Set<string>;
  category: string;
  categoryText?: string;
}

export default function WordDisplay({
  word,
  guessedLetters,
  category,
  categoryText = "Category",
}: WordDisplayProps) {
  return (
    <div className="text-center">
      <div className="mb-6 mt-8">
        <div className="inline-block bg-indigo-100 px-4 py-2 rounded-md text-center shadow-sm">
          <span className="font-mono font-medium text-indigo-800">
            {categoryText}: {category}
          </span>
        </div>
      </div>

      <div className="my-8 flex justify-center gap-2 flex-wrap">
        {word.split("").map((letter, index) => {
          // If it's a space, always show it
          if (letter === " ") {
            return (
              <div
                key={index}
                className="w-8 sm:w-10 h-10 sm:h-12 flex items-center justify-center mx-1"
              >
                <span className="font-mono text-xl sm:text-3xl font-bold">
                  &nbsp;
                </span>
              </div>
            );
          }

          return (
            <div
              key={index}
              className={`w-8 sm:w-10 h-10 sm:h-12 flex items-center justify-center border-b-4 ${
                guessedLetters.has(letter)
                  ? "border-green-500"
                  : "border-indigo-300"
              }`}
            >
              <span className="font-mono text-xl sm:text-3xl font-bold">
                {guessedLetters.has(letter) ? letter : ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
