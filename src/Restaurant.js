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
    this.player = this.physics.add.sprite(
      50,
      config.height - 200,
      'platPlayerIdle'
    );
    this.player.setScale(2);

    //PLAYER AND LAYER DEPTH
    this.player.setDepth(10);
    barrierLayer.setDepth(20).scale = 2;

    //GRAVITY AND COLLISION
    this.player.body.setGravityY(250);
    this.player.body.collideWorldBounds = true;
    barrierLayer.setCollisionByProperty({ collide: true });
    this.physics.add.collider(this.player, barrierLayer);
  }
}
