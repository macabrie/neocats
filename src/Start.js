import * as Phaser from 'phaser';

export default class StartGame extends Phaser.Scene {
  constructor() {
    super({ key: 'startGame' });
  }

  preload() {
    //TOPDOWN PLAYER
    this.load.spritesheet('tdPlayer', '../assets/Character/topdownCat.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    //PLATFORM PLAYER
    this.load.spritesheet(
      'platPlayerIdle',
      '../assets/Character/platformCatIdle.png',
      {
        frameWidth: 16,
        frameHeight: 16,
      }
    );
    this.load.spritesheet(
      'platPlayerRun',
      '../assets/Character/platformCatRun.png',
      {
        frameWidth: 16,
        frameHeight: 16,
      }
    );
    this.load.spritesheet(
      'platPlayerJump',
      '../assets/Character/platformCatJump.png',
      {
        frameWidth: 16,
        frameHeight: 16,
      }
    );

    //TOWN TILEMAP
    this.load.image('floorTile', '../assets/TownAssets/TilesetFloor.png');
    this.load.image('waterTile', '../assets/TownAssets/TilesetWater.png');
    this.load.image('houseTile', '../assets/TownAssets/TilesetHouse.png');
    this.load.image('natureTile', '../assets/TownAssets/TilesetNature.png');
    this.load.tilemapTiledJSON('map', '../assets/TownAssets/TilesetMap.tmj');

    //RESTAURANT TILEMAP
    this.load.image('rTiles', '../assets/RestaurantAssets/rTiles.png');
    this.load.tilemapTiledJSON(
      'rMap',
      '../assets/RestaurantAssets/RestaurantMap.tmj'
    );
  }

  create() {
    this.sky = this.add.image(100, 0, 'sky');
    this.sky.setScale(2);

    this.add.text(
      this.game.config.width / 2 - 50,
      this.game.config.height / 2,
      'loading'
    );

    this.scene.start('rest');
  }
}
