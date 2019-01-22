export default class BulletGroup {
  constructor(scene, owner) {
    this.scene = scene; // Main Phaser scene
    this.owner = owner; // Player that shot the bullet

    // Phaser physics group
    this.bullets = this.scene.physics.add.group({ defaultKey: 'bullet' });

    // Collision: Bullet & Obstacle
    this.scene.physics.add.collider(this.bullets, this.scene.obstacles, (bullet) => { bullet.destroy(true) });

    // Collision: Bullet & Zombie
    this.scene.physics.add.collider(this.bullets, this.scene.zombies, (bullet, zombie) => {
      bullet.destroy(true);
      zombie.onHit(this.owner);
    });
  }

  shoot(positioning) {
    const p = positioning;

    let bullet = this.bullets.getFirstDead(true);
    let physics = this.scene.physics;

    bullet.displayOriginX += p.offsetX;
    bullet.displayOriginY += p.offsetY;

    bullet.rotation = p.rotation;
    bullet
      .setScale(p.scale)
      .setPosition(p.locationX, p.locationY);

    physics.moveTo(bullet, p.vectorX, p.vectorY, p.velocity);

    // Limit spawned bullets for performance
    if (this.bullets.getChildren().length > 20) this.bullets.clear();
  }
}