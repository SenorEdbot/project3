import Gun from './Gun';

export default class Shotgun extends Gun {
  constructor(scene, owner) {
    super(scene, owner);

    this.weaponName = 'shotgun';
    this.fireRate = 1000;
    this.magSize = 8;
    this.clip = 8;
    this.reloadTime = 3000;
    this.velocity = 1000;
    this.cameraShakeIntensity = .004;

    // Custom attributes
    this.shotCount = 5;
    this.spread = 75;
  }

  fire(callback) {
    if (this.scene.time.now > this.nextFire && this.clip > 0 && !this.isReloading) {

      let camera = this.scene.cameras.main;
      let pointer = this.scene.input.activePointer;

      // Shoot (n) bullets based on shotCount
      for (let i = 0; i < this.shotCount; i++) {
        // Positioning data to send to bullet group
        const positioning = {
          locationX: this.owner.sprite.x,
          locationY: this.owner.sprite.y,
          rotation: this.owner.sprite.rotation,
          vectorX: pointer.x + camera.scrollX + (Math.random() * (this.spread - -this.spread) + -this.spread),
          vectorY: pointer.y + camera.scrollY + (Math.random() * (this.spread - -this.spread) + -this.spread),
          velocity: this.velocity,
          offsetX: this.bulletSpwanOffsetX,
          offsetY: this.bulletSpwanOffsetY,
          scale: this.bulletScale
        }

      this.bullets.shoot(positioning);

      }

      this.nextFire = this.scene.time.now + this.fireRate; // Limit fire-rate
      this.clip--;
      this.graphics.clear();

      // Effects
      camera.shake(250, this.cameraShakeIntensity);

      if (callback) callback();

    } else if (this.clip === 0 && !this.isReloading) {

      // Auto reload if holding fire button down
      this.reload();
    }
  }
}
