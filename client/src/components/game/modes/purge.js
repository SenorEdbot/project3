import Zombie from '../enemies/zombie';

export default class Purge {
  constructor(scene) {
    this.scene = scene;
    this.started = false;
    this.canUpdate = false;
    this.difficulty = Math.floor(Math.random() + 1) * 5;
    this.enemies = [];
    this.startTrigger = {
      x: 1412,
      y: 412,
    }
    this.lightsOn = false;

    this.player = this.scene.player;

    this.scene.input.keyboard.on('keydown', event => {
      if (event.code === 'KeyE' && this.started === false) {

        let distX = Math.abs(this.player.sprite.x - this.startTrigger.x);
        let distY = Math.abs(this.player.sprite.y - this.startTrigger.y);
        let range = 60;

        // Check if player is in range of trigger
        if (distX < range && distY < range) {
          this.start();
        }
      }

      this.flashLights = null;
    });
  }

  start() {
    console.log('Starting game mode [Purge]');

    this.started = true;

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
    this.enemies.forEach(e => e.update());

    if (this.scene.zombies.getChildren().length < this.difficulty * 100) this.addZombie();
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