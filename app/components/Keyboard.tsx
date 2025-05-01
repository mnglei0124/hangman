import React, { useEffect } from "react";

// Mongolian keyboard layout based on the provided reference image - reorganized
const MONGOLIAN_LAYOUT = [
  ["Ү", "Ф", "Ц", "У", "Ж", "Э", "Н", "Г", "Ш", "Щ", "З", "К", "Ъ"],
  ["Й", "Ы", "Б", "Ө", "А", "Х", "Р", "О", "Л", "Д", "П"],
  ["Я", "Ч", "Ё", "С", "М", "И", "Т", "Ь", "В", "Ю", "Е"],
];

// Included characters (only letters used in Mongolian)
const INCLUDED_CHARS = new Set([
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ё",
  "Ж",
  "З",
  "И",
  "Й",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "Ө",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ү",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Ъ",
  "Ы",
  "Ь",
  "Э",
  "Ю",
  "Я",
]);

interface KeyboardProps {
  onLetterClick: (letter: string) => void;
  guessedLetters: Set<string>;
  gameStatus: "playing" | "won" | "lost";
  keyboardText?: string;
}

export default function Keyboard({
  onLetterClick,
  guessedLetters,
  gameStatus,
  keyboardText = "You can use your keyboard to input letters",
}: KeyboardProps) {
  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameStatus !== "playing") return;

      const key = event.key.toUpperCase();
      if (/^[А-ЯЁӨҮ]$/.test(key) && !guessedLetters.has(key)) {
        onLetterClick(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onLetterClick, guessedLetters, gameStatus]);

  return (
    <div className="mt-4 sm:mt-8">
      <div className="text-center mb-2 sm:mb-4 text-xs sm:text-sm text-gray-600">
        <p>{keyboardText}</p>
      </div>

      <div className="max-w-full overflow-x-auto">
        {MONGOLIAN_LAYOUT.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center mb-3">
            {/* Add appropriate indentation for each row */}
            {rowIndex === 1 && <div className="w-4"></div>}
            {rowIndex === 2 && <div className="w-6"></div>}

            {row.map((key) => {
              const upperKey = key.toUpperCase();
              const isLetter = INCLUDED_CHARS.has(upperKey);

              return isLetter ? (
                <button
                  key={key}
                  onClick={() => onLetterClick(upperKey)}
                  disabled={
                    guessedLetters.has(upperKey) || gameStatus !== "playing"
                  }
                  className="
                    w-10 h-10 mx-0.5 flex items-center justify-center rounded-lg 
                    font-bold text-base text-white bg-purple-500 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {upperKey}
                </button>
              ) : (
                <div key={key} className="w-10 h-10 mx-0.5"></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
