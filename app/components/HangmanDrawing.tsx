import React from "react";

interface HangmanDrawingProps {
  incorrectGuesses: number;
}

export default function HangmanDrawing({
  incorrectGuesses,
}: HangmanDrawingProps) {
  return (
    <div className="w-full max-w-[300px] h-[300px] mx-auto relative my-4">
      {/* Base - horizontal line at bottom */}
      <div className="absolute bottom-[50px] left-[40px] right-[40px] h-[2px] bg-black"></div>

      {/* Vertical pole */}
      <div className="absolute bottom-[50px] left-[140px] w-[2px] h-[250px] bg-black"></div>

      {/* Horizontal beam at top */}
      <div className="absolute top-[0px] left-[140px] w-[90px] h-[2px] bg-black"></div>

      {/* Vertical rope */}
      <div className="absolute top-[0px] left-[230px] w-[2px] h-[30px] bg-black"></div>

      {/* Head */}
      {incorrectGuesses > 0 && (
        <div className="absolute top-[30px] left-[230px] -translate-x-1/2 w-[35px] h-[35px] rounded-full border-[2px] border-black"></div>
      )}

      {/* Body */}
      {incorrectGuesses > 1 && (
        <div className="absolute top-[65px] left-[230px] -translate-x-1/2 w-[2px] h-[50px] bg-black"></div>
      )}

      {/* Left arm */}
      {incorrectGuesses > 2 && (
        <div className="absolute top-[80px] left-[229px] -translate-x-full w-[20px] h-[2px] bg-black -rotate-[45deg] origin-right"></div>
      )}

      {/* Right arm */}
      {incorrectGuesses > 3 && (
        <div className="absolute top-[80px] left-[231px] w-[20px] h-[2px] bg-black rotate-[45deg] origin-left"></div>
      )}

      {/* Left leg */}
      {incorrectGuesses > 4 && (
        <div className="absolute top-[115px] left-[229px] -translate-x-full w-[20px] h-[2px] bg-black -rotate-[45deg] origin-right"></div>
      )}

      {/* Right leg */}
      {incorrectGuesses > 5 && (
        <div className="absolute top-[115px] left-[231px] w-[20px] h-[2px] bg-black rotate-[45deg] origin-left"></div>
      )}
    </div>
  );
}
