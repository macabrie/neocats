import * as Phaser from 'phaser';
import StartGame from './Start';
import LevelOne from './LevelOne';

const config = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  scene: [StartGame, LevelOne],
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
