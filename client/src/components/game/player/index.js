import Phaser from 'phaser';

export default class Player {
  constructor(scene) {
    this.scene = scene;

    this.sprite = scene.physics.add
      .sprite(770, 430, 'player')
      .setScale(0.5, 0.5)
      .setCollideWorldBounds(true)
      .setPipeline('Light2D')

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

    this.walkSpeed = 100;
    this.sprintSpeed = 200;

    this.flashlight = this.scene.lights.addLight(this.sprite.x, this.sprite.y, 200);
  }

  update() {
    this.addMovementInput();
    this.addRotationInput();
    this.updateFlashlight();
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

    this.flashlight.x = clamp(locX, this.sprite.x - beamLength, this.sprite.x + beamLength)
    this.flashlight.y = clamp(locY, this.sprite.y - beamLength, this.sprite.y + beamLength)
  }
}
