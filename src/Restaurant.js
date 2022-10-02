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

    //FOOD PLACEMENT
    this.applePie = this.add.image(100, 50, 'applePie');
    this.cheesecake = this.add.image(150, 50, 'cheesecake');
    this.chocoCake = this.add.image(200, 50, 'chocoCake');
    this.cookies = this.add.image(250, 50, 'cookies');
    this.icecream = this.add.image(300, 50, 'icecream');
    this.pudding = this.add.image(350, 50, 'pudding');
    this.sbCake = this.add.image(400, 50, 'sbCake');
    this.waffle = this.add.image(450, 50, 'waffle');
  }

  moveFood(food, speed) {
    const { config } = this.game;
    food.y += speed;

    if (food.y > config.height) {
      this.resetFood(food);
    }
  }

  resetFood(food) {
    const { config } = this.game;

    food.y = 0;
    const randomX = Phaser.Math.Between(60, config.width - 60);
    food.x = randomX;
  }

  update() {
    this.moveFood(this.applePie, 2.5);
    this.moveFood(this.cheesecake, 3.5);
    this.moveFood(this.chocoCake, 6);
    this.moveFood(this.cookies, 7);
    this.moveFood(this.icecream, 3.1);
    this.moveFood(this.pudding, 5.5);
    this.moveFood(this.sbCake, 4.5);
    this.moveFood(this.waffle, 5);

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
