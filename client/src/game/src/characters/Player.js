import Phaser from '../phaser';
import InputBindings from '../input/InputBindings';
import Gun from '../weapons/Gun';

export default class Player {
  constructor(game) {
    this.game = game;
    this.input = new InputBindings(game);
    this.speed = 150;

    // STATS:
    this.shotsFired = 0;
    this.shotsHit = 0;
    this.enemiesKilled = 0;

    this.sprite = game.physics.add.sprite(0, 0, 'player')
      .setMaxVelocity(500)
      .setFriction(400, 200)
      .setCollideWorldBounds(true);

    this.gun = new Gun(game, this, 200);
  }

  update() {
    this.addMovementInput();
    this.addRotationInput();

    if (this.input.pointer.isDown) {

      this.gun.fire();

    }
  }

  addRotationInput() {
    this.sprite.rotation = Phaser.Math.Angle.Between(
      this.sprite.x,
      this.sprite.y,
      this.input.pointer.x + this.game.cameras.main.scrollX,
      this.input.pointer.y + this.game.cameras.main.scrollY
    );
  }

  sprint() {
    if (this.input.SHIFT.isDown) {
      if (this.speed < 150) {
        this.speed = 150;
      }
    } else {
      this.speed = 75;
    }
  }

  addMovementInput() {

    // Check if sprinting:
    this.sprint();

    // TODO: use switch instead of if/else?

    // UP && LEFT
    if (this.input.W.isDown && this.input.A.isDown) {
      this.sprite.setVelocity(-this.speed, -this.speed);
      this.sprite.rotation = (3.14 / 360) * 2 * 210;
    }
    // UP && RIGHT
    else if (this.input.W.isDown && this.input.D.isDown) {
      this.sprite.setVelocity(this.speed, -this.speed);
      this.sprite.rotation = (3.14 / 360) * 2 * -45;
    }
    // DOWN && LEFT
    else if (this.input.S.isDown && this.input.A.isDown) {
      this.sprite.setVelocity(-this.speed, this.speed);
      this.sprite.rotation = (3.14 / 360) * 2 * 120;
    }
    // DOWN && RIGHT
    else if (this.input.S.isDown && this.input.D.isDown) {
      this.sprite.setVelocity(this.speed, this.speed);
      this.sprite.rotation = (3.14 / 360) * 2 * 45;
    }
    // UP
    else if (this.input.W.isDown) {
      this.sprite.setVelocity(0, -this.speed);
      this.sprite.rotation = (3.14 / 360) * 2 * -90;
    }
    // DOWN
    else if (this.input.S.isDown) {
      this.sprite.setVelocity(0, this.speed);
      this.sprite.rotation = 3.14 / 2;
    }
    // LEFT
    else if (this.input.A.isDown) {
      this.sprite.setVelocity(-this.speed, 0);
      this.sprite.rotation = -3.14;
    }
    // RIGHT
    else if (this.input.D.isDown) {
      this.sprite.setVelocity(this.speed, 0);
      this.sprite.rotation = 0;
    } else {
      this.sprite.setVelocity(0);
    }
  }
}
