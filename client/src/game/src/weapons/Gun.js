import InputBindings from '../input/InputBindings';
import EffectsManager from '../effects/EffectManager';

export default class Gun {
  constructor(game, player, fireRate) {
    this.game = game;
    this.player = player;
    this.fireRate = fireRate;
    this.nextFire = 0;
    this.bullets = this.game.physics.add.group({ defaultKey: 'bullet' });
    this.input = new InputBindings(this.game);
    this.effects = new EffectsManager(this.game);
  }

  fire() {
    if (this.game.time.now > this.nextFire) {

      // Limit fire rate
      this.nextFire = this.game.time.now + this.fireRate;

      // Bullet spawn
      let bullet = this.bullets.getFirstDead(true);
      bullet.rotation = this.player.sprite.rotation;
      bullet.displayOriginX -= 50;
      bullet.displayOriginY -= 23;
      bullet.setScale(0.5);
      bullet.setPosition(this.player.sprite.x, this.player.sprite.y);

      // Bullet movement
      this.game.physics.moveTo(bullet, this.input.pointer.x + this.game.cameras.main.scrollX, this.input.pointer.y + this.game.cameras.main.scrollY, 1500);

      this.player.shotsFired++;

      // Effects
      this.game.cameras.main.shake(100, 0.002); // duration, intensity
      this.effects.playGunshot();

      // Limit spawned bullets for performance
      if (this.bullets.getChildren().length > 20) this.bullets.clear();
    }
  }
}
