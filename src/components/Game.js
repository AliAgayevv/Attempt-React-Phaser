import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import Phaser from "phaser";
import SnakeScene from "../game/SnakeScene";
const Game = ({ onGameOver }) => {
    const gameRef = useRef(null);
    const game = useRef(null);
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
    return _jsx("div", { ref: gameRef });
};
export default Game;
