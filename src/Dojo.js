import * as Phaser from 'phaser';

const gameSettings = {
  playerSpeed: 200,
};

export default class Dojo extends Phaser.Scene {
  constructor() {
    super({ key: 'dojo' });
  }

  create() {
    const { config } = this.game;

    this.add.text(config.width / 2 - 50, 20, 'dojo');

    //BACKGROUND
    this.sky = this.add.image(0, 0, 'sky');
    this.sky.setScale(2);

    //PLATFORMS
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

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
      frames: this.anims.generateFrameNumbers('player', { start: 14, end: 23 }),
      frameRate: 7,
      repeat: 0,
    });

    //GRAVITY AND COLLISION
    this.player.body.setGravityY(250);
    this.player.body.collideWorldBounds = true;
    this.physics.add.collider(this.player, this.platforms);
  }

  update() {
    this.movePlayerManager();
  }

  movePlayerManager() {
    let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    let keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    let spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    //LEFT, RIGHT, STOP
    if (keyA.isDown) {
      this.player.setVelocityX(-160);
      this.player.play('player_right', true).flipX = true;
    } else if (keyD.isDown) {
      this.player.setVelocityX(160);
      this.player.play('player_right', true).flipX = false;
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('player_idle', true);
    }

    //JUMP
    if (spacebar.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-300);
      this.player.play('player_jump');
    }
  }
}
