import Phaser from 'phaser';
import Weapon from '../weapons';
import WeaponHud from '../hud/WeaponHud';

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

    this.maxHealth = 1000;
    this.health = this.maxHealth;
    this.isAlive = true;

    this.flashlight = {
     nearBeam: this.scene.lights.addLight(this.sprite.x, this.sprite.y, 150).setIntensity(1),
     midBeam: this.scene.lights.addLight(this.sprite.x, this.sprite.y, 200).setIntensity(.75),
     farBeam: this.scene.lights.addLight(this.sprite.x, this.sprite.y, 250).setIntensity(.5)
    }

    this.light = this.scene.lights.addLight(this.sprite.x, this.sprite.y, 100).setIntensity(.5);

    // ! DEMO: Pick a random weapon
    const weapons = [new Weapon.Gun(this.scene, this), new Weapon.Shotgun(this.scene, this)];
    this.weapon = weapons[Math.floor(Math.random() * weapons.length)];

    this.kills = 0;
    this.shotsFired = 0;
    this.accuracy = 0;    // #kills/#shotsFired

    this.healthDisplay = this.scene.add.graphics();

    this.hudFormat = (
      '%1: %2/%3'
    );
    this.weaponHud = new WeaponHud(this.scene);
    this.weaponHud.render(this.hudFormat, [
      this.weapon.name,
      this.weapon.clip,
      this.weapon.magSize
    ]);

    this.toggleFlashlight(0);
  }

  update() {
    if (!this.isAlive) return;

    this.addMovementInput();
    this.addRotationInput();
    this.updateFlashlight();
    this.drawHealthDisplay();
    this.weapon.update();

    this.light.x = this.sprite.x;
    this.light.y = this.sprite.y;

    // Active pointer down
    if (this.scene.input.activePointer.isDown) {
      this.weapon.fire(() => this.onShoot());
    } else {
      this.weapon.resetNextFire();
    }

    // Reload
    if (this.R.isDown) this.weapon.reload();
  }

  updateHud() {
    this.weaponHud.update(this.hudFormat, [
      this.weapon.name,
      this.weapon.clip,
      this.weapon.magSize
    ]);
  }

  drawHealthDisplay() {
    this.healthDisplay.clear();

    let startAngle = 30;
    let endAngle = -30;
    let cell = (startAngle - endAngle) / this.maxHealth;    // The "size" of one bullet in the bar
    let difference = this.maxHealth - this.health;          // Number of cells to remove

    let color = (this.health / this.maxHealth >= 0.33) ? 0x00b220 : 0xf23c13;

    this.healthDisplay.clear();
    this.healthDisplay
    .lineStyle(4, color, 1)
    .beginPath()
    .arc(this.sprite.x, this.sprite.y, 60, Phaser.Math.DegToRad(startAngle), Phaser.Math.DegToRad(endAngle + (cell * difference)), true)
    .strokePath()
    .setDepth(999);
  }

  onShoot() {
    const accuracy = Math.floor((this.kills / this.shotsFired) * 100) || 0;

    this.shotsFired++;
    this.scene.component.setState({ shotsFired: this.shotsFired, accuracy });

    this.updateHud();
  }

  // Custom incrementer for special weapons (correct accuracy)
  increaseShotsFired(count) {

    const accuracy = Math.floor((this.kills / this.shotsFired) * 100) || 0;

    this.shotsFired += count
    this.scene.component.setState({ shotsFired: this.shotsFired, accuracy });

  }

  onReload(isReloading) {
    this.sprite.setMaxVelocity((isReloading) ? 50 : 999);

    this.updateHud();
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

      // Remove graphics
      this.healthDisplay.clear();
      this.weapon.kill(); // Clears ammo display
    }
  }

  toggleFlashlight(on) {
    if (on) {
      this.flashlight.nearBeam.setIntensity(1);
      this.flashlight.midBeam.setIntensity(.75);
      this.flashlight.farBeam.setIntensity(.5);
    } else {
      this.flashlight.nearBeam.setIntensity(0);
      this.flashlight.midBeam.setIntensity(0);
      this.flashlight.farBeam.setIntensity(0);
    }
  }
}
