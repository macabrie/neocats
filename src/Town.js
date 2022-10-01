import * as Phaser from 'phaser';

export default class Town extends Phaser.Scene {
  constructor() {
    super({ key: 'town' });
  }

  create() {
    const { config } = this.game;
    this.add.text(config.width / 2 - 50, 20, 'town');

    //TILEMAP
    const map = this.make.tilemap({ key: 'map' });
    const floorTile = map.addTilesetImage('TilesetFloor', 'floorTile');
    const waterTile = map.addTilesetImage('TilesetWater', 'waterTile');
    const houseTile = map.addTilesetImage('TilesetHouse', 'houseTile');
    const natureTile = map.addTilesetImage('TilesetNature', 'natureTile');

    const backgroundLayer = map.createLayer('Background', floorTile, 0, 0);
    const barrierLayer = map.createLayer(
      'Barriers',
      [waterTile, houseTile, natureTile],
      0,
      0
    );
    const walkableLayer = map.createLayer(
      'Walkable',
      [waterTile, natureTile],
      0,
      0
    );
    const OverheadLayer = map.createLayer(
      'Overhead',
      [houseTile, natureTile],
      0,
      0
    );

    //PLAYER PLACEMENT
    this.player = this.physics.add.sprite(
      30,
      config.height - 330,
      'tdPlayer',
      1
    );
    /* this.player.frame = 1; */
    this.player.body.collideWorldBounds = true;

    //PLAYER ANIMATIONS
    this.anims.create({
      key: 'player_down',
      frames: this.anims.generateFrameNumbers('tdPlayer', { start: 0, end: 2 }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: 'player_left',
      frames: this.anims.generateFrameNumbers('tdPlayer', { start: 3, end: 5 }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: 'player_right',
      frames: this.anims.generateFrameNumbers('tdPlayer', {
        start: 6,
        end: 8,
      }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: 'player_up',
      frames: this.anims.generateFrameNumbers('tdPlayer', {
        start: 9,
        end: 11,
      }),
      frameRate: 7,
      repeat: -1,
    });
  }

  update() {
    this.movePlayerManager();
  }

  movePlayerManager() {
    //WASD INPUTS
    let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    let keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    //PLAYER MOVEMENT
    this.player.body.setVelocity(0);

    if (keyS.isDown) {
      this.player.setVelocityY(160);
    } else if (keyW.isDown) {
      this.player.setVelocityY(-160);
    }

    if (keyA.isDown) {
      this.player.setVelocityX(-160);
    } else if (keyD.isDown) {
      this.player.setVelocityX(160);
    }

    //PLAYER ANIMATIONS
    if (keyS.isDown) {
      this.player.play('player_down', true);
    } else if (keyW.isDown) {
      this.player.play('player_up', true);
    } else if (keyA.isDown) {
      this.player.play('player_left', true);
    } else if (keyD.isDown) {
      this.player.play('player_right', true);
    } else {
      this.player.anims.stop();
    }
  }
}
