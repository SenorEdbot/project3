import Zombie from '../characters/Zombie';

export default class TimeSurvival {
  constructor(game, player) {
    this.game = game;
    this.player = player;
    this.timeSurvived = -1;
    this.nextUpdate = 0;
    this.enemies = [];
    this.enemiesTotal = 10;
    this.enemiesAlive = null;
    this.difficulty = 1 + (this.timeSurvived / 100);
  }

  init() {
    for (let i = 0; i < 5; i++) {
      this.spawnEnemy();
    }
  }

  update() {

    if (this.enemiesAlive < this.enemiesTotal) this.spawnEnemy();

    // INCREMENT TIME SURVIVED
    if (this.game.time.now > this.nextUpdate) {
      this.nextUpdate = this.game.time.now + 1000; // 1 second
      this.difficulty = 1 + (this.timeSurvived / 15);
      this.timeSurvived++;
      this.enemiesTotal = parseInt(this.timeSurvived / 5);
    }
    2
    // UPDATE ENEMIES ALIVE
    this.enemiesAlive = 0;
    for (let i = 0; i < this.enemies.length; i++) {

      if (this.enemies[i].isAlive) {
        this.enemiesAlive++;

        // --> Disabled for performance <--
        // this.physics.collide(this.enemies[i].zombie, this.player, () => {
        //     if (this.playerHealth >= 1) this.playerHealth -= 0.1;
        // });

        this.game.physics.add.collider(this.enemies[i].sprite, this.player.gun.bullets, (enemy, bullet) => {
          bullet.destroy();
          this.player.shotsHit++;
          this.enemies[i].damage();

        });

        this.enemies[i].update();
      }
    }
  }

  spawnEnemy() {
    this.enemies.push(new Zombie(1, Math.floor(Math.random() * this.difficulty + 1), this.game, this.player));

    // --> Disabled for performance <--
    // this.physics.add.overlap(this.enemies[i].zombie, this.player);
  }
}
