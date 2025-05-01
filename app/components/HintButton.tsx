import React from "react";

interface HintButtonProps {
  onHint: () => void;
  disabled: boolean;
  hintText?: string;
}

export default function HintButton({
  onHint,
  disabled,
  hintText = "Get Hint (-1 attempts)",
}: HintButtonProps) {
  return (
    <button
      onClick={onHint}
      disabled={disabled}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 sm:px-6 py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-4 text-sm sm:text-base"
    >
      {hintText}
    </button>
  );
}
