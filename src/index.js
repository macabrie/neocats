import * as Phaser from 'phaser';
import StartGame from './Start';
import Town from './Town';
import Restaurant from './Restaurant';
import Dojo from './Dojo';

const config = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  scene: [StartGame, Town, Restaurant, Dojo],
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
