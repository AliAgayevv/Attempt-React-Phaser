import { useEffect, useRef } from "react";
// import { config } from "../game/config";
import { initializeGame } from "../game";

export const GameCanvas = () => {
  const gameContainer = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameContainer.current && !gameRef.current) {
      gameRef.current = initializeGame(gameContainer.current);
    }

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <div
      ref={gameContainer}
      id="game-container"
      style={{ width: "100%", height: "100vh" }}
    />
  );
};
