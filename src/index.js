import * as Phaser from 'phaser';
import StartGame from './Start';
import LevelOne from './LevelOne';
import Town from './Town';

const config = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  scene: [StartGame, LevelOne, Town],
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

window.onload = function () {
  let game = new Phaser.Game(config);
};
