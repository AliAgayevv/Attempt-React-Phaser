import { useEffect } from "react";
import { initializeGame } from "../game";

export const useGame = (containerRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    let game: Phaser.Game | null = null;

    if (containerRef.current) {
      game = initializeGame(containerRef.current);
    }

    return () => {
      game?.destroy(true);
    };
  }, [containerRef]);
};
