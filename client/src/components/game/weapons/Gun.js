import Phaser from 'phaser';
import BulletGroup from './Bullet';

export default class Gun {
  constructor(scene, owner) {

    // Phaser scene
    this.scene = scene;

    // Weapon owner (player)
    this.owner = owner;
    this.ownerSprite = owner.sprite;

    // Fire rate
    this.fireRate = 100; // lower = faster firing
    this.nextFire = 0;
    this.velocity = 2500;

    // Reload
    this.clip = 30;
    this.reloadTime = 2000;
    this.isReloading = false;
    this.reloadInterval = null;

    // Display
    this.bulletSpwanOffsetX = -50;
    this.bulletSpwanOffsetY = 0;
    this.bulletScale = 0.5;

    // Bullets
    this.bullets = new BulletGroup(scene, this.owner);

    // Graphics
    this.graphics = this.scene.add.graphics();
  }

  fire(callback) {
    if (this.scene.time.now > this.nextFire && this.clip > 0) {

      let camera = this.scene.cameras.main;
      let pointer = this.scene.input.activePointer;

      // Positioning data to send to bullet group
      const positioning = {
        locationX: this.owner.sprite.x,
        locationY: this.owner.sprite.y,
        rotation: this.owner.sprite.rotation,
        vectorX: pointer.x + camera.scrollX,
        vectorY: pointer.y + camera.scrollY,
        velocity: this.velocity,
        offsetX: this.bulletSpwanOffsetX,
        offsetY: this.bulletSpwanOffsetY,
        scale: this.bulletScale
      }

      this.bullets.shoot(positioning);

      this.nextFire = this.scene.time.now + this.fireRate; // Limit fire-rate
      this.clip--;
      this.graphics.clear();

      // Effects
      camera.shake(100, 0.002);

      if (callback) callback();

    } else if (this.clip === 0 && !this.isReloading) {

      // Start reloading
      this.isReloading = true;
      this.reload();

      // Start reload timeout
      setTimeout(() => this.stopReloading(), this.reloadTime)
    }
  }

  reload() {
    let tick = 0;
    let intervalLen = 10; // lower = smoother anim
    let deg = 360 / (this.reloadTime / intervalLen); // determine segments

    this.reloadInterval = setInterval(() => {
      // Clear the graphics so they can be re-drawn
      this.graphics.clear();
      this.graphics
        .lineStyle(4, 0x00b220, 1)
        .beginPath()
        .arc(this.owner.sprite.x, this.owner.sprite.y, 33, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(tick * deg), true)
        .strokePath()
        .setDepth(-1);

      tick++;
    }, intervalLen);
  }

  stopReloading() {
    this.clip = 30;
    this.isReloading = false;
    clearInterval(this.reloadInterval);
    this.graphics.clear();
  }

  resetNextFire() {
    // This lets players ignore fire-rate and spam the fire button.
    this.nextFire = this.scene.time.now;
  }
}