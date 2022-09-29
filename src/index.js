import * as Phaser from 'phaser';
import StartGame from './Start';
import LevelOne from './LevelOne';

const config = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  scene: [StartGame, LevelOne],
};

const game = new Phaser.Game(config);
