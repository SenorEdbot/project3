// TODO: refactor

import Phaser from 'phaser';
import Zombie from '../enemies/zombie';

export default class Purge {
  constructor(scene) {
    this.scene = scene;
    this.started = false;
    this.canUpdate = false;
    this.difficulty = Math.floor(Math.random() * (8 - 4) + 4);
    this.enemies = [];
    this.trigger = { x: 1443, y: 496 };
    this.triggerRange = 150;
    this.canTrigger = false;
    this.lightsOn = false;

    this.graphics = this.scene.add.graphics();
    this.graphics
      .lineStyle(4, 0x00b220, 1)
      .beginPath()
      .arc(this.trigger.x, this.trigger.y, this.triggerRange, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), true)
      .strokePath()
      .setDepth(-1);

    this.triggerText = this.scene.add
      .text(this.scene.cameras.main.centerX - 50, 16, '', {fill: '#00b220', fontFamily: 'monospace',})
      .setScrollFactor(0, 0)
      .setDepth(999);

    this.player = this.scene.player;

    // Trigger game start
    this.scene.input.keyboard.on('keydown', event => {
      if (event.code === 'KeyE' && !this.started && this.canTrigger) this.start();

      this.flashLights = null;
    });
  }

  start() {
    console.log('Starting game mode [Purge]');

    this.started = true;
    this.graphics.clear();

    setTimeout(() => {
      for (let i = 0; i < this.difficulty * 100; i++) {
        let zombie = new Zombie(this.scene);
        this.enemies.push(zombie)
        this.scene.zombies.add(zombie.sprite);
      }
      this.scene.physics.add.collider(this.scene.zombies, this.scene.obstacles);
      this.canUpdate = true;
    }, 7000);

    this.rightTail = this.scene.lights.addLight(1392, 352, 150, 0xff0000, 1);
    this.leftTail = this.scene.lights.addLight(1482, 352, 150, 0xff0000, 1);
    this.leftHead = this.scene.lights.addLight(1362, 762, 220, 0xfcffd1, 2);
    this.rightHead = this.scene.lights.addLight(1512, 762, 220, 0xfcffd1, 2);

    this.flashLights = setInterval(() => {
      if (this.lightsOn) {
        this.rightTail.setIntensity(0);
        this.leftTail.setIntensity(0);
        this.leftHead.setIntensity(0);
        this.rightHead.setIntensity(0)
        this.lightsOn = false;
      } else {
        this.rightTail.setIntensity(1);
        this.leftTail.setIntensity(1);
        this.leftHead.setIntensity(2);
        this.rightHead.setIntensity(2)
        this.lightsOn = true;
      }
    }, 600);

  }

  update() {
    if (this.started && this.canUpdate) {
      this.enemies.forEach(e => e.update());

      if (this.scene.zombies.getChildren().length < this.difficulty * 100) this.addZombie();
    }

    // Check if player is in range of trigger
    let distX = Math.abs(this.player.sprite.x - this.trigger.x);
    let distY = Math.abs(this.player.sprite.y - this.trigger.y);
    let range = this.triggerRange;
    this.canTrigger = (distX < range && distY < range) ? true : false;

    // Trigger text
    let text = (this.canTrigger && !this.started) ? 'Press \'E\' to search' : '';
    this.triggerText.setText(text);
  }

  addZombie() {
    let zombie = new Zombie(this.scene);
    this.enemies.push(zombie)
    this.scene.zombies.add(zombie.sprite);
  }

  stopFlashing() {
    clearInterval(this.flashLights);
  }
}