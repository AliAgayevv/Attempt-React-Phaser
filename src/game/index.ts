import Phaser from "phaser";
import { config } from "./config";
import GameScene from "./scenes/GameScene";

export const initializeGame = (parent: string | HTMLElement) => {
  return new Phaser.Game({
    ...config,
    parent,
    scene: [GameScene],
  });
};
