import type React from "react";
import { useState } from "react";
import Game from "./components/Game";

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
  };

  const handleGameOver = (finalScore: number) => {
    setGameOver(true);
    setScore(finalScore);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    const scene = (window as any).game.scene.getScene("SnakeScene") as any;
    if (isPaused) {
      scene.resumeGame();
    } else {
      scene.pauseGame();
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-blue-300 w-screen p-4"
      id="howToPlayContainer"
    >
      {!gameStarted && (
        <div className="flex justify-center items-center flex-col gap-6 md:gap-10 w-full">
          <div
            id="howToPlay"
            className="w-full max-w-[90vw] h-auto md:w-[50vw] md:h-[50vh] bg-blue-900 rounded-2xl p-4 md:p-6"
          >
            <h1 className="text-4xl md:text-6xl text-center pt-2 md:pt-4 underline underline-offset-[8px] md:underline-offset-[16px] text-yellow-500">
              How to play?
            </h1>
            <ul className="list-disc ml-6 md:ml-10 mt-6 md:mt-10 text-lg md:text-2xl text-yellow-500">
              <li>Use arrow keys to move the snake</li>
              <li>Eat the red apples to grow</li>
              <li>Eat the golden apple to score more (+5) points</li>
              <li>Press space to stop/continue the game</li>
            </ul>
          </div>
          <button
            className="text-2xl md:text-4xl p-3 md:p-4 text-yellow-300 bg-blue-500 rounded-xl hover:bg-blue-600 transition duration-300"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        </div>
      )}
      {gameStarted && (
        <>
          <Game onGameOver={handleGameOver} />
        </>
      )}
      {gameOver && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity">
          <div className="p-8 bg-white rounded shadow-lg w-[50%] h-[50%]">
            <h2 className="text-center text-5xl md:text-6xl font-bold mb-4">
              Game Over
            </h2>
            <p className="mb-4 text-4xl md:text-5xl">
              Your score: <span className=" underline">{score}</span>
            </p>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 text-2xl text-white bg-blue-500 rounded hover:bg-blue-600 w-[70%] md:w-[50%] h-[10%]"
                onClick={handleStartGame}
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
