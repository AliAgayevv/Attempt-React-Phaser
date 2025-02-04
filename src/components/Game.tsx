import type React from "react";
import { useEffect, useRef } from "react";
import Phaser from "phaser";
import SnakeScene from "../game/SnakeScene";

interface GameProps {
  onGameOver: (score: number) => void;
}

const Game: React.FC<GameProps> = ({ onGameOver }) => {
  const gameRef = useRef<HTMLDivElement>(null);
  const game = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current && !game.current) {
      game.current = new Phaser.Game({
        type: Phaser.AUTO,
        width: screen.width / 1.1,
        height: screen.height / 1.4,
        parent: gameRef.current,
        scene: [SnakeScene],
      });

      game.current.events.on("gameOver", onGameOver);
    }

    return () => {
      game.current?.destroy(true);
      game.current = null;
    };
  }, [onGameOver]);

  return <div ref={gameRef} />;
};

export default Game;
