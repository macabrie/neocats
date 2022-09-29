import * as Phaser from 'phaser';

export default class StartGame extends Phaser.Scene {
  constructor() {
    super({ key: 'startGame' });
  }

  preload() {
    this.load.image('sky', '../assets/sky.png');
  }

  create() {
    this.add.sprite(0, 0, 'sky');
    this.add.text(20, 20, 'loading');
    this.scene.start('levelOne');
  }
}
