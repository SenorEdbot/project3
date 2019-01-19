import Phaser from 'phaser';

export default class Zombie {
  constructor(scene) {
    this.scene = scene;
    this.sprite = scene.physics.add
      .sprite(this.getRandomSpawnPoint().x, this.getRandomSpawnPoint().y, 'zombie')
      .setCollideWorldBounds(true)
      .setPipeline('Light2D');

    this.sprite.body.setSize(44, 44, 0.5);

    this.walkSpeed = 10;
    this.sprintSpeed = 100;
    this.speed = this.walkSpeed;
    this.health = 1;
    this.isAlive = true;

    // Store the onHit function on the sprite for ease of access.
    this.sprite.onHit = player => this.onHit(player);

    this.target = this.scene.gameMode.trigger;
  }

  update() {
    if (this.isAlive) {
      this.scene.physics.moveTo(this.sprite, this.target.x, this.target.y, this.speed);
      this.sprite.rotation = Phaser.Math.Angle.Between(
        this.sprite.x,
        this.sprite.y,
        this.target.x,
        this.target.y
      );

      // Attract zombies to player when nearby
      let distX = Math.abs(this.sprite.x - this.scene.player.sprite.x);
      let distY = Math.abs(this.sprite.y - this.scene.player.sprite.y);
      let rangeToPlayer = 250;
      if (distX < rangeToPlayer && distY < rangeToPlayer) {
        this.target = this.scene.player.sprite;
        this.speed = this.sprintSpeed
      }
    }
  }

  onHit(player) {
    this.health--;
    if (this.health <= 0) {
      this.isAlive = false;
      this.sprite.destroy(true);
      player.kills++;
      this.scene.component.setState({ enemiesKilled: player.kills });
    }
  }

  getRandomSpawnPoint = () => {
    const player = this.scene.player.sprite;

    // Limits
    const min = 0
    const maxW = Math.floor(this.scene.physics.world.bounds.width);
    const maxH = Math.floor(this.scene.physics.world.bounds.height);

    // Get random x, y
    let x = Math.floor(Math.random() * (maxW - min + 1)) + min;
    let y = Math.floor(Math.random() * (maxH - min + 1)) + min;


    let redo = () => {
      x = Math.floor(Math.random() * (maxW - min + 1)) + min;
      y = Math.floor(Math.random() * (maxW - min + 1)) + min;
      check();
    }

    let check = () => {
      if (Math.abs(x - player.x < 250 || y - player.y < 250)) redo();
    }

    return { x, y };
  }
}