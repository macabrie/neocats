import * as Phaser from 'phaser';

export default class LevelOne extends Phaser.Scene {
  constructor() {
    super({ key: 'levelOne' });
  }

  create() {
    const { config } = this.game;
    this.sky = this.add.image(0, 0, 'sky');
    this.sky.setScale(2);

    this.add.text(config.width / 2 - 50, 20, 'level one');

    this.diamond1 = this.add.image(config.width / 2 - 100, 0, 'diamond');
    this.diamond2 = this.add.image(config.width / 2, 0, 'diamond');
    this.diamond3 = this.add.image(config.width / 2 + 100, 0, 'diamond');

    this.player = this.add.sprite(30, config.height - 50, 'player');
    this.player.setScale(1.5);

    this.anims.create({
      key: 'player_idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1,
    });

    this.player.play('player_idle');
  }

  moveDiamond(diamond, speed) {
    const { config } = this.game;
    diamond.y += speed;
    if (diamond.y > config.height) {
      this.resetDiaPos(diamond);
    }
  }

  resetDiaPos(diamond) {
    const { config } = this.game;
    diamond.y = 0;
    const randomX = Phaser.Math.Between(10, config.width - 10);
    diamond.x = randomX;
  }

  update() {
    this.moveDiamond(this.diamond1, 2);
    this.moveDiamond(this.diamond2, 3);
    this.moveDiamond(this.diamond3, 4);
  }
}
