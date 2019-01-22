import Phaser from 'phaser';
import Gun from '../weapons/Gun';

export default class Player {
  constructor(scene, username) {
    this.scene = scene;
    this.username = username;

    this.sprite = scene.physics.add
    .sprite(1128, 483, 'player')
    .setCollideWorldBounds(true)
    .setPipeline('Light2D');

    this.sprite.body
    .setSize(44, 44, 0.5);

    const inputBindings = this.scene.input.keyboard;
    const keyCodes = Phaser.Input.Keyboard.KeyCodes;
    this.W = inputBindings.addKey(keyCodes.W);
    this.A = inputBindings.addKey(keyCodes.A);
    this.S = inputBindings.addKey(keyCodes.S);
    this.D = inputBindings.addKey(keyCodes.D);
    this.R = inputBindings.addKey(keyCodes.R);
    this.SHIFT = inputBindings.addKey(keyCodes.SHIFT);

    this.movementScaleX = 0;
    this.movementScaleY = 0;
    this.walkSpeed = 120;
    this.sprintSpeed = 240;

    this.health = 1000;
    this.isAlive = true;

    this.flashlight = {
     nearBeam: this.scene.lights.addLight(this.sprite.x, this.sprite.y, 150).setIntensity(1),
     midBeam: this.scene.lights.addLight(this.sprite.x, this.sprite.y, 200).setIntensity(.75),
     farBeam: this.scene.lights.addLight(this.sprite.x, this.sprite.y, 250).setIntensity(.5)
    }

    this.weapon = new Gun(this.scene, this);

    this.kills = 0;
    this.shotsFired = 0;
  }

  update() {
    if (!this.isAlive) return;

    this.addMovementInput();
    this.addRotationInput();
    this.updateFlashlight();

    if (this.scene.input.activePointer.isDown) {
      this.weapon.fire(() => this.onShoot());
    } else {
      this.weapon.resetNextFire();
    }
  }

  onShoot() {
    this.shotsFired++;
    this.scene.component.setState({ shotsFired: this.shotsFired });
  }

  addMovementInput() {
    // Y-axis
    if (this.W.isDown) {
      this.movementScaleY = -1;
    } else if (this.S.isDown) {
      this.movementScaleY = 1;
    } else {
      this.movementScaleY = 0;
    }

    // X-axis
    if (this.A.isDown) {
      this.movementScaleX = -1;
    } else if (this.D.isDown) {
      this.movementScaleX = 1;
    } else {
      this.movementScaleX = 0;
    }

    // Sprint
    let speed = (this.SHIFT.isDown) ? this.sprintSpeed : this.walkSpeed;


    let velocityX = speed * this.movementScaleX;
    let velocityY = speed * this.movementScaleY;
    this.sprite.setVelocity(velocityX, velocityY);
  }

  addRotationInput() {
    const { x, y } = this.scene.input.activePointer;
    const { scrollX, scrollY } = this.scene.cameras.main;

    this.sprite.rotation = Phaser.Math.Angle.Between(
      this.sprite.x,
      this.sprite.y,
      x + scrollX,
      y + scrollY
    )
  }

  updateFlashlight() {
    const { x, y } = this.scene.input.activePointer;
    const { scrollX, scrollY } = this.scene.cameras.main;
    let locX = this.sprite.x - (this.sprite.x - (x + scrollX));
    let locY = this.sprite.y - (this.sprite.y - (y + scrollY));
    let beamLength = 80;

    let clamp = (num, min, max) => Math.max(min, Math.min(num, max));

    this.flashlight.nearBeam.x = clamp(locX, this.sprite.x - beamLength, this.sprite.x + beamLength)
    this.flashlight.nearBeam.y = clamp(locY, this.sprite.y - beamLength, this.sprite.y + beamLength)
    this.flashlight.midBeam.x = clamp(locX, this.sprite.x - (beamLength + 50), this.sprite.x + (beamLength + 50))
    this.flashlight.midBeam.y = clamp(locY, this.sprite.y - (beamLength + 50), this.sprite.y + (beamLength + 50))
    this.flashlight.farBeam.x = clamp(locX, this.sprite.x - (beamLength + 100), this.sprite.x + (beamLength + 100))
    this.flashlight.farBeam.y = clamp(locY, this.sprite.y - (beamLength + 100), this.sprite.y + (beamLength + 100))
  }

  shoot() {
    this.weapon.fire();
  }

  damage() {
    if (this.health > 0) {
      this.scene.cameras.main.flash(1000, 100, 0, 0, 0)
      this.health--;
    } else {
      this.kill();
    }
  }

  kill() {
    if (this.isAlive) {
      this.isAlive = false;
      this.sprite.setVelocity(0);
      this.flashlight.nearBeam.setColor(0xff0000);
      this.flashlight.midBeam.setColor(0xff0000);
      this.flashlight.farBeam.setColor(0xff0000);

      // Save the player's stats
      this.scene.component.save();
    }
  }
}
