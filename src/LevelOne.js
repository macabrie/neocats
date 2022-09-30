import * as Phaser from 'phaser';

const gameSettings = {
  playerSpeed: 200,
};

export default class LevelOne extends Phaser.Scene {
  constructor() {
    super({ key: 'levelOne' });
  }

  create() {
    const { config } = this.game;
    this.sky = this.add.image(0, 0, 'sky');
    this.sky.setScale(2);

    this.add.text(config.width / 2 - 50, 20, 'level one');

    //PLAYER PLACEMENT
    this.player = this.physics.add.sprite(30, config.height - 100, 'player');
    this.player.setScale(1.5);

    //PLAYER ANIMATIONS
    this.anims.create({
      key: 'player_idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: 'player_right',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 13 }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: 'player_jump',
      frames: this.anims.generateFrameNumbers('player', { start: 14, end: 28 }),
      frameRate: 7,
      repeat: -1,
    });

    this.player.body.setGravityY(600);
    this.player.body.collideWorldBounds = true;
    this.player.play('player_idle');

    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.movePlayerManager();
  }

  movePlayerManager() {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.play('player_right', true).flipX = true;
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(160);
      this.player.play('player_right', true).flipX = false;
    } else if (this.cursorKeys.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-130);
      this.player.play('player_jump', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('player_idle', true);
    }
  }
}
