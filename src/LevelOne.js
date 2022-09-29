import * as Phaser from 'phaser';

export default class LevelOne extends Phaser.Scene {
  constructor() {
    super({ key: 'levelOne' });
  }

  preload() {
    this.load.image('sky', '../assets/sky.png');
    this.load.image('ground', '../assets/platform.png');
    this.load.image('diamond', '../assets/diamond.png');
    /* this.load.spritesheet('woof', '../assets/woof.png', 32, 32); */
  }

  create() {
    this.add.image(0, 0, 'sky');
    this.add.text(20, 20, 'level one');
  }
}
