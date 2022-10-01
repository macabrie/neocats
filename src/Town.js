import * as Phaser from 'phaser';

export default class Town extends Phaser.Scene {
  constructor() {
    super({ key: 'town' });
  }
  preload() {
    this.load.image('floorTile', '../assets/Tileset/TilesetFloor.png');
    this.load.image('waterTile', '../assets/Tileset/TilesetWater.png');
    this.load.image('houseTile', '../assets/Tileset/TilesetHouse.png');
    this.load.image('natureTile', '../assets/Tileset/TilesetNature.png');
  }
  create() {
    const { config } = this.game;
    this.add.text(config.width / 2 - 50, 20, 'town');

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
  }
}
