import * as Phaser from 'phaser';

export default class Dojo extends Phaser.Scene {
  constructor() {
    super({ key: 'rest' });
  }
  create() {
    const { config } = this.game;
    this.add.text(config.width / 2 - 50, 20, 'restaurant');

    //TILEMAP
    const map = this.make.tilemap({ key: 'rMap' });
    const rTiles = map.addTilesetImage('rTiles', 'rTiles');

    const bgLayer = (map.createLayer('Background', rTiles, 0, 0).scale = 2);
    const bgObjLayer = (map.createLayer('BgObjects', rTiles, 0, 0).scale = 2);
    const barrierLayer = map.createLayer('Barriers', rTiles, 0, 0);

    //PLAYER PLACEMENT AND HITBOX
    this.player = this.physics.add
      .sprite(60, config.height - 210, 'catPlayer', 7)
      .setScale(2);
    this.player.setSize(16, 20, false).setOffset(8, 10);

    //PLAYER AND LAYER DEPTH
    this.player.setDepth(10);
    barrierLayer.setDepth(20).scale = 2;

    //GRAVITY AND COLLISION
    this.player.body.setGravityY(300);
    this.player.body.collideWorldBounds = true;
    barrierLayer.setCollisionByProperty({ collide: true });
    this.physics.add.collider(this.player, barrierLayer);

    //PLAYER ANIMATIONS
    this.anims.create({
      key: 'player_left',
      frames: this.anims.generateFrameNumbers('catPlayer', {
        start: 3,
        end: 5,
      }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: 'player_right',
      frames: this.anims.generateFrameNumbers('catPlayer', {
        start: 6,
        end: 8,
      }),
      frameRate: 7,
      repeat: -1,
    });
  }

  update() {
    this.movePlayerManager();
  }

  movePlayerManager() {
    //KEY INPUTS
    let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    let keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    let spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    //PLAYER MOVEMENT
    if (keyA.isDown) {
      this.player.setVelocityX(-160);
      this.player.play('player_right', true).flipX = true;
    } else if (keyD.isDown) {
      this.player.setVelocityX(160);
      this.player.play('player_right', true).flipX = false;
    } else {
      this.player.setVelocityX(0);
      this.player.anims.stop();
    }

    //JUMP
    if (spacebar.isDown) {
      this.player.setVelocityY(-100);
    }
  }
}
