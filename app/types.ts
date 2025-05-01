export type GameStatus = "playing" | "won" | "lost";

export type GameLevel = {
  level: number;
  words: string[];
  category: string;
};
