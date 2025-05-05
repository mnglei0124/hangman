"use client";

import { useState, useEffect, useCallback } from "react";
import StatusBar from "./components/StatusBar";
import WordDisplay from "./components/WordDisplay";
import Keyboard from "./components/Keyboard";
import HintButton from "./components/HintButton";
import GameStatus from "./components/GameStatus";
import HowToPlay from "./components/HowToPlay";
import HangmanDrawing from "./components/HangmanDrawing";
import { GameStatus as GameStatusType } from "./types";
import { GAME_LEVELS } from "./data/wordlist";

const MAX_ATTEMPTS = 6;

export default function Home() {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(MAX_ATTEMPTS);
  const [word, setWord] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [gameStatus, setGameStatus] = useState<GameStatusType>("playing");
  const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);

  const getRandomWord = useCallback((level: number) => {
    // Find level or default to level 1 if not found
    const levelIndex = GAME_LEVELS.findIndex((gl) => gl.level === level);
    const gameLevel =
      levelIndex >= 0 ? GAME_LEVELS[levelIndex] : GAME_LEVELS[0];

    const randomIndex = Math.floor(Math.random() * gameLevel.words.length);
    setWord(gameLevel.words[randomIndex]);
    setCategory(gameLevel.category);
  }, []);

  const initializeGame = useCallback(() => {
    setAttempts(MAX_ATTEMPTS);
    setIncorrectGuesses(0);
    setGuessedLetters(new Set());
    setGameStatus("playing");
    getRandomWord(currentLevel);
  }, [currentLevel, getRandomWord]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const getHint = () => {
    if (attempts <= 1) return;

    const unguessedLetters = word
      .split("")
      .filter((letter) => !guessedLetters.has(letter));
    if (unguessedLetters.length === 0) return;

    const randomIndex = Math.floor(Math.random() * unguessedLetters.length);
    const hint = unguessedLetters[randomIndex];

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(hint);
    setGuessedLetters(newGuessedLetters);
    setAttempts((prev) => prev - 1);
  };

  const guessLetter = (letter: string) => {
    if (gameStatus !== "playing" || guessedLetters.has(letter)) return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!word.includes(letter)) {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      setIncorrectGuesses((prev) => prev + 1);

      if (newAttempts === 0) {
        setGameStatus("lost");
      }
    } else {
      // Check if all letters have been guessed (ignoring spaces)
      const allLettersGuessed = word
        .split("")
        .filter((char) => char !== " ") // Filter out spaces
        .every((letter) => newGuessedLetters.has(letter));

      if (allLettersGuessed) {
        const pointsEarned = word.length * 10 - incorrectGuesses * 5;
        setScore((prev) => prev + pointsEarned);
        setGameStatus("won");
      }
    }
  };

  const nextLevel = () => {
    // Check if we have more levels
    const nextLevelValue = currentLevel + 1;
    const hasNextLevel = GAME_LEVELS.some(
      (level) => level.level === nextLevelValue
    );

    if (hasNextLevel) {
      setCurrentLevel(nextLevelValue);
    } else {
      // Cycle back to level 1 but with increased difficulty (fewer attempts)
      setCurrentLevel(1);
    }

    setGameStatus("playing");
    initializeGame();
  };

  const restart = () => {
    setCurrentLevel(1);
    setScore(0);
    initializeGame();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f0e6ff] p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm md:max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-600 mb-4 sm:mb-6">
          Hangman
        </h1>

        <StatusBar
          level={currentLevel}
          score={score}
          attempts={attempts}
          levelText="Түвшин"
          scoreText="Оноо"
          attemptsText="Оролдлого"
        />

        <HangmanDrawing incorrectGuesses={incorrectGuesses} />

        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <WordDisplay
            word={word}
            guessedLetters={guessedLetters}
            category={category}
            categoryText="Ангилал"
          />

          {gameStatus === "playing" && (
            <HintButton
              onHint={getHint}
              disabled={attempts <= 1}
              hintText="Тусламж авах (-1 оролдлого)"
            />
          )}

          <GameStatus
            status={gameStatus}
            word={word}
            onNextLevel={nextLevel}
            onRestart={restart}
            wonText="Та хожлоо!"
            lostText="Тоглоом дууслаа! Үг:"
            nextLevelText="Дараагийн түвшин"
            playAgainText="Дахин тоглох"
          />
        </div>

        <Keyboard
          onLetterClick={guessLetter}
          guessedLetters={guessedLetters}
          gameStatus={gameStatus}
          keyboardText="Та гарын товчлуур ашиглан үсэг оруулж болно"
        />
      </div>

      <HowToPlay
        maxAttempts={MAX_ATTEMPTS}
        titleText="Хэрхэн тоглох вэ"
        instructionsText={[
          "Нуугдсан үгийг нэг үсгээр таа",
          "Буруу таасан үсэг бүр өлгөгдсөн хүний хэсгийг нэмдэг",
          "Танд өлгөгдсөн хүн бүрэн болохоос өмнө үгийг таах 6 оролдлого байна",
          "Үг бүрийг амжилттай таасанаар оноо авч, дараагийн түвшинд шилжинэ",
          "Оноо нь буруу таалтыг багасгах тусам илүү өндөр байна",
          "Тусламжийг ухаалгаар ашигла - энэ нь 1 оролдлого үнэтэй!",
          "Илүү хурдан оруулахын тулд гарын товчлуураа ашиглаарай",
          "Бүх түвшинг дуусгаж, тоглоомыг эзэмшээрэй!",
        ]}
      />
    </main>
  );
}
