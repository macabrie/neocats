import * as Phaser from 'phaser';

export default class Dojo extends Phaser.Scene {
  constructor() {
    super({ key: 'rest' });
  }
  create() {
    const { config } = this.game;

    //LEVEL AND SCORE TEXT
    this.level = this.add.text(config.width / 2 - 170, 60, 'collect the food!');
    this.score = 0;
    this.scoreText = this.add.text(
      config.width - 170,
      20,
      `score: ${this.score}`
    );
    this.quitText = this.add.text(config.width - 170, 100, 'press q to quit');

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

    //LAYER DEPTH
    this.player.setDepth(10);
    barrierLayer.setDepth(20).scale = 2;
    this.level.setDepth(30);
    this.scoreText.setDepth(30);
    this.quitText.setDepth(30);

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
    this.applePie = this.physics.add.sprite(100, 450, 'applePie');
    this.cheesecake = this.physics.add.sprite(150, 50, 'cheesecake');
    this.chocoCake = this.physics.add.sprite(200, 50, 'chocoCake');
    this.cookies = this.physics.add.sprite(250, 50, 'cookies');
    this.icecream = this.physics.add.sprite(300, 50, 'icecream');
    this.pudding = this.physics.add.sprite(350, 50, 'pudding');
    this.sbCake = this.physics.add.sprite(400, 50, 'sbCake');
    this.waffle = this.physics.add.sprite(450, 50, 'waffle');

    this.physics.add.overlap(
      this.player,
      [
        this.applePie,
        this.cheesecake,
        this.chocoCake,
        this.cookies,
        this.icecream,
        this.pudding,
        this.sbCake,
        this.waffle,
      ],
      this.collectFood,
      null,
      this
    );
  }

  collectFood(player, food) {
    const { config } = this.game;
    food.disableBody(true, true);

    if (!food.active) {
      food.enableBody(
        true,
        Phaser.Math.Between(60, config.width - 60),
        0,
        true,
        true
      );
    }

    this.score += 10;
    this.scoreText.text = 'score: ' + this.score;
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

    //QUIT OPTION
    let keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    if (keyQ.isDown) {
      this.scene.start('town');
    }
  }

  movePlayerManager() {
    //KEY INPUTS
    let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
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
      this.player.setVelocityY(-150);
    }
  }
}
