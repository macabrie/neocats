import * as Phaser from 'phaser';

export default class StartGame extends Phaser.Scene {
  constructor() {
    super({ key: 'startGame' });
  }

  preload() {
    //TOPDOWN PLAYER
    this.load.spritesheet('catPlayer', '../assets/Character/topdownCat.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

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

    //FOOD ASSETS
    this.load.image('applePie', '../assets/RestaurantAssets/Food/applePie.png');
    this.load.image(
      'cheesecake',
      '../assets/RestaurantAssets/Food/cheesecake.png'
    );
    this.load.image(
      'chocoCake',
      '../assets/RestaurantAssets/Food/chocoCake.png'
    );
    this.load.image('cookies', '../assets/RestaurantAssets/Food/cookies.png');
    this.load.image('icecream', '../assets/RestaurantAssets/Food/icecream.png');
    this.load.image('pudding', '../assets/RestaurantAssets/Food/pudding.png');
    this.load.image('sbCake', '../assets/RestaurantAssets/Food/sbCake.png');
    this.load.image('waffle', '../assets/RestaurantAssets/Food/waffle.png');
  }

  create() {
    this.sky = this.add.image(100, 0, 'sky');
    this.sky.setScale(2);

    this.add.text(
      this.game.config.width / 2 - 50,
      this.game.config.height / 2,
      'loading'
    );

    this.scene.start('dojo');
  }
}
