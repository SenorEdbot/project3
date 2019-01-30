import Phaser from 'phaser';
import BulletGroup from './Bullet';
import AudioManager from '../audio/AudioManager'

export default class Gun {
  constructor(scene, owner) {

    // Phaser scene
    this.scene = scene;
    this.audio = new AudioManager(this.scene)

    // Weapon owner (player)
    this.owner = owner;
    this.ownerSprite = owner.sprite;

    this.name = 'MG';

    // Fire rate
    this.fireRate = 150; // lower = faster firing
    this.nextFire = 0;
    this.velocity = 2500;

    // Reload
    this.magSize = 30;
    this.clip = this.magSize;
    this.reloadTime = 750;
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
    this.ammoDisplay = this.scene.add.graphics();

    //Effects
    this.cameraShakeIntensity = 0.002;
  }

  fire(callback) {
    if (this.scene.time.now > this.nextFire && this.clip > 0 && !this.isReloading) {

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
      camera.shake(100, this.cameraShakeIntensity);
      this.audio.playGunshot('pistolFire', 0.5)

      if (callback) callback();

    } else if (this.clip === 0 && !this.isReloading) {

      // Auto reload if holding fire button down
      this.reload();
    }
  }

  reload() {
    if (!this.isReloading) {
      this.startReloading();
      if(this.onReload) this.onReload()
      setTimeout(() => this.stopReloading(), this.reloadTime);
    }
  }

  startReloading() {
    this.isReloading = true;
    this.audio.playReload('pistolReload', 0.5)

    let tick = 0;
    let intervalLen = 10; // lower = smoother anim
    let deg = 360 / (this.reloadTime / intervalLen); // determine segments

    this.reloadInterval = setInterval(() => {
      // Clear the graphics so they can be re-drawn
      this.graphics.clear();
      this.graphics
        .lineStyle(4, 0x00b220, 1)
        .beginPath()
        .arc(this.owner.sprite.x, this.owner.sprite.y, 25, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(tick * deg), true)
        .strokePath()
        .setDepth(-1);

      tick++;
    }, intervalLen);

    this.owner.onReload(true);
  }

  stopReloading() {
    this.clip = this.magSize;
    this.isReloading = false;
    clearInterval(this.reloadInterval);
    this.graphics.clear();

    this.owner.onReload(false);
  }

  onReload() {

    this.audio.playReload('pistolReload', 1)

  }

  resetNextFire() {
    // This lets players ignore fire-rate and spam the fire button.
    this.nextFire = this.scene.time.now;
  }

  drawAmmoDisplay() {
    let startAngle = 210;
    let endAngle = 150;
    let cell = (startAngle - endAngle) / this.magSize;  // The "size" of one bullet in the bar
    let difference = this.magSize - this.clip;          // Number of cells to remove

    let color = (this.clip / this.magSize >= 0.33) ? 0x00b220 : 0xf23c13;

    this.ammoDisplay.clear();
    this.ammoDisplay
    .lineStyle(4, color, 1)
    .beginPath()
    .arc(this.owner.sprite.x, this.owner.sprite.y, 60, Phaser.Math.DegToRad(startAngle - (cell * difference)), Phaser.Math.DegToRad(endAngle), true)
    .strokePath()
    .setDepth(999);
  }

  update() {
    this.drawAmmoDisplay();
  }

  kill() {
    this.ammoDisplay.clear();
  }
}