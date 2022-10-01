import * as Phaser from 'phaser';

export default class StartGame extends Phaser.Scene {
  constructor() {
    super({ key: 'startGame' });
  }

  preload() {
    this.load.image('sky', '../assets/sky.png');
    this.load.image('ground', '../assets/platform.png');
    this.load.image('diamond', '../assets/diamond.png');

    //PLATFORM PLAYER
    this.load.spritesheet('player', '../assets/adventurer.png', {
      frameWidth: 50,
      frameHeight: 37,
    });

    //TOPDOWN PLAYER
    this.load.spritesheet('tdPlayer', '../assets/Character/topdownCat.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    //TOWN TILEMAP
    this.load.image('floorTile', '../assets/Tileset/TilesetFloor.png');
    this.load.image('waterTile', '../assets/Tileset/TilesetWater.png');
    this.load.image('houseTile', '../assets/Tileset/TilesetHouse.png');
    this.load.image('natureTile', '../assets/Tileset/TilesetNature.png');
    this.load.tilemapTiledJSON('map', '../assets/Tileset/TilesetMap.tmj');
  }

  create() {
    this.sky = this.add.image(100, 0, 'sky');
    this.sky.setScale(2);

    this.add.text(
      this.game.config.width / 2 - 50,
      this.game.config.height / 2,
      'loading'
    );

    this.scene.start('town');
  }
}
