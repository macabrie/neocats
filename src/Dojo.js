import * as Phaser from 'phaser';

export default class Dojo extends Phaser.Scene {
  constructor() {
    super({ key: 'dojo' });
  }

  create() {
    const { config } = this.game;

    this.add.text(config.width / 2 - 55, config.height / 2, 'coming soon!');
    this.add.text(
      config.width / 2 - 70,
      config.height / 2 + 20,
      'press q to quit'
    );
  }

  update() {
    //QUIT OPTION
    let keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    if (keyQ.isDown) {
      this.scene.start('town');
    }
  }

  /* movePlayerManager() {
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
  } */
}
