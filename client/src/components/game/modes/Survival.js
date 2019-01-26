import GameMode from './GameMode';
import Zombie from '../enemies/zombie';

export default class Survival extends GameMode {
  constructor(scene) {
    super(scene);

    // Override defaults
    this.name = 'Survival';
    this.trigger = { x: 1443, y: 496 };
    this.triggerRange = 150;
    this.startDelay = 7000;

    // Custom props
    this.lightsOn = false;

    super.createGraphics();
  }

  start() {
    this.started = true;
    this.graphics.clear();

    setTimeout(() => {
      for (let i = 0; i < this.difficulty * 100; i++) {
        let enemy = new Zombie(this.scene);
        this.enemies.push(enemy)
        this.scene.zombies.add(enemy.sprite);
      }

      // Collision: Zombies & Obstacles
      this.scene.physics.add.collider(this.scene.zombies, this.scene.obstacles);

      // Let the gamemode start updating
      this.canUpdate = true;
    }, this.startDelay);

    // Car lights
    this.rightTail = this.scene.lights.addLight(1392, 352, 150, 0xff0000, 1);
    this.leftTail = this.scene.lights.addLight(1482, 352, 150, 0xff0000, 1);
    this.leftHead = this.scene.lights.addLight(1362, 762, 220, 0xfcffd1, 2);
    this.rightHead = this.scene.lights.addLight(1512, 762, 220, 0xfcffd1, 2);

    this.flashCarLights = setInterval(() => {
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

  stopFlashing() {
    clearInterval(this.flashCarLights);
  }
}