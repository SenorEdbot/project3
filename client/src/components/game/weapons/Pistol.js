export default class Pistol {
  constructor(scene, playerSprite) {
    this.scene = scene;
    this.player = playerSprite;
    this.fireRate = 100;
    this.nextFire = 0;
    this.bullets = this.scene.physics.add.group({
      defaultKey: 'bullet'
    });
    this.bulletVelocity = 2500;

    // Bullet/Obstacle collision
    this.scene.physics.add.collider(this.bullets, this.scene.obstacles, (bullet) => {
      bullet.destroy(true);
    });

    // Bullet/Zombie collision
    this.scene.physics.add.collider(this.bullets, this.scene.zombies, (bullet, zombie) => {
      bullet.destroy(true);
      zombie.onHit(this.player);
    });
  }

  fire() {
    if (this.scene.time.now > this.nextFire) {
      let bullet = this.bullets.getFirstDead(true);
      let camera = this.scene.cameras.main;
      let physics = this.scene.physics;
      let pointer = this.scene.input.activePointer;

      // Positioning
      let rot = this.player.sprite.rotation;
      let velX = pointer.x + camera.scrollX;
      let velY = pointer.y + camera.scrollY;
      let locX = this.player.sprite.x;
      let locY = this.player.sprite.y;

      bullet.displayOriginX -= 50;
      bullet.rotation = rot;
      bullet.setScale(0.5).setPosition(locX, locY);

      // Move the bullet in the direction of the pointer.
      physics.moveTo(bullet, velX, velY, this.bulletVelocity);

      camera.shake(100, 0.002);

      // Limit spawned bullets for performance
      if (this.bullets.getChildren().length > 20) this.bullets.clear();

      this.player.shotsFired++;
      this.scene.component.setState({ shotsFired: this.player.shotsFired });

      // Limit fire rate
      this.nextFire = this.scene.time.now + this.fireRate;
    }
  }

  resetNextFire() {
    // This allows players to spam the LMB.
    this.nextFire = this.scene.time.now;
  }
}